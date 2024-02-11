import { expect } from "chai";
import dotenv from "dotenv";
import { AbiCoder, Signer, ZeroAddress } from "ethers";
import { network } from "hardhat";
import { Keypair } from "maci-domainobjs";

import { deployContract } from "../ts/deploy";
import { getSigners, sleep } from "../ts/utils";
import {
  HatsGatekeeperMultiple,
  HatsGatekeeperSimple,
  HatsGatekeeperWithOwnerHat,
  MACI,
  MockHatsProtocol,
} from "../typechain-types";

import { STATE_TREE_DEPTH, initialVoiceCreditBalance } from "./constants";
import { deployTestContracts } from "./utils";

dotenv.config();

describe("HatsProtocol Gatekeeper", () => {
  let maciContract: MACI;

  let hatsGatekeeperSimple: HatsGatekeeperSimple;
  let hatsGatekeeperWithOwnerHat: HatsGatekeeperWithOwnerHat;
  let hatsGatekeeperMultiple: HatsGatekeeperMultiple;

  let signer: Signer;
  let voter: Signer;
  let signerAddress: string;
  let voterAddress: string;

  let mockHats: MockHatsProtocol;
  let mockHatsAddress: string;
  const hatsContractOP = "0x3bc1A0Ad72417f2d411118085256fC53CBdDd137";

  const user = new Keypair();

  let topHat: bigint;
  let hatId: bigint;
  let secondHatId: bigint;
  let thirdHatId: bigint;

  before(async () => {
    // fork the optimism mainnet network
    if (network.name === "hardhat") {
      await network.provider.request({
        method: "hardhat_reset",
        params: [
          {
            forking: {
              jsonRpcUrl: process.env.OP_RPC_URL || "https://optimism.drpc.org",
            },
          },
        ],
      });
    }

    [signer, voter] = await getSigners();
    signerAddress = await signer.getAddress();
    voterAddress = await voter.getAddress();

    // deploy the wrapper around HatsProtocol
    mockHats = await deployContract("MockHatsProtocol", signer, true, hatsContractOP);
    mockHatsAddress = await mockHats.getAddress();

    // create a new top hat hat
    await mockHats.connect(signer).mintTopHat(mockHatsAddress, "MACITOPHAT", "");
    topHat = await mockHats.lastTopHat();

    // create a new hat
    await mockHats.createHat(topHat, "MACI HAT", 2, signerAddress, signerAddress, false, "");
    hatId = await mockHats.lastHat();

    // mint the hat
    await mockHats.mintHat(hatId, signerAddress);

    // create a second hat
    await mockHats.createHat(topHat, "MACI HAT 2", 2, signerAddress, signerAddress, true, "");
    secondHatId = await mockHats.lastHat();

    // mint the hat
    await mockHats.mintHat(secondHatId, voterAddress);

    // create a third hat
    await mockHats.createHat(topHat, "MACI HAT 3", 2, signerAddress, signerAddress, true, "");
    thirdHatId = await mockHats.lastHat();

    // mint the hat
    await mockHats.mintHat(thirdHatId, signerAddress);
    await mockHats.mintHat(thirdHatId, voterAddress);

    // deploy gatekeepers
    hatsGatekeeperSimple = await deployContract("HatsGatekeeperSimple", signer, true, hatsContractOP, hatId);
    hatsGatekeeperWithOwnerHat = await deployContract(
      "HatsGatekeeperWithOwnerHat",
      signer,
      true,
      hatsContractOP,
      hatId,
      secondHatId,
    );
    hatsGatekeeperMultiple = await deployContract(
      "HatsGatekeeperMultiple",
      signer,
      true,
      hatsContractOP,
      [hatId, secondHatId],
      thirdHatId,
    );
  });

  after(async () => {
    // we reset
    if (network.name === "hardhat") {
      await network.provider.request({
        method: "hardhat_reset",
        params: [],
      });
    }
  });

  // add some sleep to ensure we don't have problems with the fork
  // as one might use a free RPC plan
  afterEach(async () => {
    await sleep(3000);
  });

  describe("hatsGatekeeperSimple", () => {
    before(async () => {
      const r = await deployTestContracts(
        initialVoiceCreditBalance,
        STATE_TREE_DEPTH,
        signer,
        true,
        hatsGatekeeperSimple,
      );

      maciContract = r.maciContract;
    });

    describe("Deployment", () => {
      it("should be deployed correctly", async () => {
        expect(hatsGatekeeperSimple).to.not.eq(undefined);
        expect(await hatsGatekeeperSimple.criterionHat()).to.eq(hatId);
        expect(await hatsGatekeeperSimple.maci()).to.eq(ZeroAddress);
        expect(await hatsGatekeeperSimple.hats()).to.eq(hatsContractOP);
      });
    });

    describe("setMaci", () => {
      it("should set the MACI instance correctly", async () => {
        const maciAddress = await maciContract.getAddress();
        await hatsGatekeeperSimple.setMaciInstance(maciAddress);

        expect(await hatsGatekeeperSimple.maci()).to.eq(maciAddress);
      });

      it("should fail to set MACI instance when the caller is not the owner", async () => {
        await expect(hatsGatekeeperSimple.connect(voter).setMaciInstance(signerAddress)).to.be.revertedWith(
          "Ownable: caller is not the owner",
        );
      });
    });

    describe("register", () => {
      it("should not allow to call from a non-registered MACI contract", async () => {
        await hatsGatekeeperSimple.setMaciInstance(ZeroAddress);
        await expect(
          maciContract
            .connect(signer)
            .signUp(
              user.pubKey.asContractParam(),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
            ),
        ).to.be.revertedWithCustomError(hatsGatekeeperSimple, "OnlyMACI");
      });
      it("should register a user if the register function is called with the valid data", async () => {
        await hatsGatekeeperSimple.setMaciInstance(await maciContract.getAddress());

        // signup via MACI
        const tx = await maciContract
          .connect(signer)
          .signUp(
            user.pubKey.asContractParam(),
            AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
            AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
          );

        const receipt = await tx.wait();

        expect(receipt?.status).to.eq(1);
      });

      it("should fail to register a user if they do not own the criterion hat", async () => {
        await expect(
          maciContract
            .connect(voter)
            .signUp(
              user.pubKey.asContractParam(),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
            ),
        ).to.be.revertedWithCustomError(hatsGatekeeperSimple, "NotWearingCriterionHat");
      });

      it("should prevent signing up twice", async () => {
        await expect(
          maciContract
            .connect(signer)
            .signUp(
              user.pubKey.asContractParam(),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
            ),
        ).to.be.revertedWithCustomError(hatsGatekeeperSimple, "AlreadyRegistered");
      });
    });
  });

  describe("hatsGatekeeperWithOwnerHat", () => {
    before(async () => {
      const r = await deployTestContracts(
        initialVoiceCreditBalance,
        STATE_TREE_DEPTH,
        signer,
        true,
        hatsGatekeeperWithOwnerHat,
      );

      maciContract = r.maciContract;
    });

    describe("Deployment", () => {
      it("should be deployed correctly", async () => {
        expect(hatsGatekeeperWithOwnerHat).to.not.eq(undefined);
        expect(await hatsGatekeeperWithOwnerHat.ownerHat()).to.eq(secondHatId);
        expect(await hatsGatekeeperWithOwnerHat.maci()).to.eq(ZeroAddress);
        expect(await hatsGatekeeperWithOwnerHat.hats()).to.eq(hatsContractOP);
        expect(await hatsGatekeeperWithOwnerHat.criterionHat()).to.eq(hatId);
      });
    });

    describe("setMaci", () => {
      it("should set the MACI instance correctly", async () => {
        const maciAddress = await maciContract.getAddress();
        await hatsGatekeeperWithOwnerHat.connect(voter).setMaciInstance(maciAddress);

        expect(await hatsGatekeeperWithOwnerHat.maci()).to.eq(maciAddress);
      });

      it("should fail to set MACI instance when the caller is not the top hat owner", async () => {
        await expect(
          hatsGatekeeperWithOwnerHat.connect(signer).setMaciInstance(signerAddress),
        ).to.be.revertedWithCustomError(hatsGatekeeperWithOwnerHat, "NotOwner");
      });
    });

    describe("setOwnerHat", () => {
      it("should allow the owner to change the owner hat", async () => {
        await hatsGatekeeperWithOwnerHat.connect(voter).setOwnerHat(hatId);
        expect(await hatsGatekeeperWithOwnerHat.ownerHat()).to.eq(hatId);
      });
      it("should prevent non-owners from changing the owner hat", async () => {
        // now the owner hat is the first hat (hatId)
        await expect(hatsGatekeeperWithOwnerHat.connect(voter).setOwnerHat(hatId)).to.be.revertedWithCustomError(
          hatsGatekeeperWithOwnerHat,
          "NotOwner",
        );
      });
    });

    describe("register", () => {
      it("should not allow to call from a non-registered MACI contract", async () => {
        await hatsGatekeeperWithOwnerHat.setMaciInstance(ZeroAddress);
        await expect(
          maciContract
            .connect(signer)
            .signUp(
              user.pubKey.asContractParam(),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
            ),
        ).to.be.revertedWithCustomError(hatsGatekeeperWithOwnerHat, "OnlyMACI");
      });
      it("should register a user if the register function is called with the valid data", async () => {
        await hatsGatekeeperWithOwnerHat.connect(signer).setMaciInstance(await maciContract.getAddress());
        // signup via MACI
        const tx = await maciContract
          .connect(signer)
          .signUp(
            user.pubKey.asContractParam(),
            AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
            AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
          );

        const receipt = await tx.wait();

        expect(receipt?.status).to.eq(1);
      });

      it("should fail to register a user if they do not own the criterion hat", async () => {
        await expect(
          maciContract
            .connect(voter)
            .signUp(
              user.pubKey.asContractParam(),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
            ),
        ).to.be.revertedWithCustomError(hatsGatekeeperWithOwnerHat, "NotWearingCriterionHat");
      });

      it("should prevent signing up twice", async () => {
        await expect(
          maciContract
            .connect(signer)
            .signUp(
              user.pubKey.asContractParam(),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
            ),
        ).to.be.revertedWithCustomError(hatsGatekeeperWithOwnerHat, "AlreadyRegistered");
      });
    });
  });

  describe("HatsGatekeeperMultiple", () => {
    before(async () => {
      const r = await deployTestContracts(
        initialVoiceCreditBalance,
        STATE_TREE_DEPTH,
        signer,
        true,
        hatsGatekeeperMultiple,
      );

      maciContract = r.maciContract;
    });

    describe("Deployment", () => {
      it("should be deployed correctly", async () => {
        expect(hatsGatekeeperMultiple).to.not.eq(undefined);
        expect(await hatsGatekeeperMultiple.ownerHat()).to.eq(thirdHatId);
        expect(await hatsGatekeeperMultiple.maci()).to.eq(ZeroAddress);
        expect(await hatsGatekeeperMultiple.hats()).to.eq(hatsContractOP);
        expect(await hatsGatekeeperMultiple.criterionHat(hatId)).to.eq(true);
        expect(await hatsGatekeeperMultiple.criterionHat(secondHatId)).to.eq(true);
      });
    });

    describe("setMaci", () => {
      it("should set the MACI instance correctly", async () => {
        const maciAddress = await maciContract.getAddress();
        await hatsGatekeeperMultiple.setMaciInstance(maciAddress);

        expect(await hatsGatekeeperMultiple.maci()).to.eq(maciAddress);
      });

      it("should fail to set MACI instance when the caller is not the top hat owner", async () => {
        const [, , another] = await getSigners();
        await expect(
          hatsGatekeeperMultiple.connect(another).setMaciInstance(signerAddress),
        ).to.be.revertedWithCustomError(hatsGatekeeperMultiple, "NotOwner");
      });
    });

    describe("setOwnerHat", () => {
      it("should allow the owner to change the owner hat", async () => {
        // change from 3 to 2
        await hatsGatekeeperMultiple.connect(signer).setOwnerHat(secondHatId);
        expect(await hatsGatekeeperMultiple.ownerHat()).to.eq(secondHatId);
      });
      it("should prevent non-owners from changing the owner hat", async () => {
        // signer does not own 2 but only 1 and 3
        await expect(hatsGatekeeperMultiple.connect(signer).setOwnerHat(hatId)).to.be.revertedWithCustomError(
          hatsGatekeeperMultiple,
          "NotOwner",
        );
      });
    });

    describe("register", () => {
      it("should not allow to call from a non-registered MACI contract", async () => {
        await hatsGatekeeperMultiple.connect(voter).setMaciInstance(ZeroAddress);
        await expect(
          maciContract
            .connect(signer)
            .signUp(
              user.pubKey.asContractParam(),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
            ),
        ).to.be.revertedWithCustomError(hatsGatekeeperMultiple, "OnlyMACI");
      });
      it("should register a user if the register function is called with the valid data", async () => {
        await hatsGatekeeperMultiple.connect(voter).setMaciInstance(await maciContract.getAddress());

        // signup via MACI
        const tx = await maciContract
          .connect(signer)
          .signUp(
            user.pubKey.asContractParam(),
            AbiCoder.defaultAbiCoder().encode(["uint256"], [hatId]),
            AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
          );

        const receipt = await tx.wait();

        expect(receipt?.status).to.eq(1);
      });

      it("should fail to register a user if they pass a non-criterion hat", async () => {
        await expect(
          maciContract
            .connect(voter)
            .signUp(
              user.pubKey.asContractParam(),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [thirdHatId]),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
            ),
        ).to.be.revertedWithCustomError(hatsGatekeeperMultiple, "NotCriterionHat");
      });

      it("should fail to register a user if they do not own a criterion hat", async () => {
        // get another signer
        const [, , another] = await getSigners();

        await expect(
          maciContract
            .connect(another)
            .signUp(
              user.pubKey.asContractParam(),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [hatId]),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
            ),
        ).to.be.revertedWithCustomError(hatsGatekeeperMultiple, "NotWearingCriterionHat");
      });

      it("should prevent signing up twice", async () => {
        await expect(
          maciContract
            .connect(signer)
            .signUp(
              user.pubKey.asContractParam(),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [hatId]),
              AbiCoder.defaultAbiCoder().encode(["uint256"], [1]),
            ),
        ).to.be.revertedWithCustomError(hatsGatekeeperMultiple, "AlreadyRegistered");
      });
    });
  });
});
