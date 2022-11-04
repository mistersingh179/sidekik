Mission of Step 2: do cleanup

- provider component to select & inject provider ✅
- wallets component to select & inject wallet ✅
  - has default wallet selected ✅
  - shows selected wallet & its balance ✅
- contracts component to upload ABI & addresses ✅
  - then we can inject contracts everywhere ✅
- contract functions component to show & run its functions ✅
- refactor how we manage a functions abi, its inputs & outputs ✅

## exploration
- how does truffle store abi ✅ 
  - artifacts are same as hardhat ✅
  - their default does not mention how to save contract addresses ✅
  - their tool doesn't interact with the contract, just explores it ✅
  - the drizzle app is storing inside contracts with a new file per contract like 👈
    ```
    // TutorialToken.json
    {
    "contractName": "foo",
    "abi": [],
    "networks": {
    "1337": {
      "events": {},
      "links": {},
      "address": "0xE3011A37A904aB90C8881a99BD1F6E21401f1522",
      "transactionHash": "0x2ad9004a442c9776ef67be01908873ab2c55496394f06c45e418203ce76d8e33"
    }
    }
    ```
    so we need to go `networks[chainId].address`👈
- where/how scaffold-eth store abi's & addresses
  - has file called `hardhat_contracts.json` which we get from `--export-all` option of `harhdat-deploy`
  - inside file we have `rootObj[chainId][networkName].contracts[contractName]`👈
    - look for `address` key, under `chain` key
    - and under `contract` with `address` key
  - has file called `external_contracts.json`
    - has `rootObj[chainId].contracts[contractName].address` & `rootObj[chainId].contracts[contractName].address` 👈
  - another file `contracts.json` which we get from `--export` option of `hardhat-deploy`
  - this file doesnt have nested parent properties for network, chain etc but has `name` & `chainId` as properties
    - inside file we have  `rootObj.contracts[contractName].address` & `rootObj.contracts[contractName].abi` 👈
- how/what are other templates doing
  - moralis is using truffle behind the scenes

## features
- detect that code is present at the address ✅
- toggle selected wallet ✅
- allow overriding provided token address ✅
- re-read both files when they change ✅
  - poll to read again  ✅
  - modified date to determine if we should read again or not 🦵  

## tooling
- add eslint ✅
- add eslint-plugin-react-hooks ✅
- eslint & prettier connection ✅
  - this is how to do it https://github.com/prettier/eslint-plugin-prettier
  - but not recommended as we dont want prettier to cause squigly lines 
  - and our ide can just run prettier, we dont need to rely on elsint to do it
  - explained here https://prettier.io/docs/en/integrating-with-linters.html

## file loading
- remember last path & start there. ✅
- manual entry of address ✅