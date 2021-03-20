require('module-alias/register')
import { genTestAccounts } from '../accounts'
import { config } from 'maci-config'
import {
    genRandomSalt,
} from 'maci-crypto'

import { JSONRPCDeployer } from '../deploy'
const PoseidonT3 = require('@maci-contracts/artifacts/PoseidonT3.json')
const PoseidonT4 = require('@maci-contracts/artifacts/PoseidonT4.json')
const PoseidonT5 = require('@maci-contracts/artifacts/PoseidonT5.json')
const PoseidonT6 = require('@maci-contracts/artifacts/PoseidonT6.json')

import { parseArtifact, linkPoseidonLibraries } from '../'

const accounts = genTestAccounts(1)
let deployer
let hasherContract
let PoseidonT3Contract
let PoseidonT4Contract
let PoseidonT5Contract
let PoseidonT6Contract

describe('Hasher', () => {
    beforeAll(async () => {
        deployer = new JSONRPCDeployer(
            accounts[0].privateKey,
            config.get('chain.url'),
            {
                gasLimit: 8800000,
            },
        )

        console.log('Deploying Poseidon contracts')

        PoseidonT3Contract = await deployer.deploy(PoseidonT3.abi, PoseidonT3.bytecode, {})
        PoseidonT4Contract = await deployer.deploy(PoseidonT4.abi, PoseidonT4.bytecode, {})
        PoseidonT5Contract = await deployer.deploy(PoseidonT5.abi, PoseidonT5.bytecode, {})
        PoseidonT6Contract = await deployer.deploy(PoseidonT6.abi, PoseidonT6.bytecode, {})

        // Link Poseidon contracts
        linkPoseidonLibraries(
            ['testing/HasherBenchmarks.sol'],
            PoseidonT3Contract.address,
            PoseidonT4Contract.address,
            PoseidonT5Contract.address,
            PoseidonT6Contract.address,
        )

        const [ HasherAbi, HasherBin ] = parseArtifact('HasherBenchmarks')

        console.log('Deploying Hasher')
        hasherContract = await deployer.deploy(
            HasherAbi,
            HasherBin,
        )
    })

    it('hashLeftRight', async () => {
        const left = genRandomSalt()
        const right = genRandomSalt()

        const tx = await hasherContract.hashLeftRightBenchmark(left.toString(), right.toString())
        const receipt = await tx.wait()
        console.log('hashLeftRight:', receipt.gasUsed.toString())
    })

    it('hash5', async () => {
        const values: string[] = []
        for (let i = 0; i < 5; i++) {
            values.push(genRandomSalt().toString())
        }

        const tx = await hasherContract.hash5Benchmark(values)
        const receipt = await tx.wait()
        console.log('hash5:', receipt.gasUsed.toString())
    })

    //it('hash11', async () => {
        //const values: string[] = []
        //for (let i = 0; i < 11; i++) {
            //values.push(genRandomSalt().toString())
        //}

        //const tx = await hasherContract.hash11Benchmark(values)
        //const receipt = await tx.wait()
        //console.log('hash11:', receipt.gasUsed.toString())
    //})
})

