import {
  deployConstantInitialVoiceCreditProxy,
  deployFreeForAllSignUpGatekeeper,
  deployVerifier,
  deployMaci,
  deployTopupCredit,
  getDefaultSigner,
} from "maci-contracts";

import { logError, logGreen, success, DEFAULT_INITIAL_VOICE_CREDITS, DeployedContracts } from "../utils";
import { banner } from "../utils/banner";
import { readContractAddress, storeContractAddress } from "../utils/storage";

/**
 * Deploy MACI and related contracts
 * @param stateTreeDepth - the depth of the state tree
 * @param vkRegistryAddress - the address of the vkRegistry contract
 * @param initialVoiceCredits - the initial voice credits to be minted
 * @param initialVoiceCreditsProxyAddress - the address of the initialVoiceCreditsProxy contract
 * @param signupGatekeeperAddress - the address of the signupGatekeeper contract
 * @param quiet - whether to log the output
 * @returns the addresses of the deployed contracts
 */
export const deploy = async (
  stateTreeDepth: number,
  initialVoiceCredits?: number,
  initialVoiceCreditsProxyAddress?: string,
  signupGatekeeperAddress?: string,
  quiet = true,
): Promise<DeployedContracts> => {
  banner(quiet);

  if (initialVoiceCreditsProxyAddress && initialVoiceCredits) {
    logError("Please provide either an initialVoiceCreditProxyAddress or initialVoiceCredits, not both");
  }

  const signer = await getDefaultSigner();

  // if we did not deploy it before, then deploy it now
  let initialVoiceCreditProxyContractAddress: string | undefined;

  if (!initialVoiceCreditsProxyAddress) {
    const contract = await deployConstantInitialVoiceCreditProxy(
      initialVoiceCredits || DEFAULT_INITIAL_VOICE_CREDITS,
      signer,
      true,
    );

    initialVoiceCreditProxyContractAddress = await contract.getAddress();
  }

  // check if we have a signupGatekeeper already deployed or passed as arg
  let signupGatekeeperContractAddress = readContractAddress("SignUpGatekeeper");
  if (!signupGatekeeperContractAddress && !signupGatekeeperAddress) {
    const contract = await deployFreeForAllSignUpGatekeeper(signer, true);
    signupGatekeeperContractAddress = await contract.getAddress();
  }

  // deploy a verifier contract
  const verifierContract = await deployVerifier(signer, true);

  // topup credit
  const topUpCredit = await deployTopupCredit(signer, true);

  const [verifierContractAddress, topUpCreditAddress] = await Promise.all([
    verifierContract.getAddress(),
    topUpCredit.getAddress(),
  ]);

  // deploy MACI, stateAq, PollFactory and poseidon
  const { maciContract, stateAqContract, pollFactoryContract, poseidonAddrs } = await deployMaci(
    signupGatekeeperContractAddress,
    initialVoiceCreditProxyContractAddress!,
    verifierContractAddress,
    topUpCreditAddress,
    signer,
    stateTreeDepth,
    true,
  );

  const [maciContractAddress, stateAqContractAddress, pollFactoryContractAddress] = await Promise.all([
    maciContract.getAddress(),
    stateAqContract.getAddress(),
    pollFactoryContract.getAddress(),
  ]);

  // save to the JSON File
  storeContractAddress("InitialVoiceCreditProxy", initialVoiceCreditProxyContractAddress!);
  storeContractAddress("SignUpGatekeeper", signupGatekeeperContractAddress);
  storeContractAddress("Verifier", verifierContractAddress);
  storeContractAddress("MACI", maciContractAddress);
  storeContractAddress("StateAq", stateAqContractAddress);
  storeContractAddress("PollFactory", pollFactoryContractAddress);
  storeContractAddress("TopupCredit", topUpCreditAddress);
  storeContractAddress("PoseidonT3", poseidonAddrs[0]);
  storeContractAddress("PoseidonT4", poseidonAddrs[1]);
  storeContractAddress("PoseidonT5", poseidonAddrs[2]);
  storeContractAddress("PoseidonT6", poseidonAddrs[3]);

  logGreen(quiet, success(`MACI deployed at:  ${maciContractAddress}`));

  // return all addresses
  return {
    maciAddress: maciContractAddress,
    stateAqAddress: stateAqContractAddress,
    pollFactoryAddress: pollFactoryContractAddress,
    verifierAddress: verifierContractAddress,
    topupCreditAddress: topUpCreditAddress,
    poseidonT3Address: poseidonAddrs[0],
    poseidonT4Address: poseidonAddrs[1],
    poseidonT5Address: poseidonAddrs[2],
    poseidonT6Address: poseidonAddrs[3],
    signUpGatekeeperAddress: signupGatekeeperContractAddress,
    initialVoiceCreditProxyAddress: initialVoiceCreditProxyContractAddress!,
  };
};
