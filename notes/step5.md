Mission of Step 5: Be a Bug free limited feature usable product.

## Issues/Bugs:
- Contracts are very slow!! ✅
- 2nd contract is reading from 1 st contract ✅
- no way to input an array to a function ✅
- make reloading not break input cursor in contract tabs ✅
- reloading should not make things slow ✅
- reload intelligently with md5 check ✅
- tell that contract not found, on contract tab ✅
- truly only store output address if not already there ✅
- Removing a file clear its md5 cache, so it is processed again when read in ✅
- make isLazy dynamic, so only lazy when heavy ✅
- console has warnings ✅

## Outputs
- show gas used ✅
- show array of data ✅
- have conversion for gas as units, eth, usdc, matic token with price per token fetched. ✅
  - show gas used, gas price, total cost ✅
- extract valuable error out of ✅
  - `Error: VM Exception while processing transaction: reverted with reason string 'you are not authorized to make this request'` ✅
- Improve `TransactionFailure` to show things only which apply, not all. ✅
- show error when function doesn't run or ran without required data ✅
- show error when there is an error on execution ✅
- show revert reason ✅
- show a visual indication that the function ran ✅
  - read only function show initiated & finished ✅
  - write function show initiated, sent & mined ✅
  - both show error ✅
- handle when it returns a struct `tuple` with `components` ✅
- handle `tuple[]` ✅
- allow showing a structure / object as output ✅
- highlight/transition the row which last ran ✅
- highlight each output container ✅
- contain each array element, so we can see a set of elements as part of an array different than 2 elements as-is ✅
- extract for high nonce error ✅

## Inputs
- address should give drop down of all known/previously used addresses for quick fill ✅
- known addresses are all contracts, wallets, ouputs of previous transactions ✅
- Input Array ✅
- Input Struct ✅
- Input Array of Struct ✅
- input side I can enter Ether, gwei or USDC, and it converts with decimals for me ✅
- input side I can enter a date, datetime and it will convert as decimals for me ✅
- input side show what will be submitted in tooltip as you type ✅
- input side & output side see entire raw output ✅
  - dropdown from as option along execute button ✅
  - dropdown to have higher z index ✅
- reset input & output side. useful after running function to remove all old stuff. ✅
  - dropdown from as option along execute button ✅
- send actual ethereum when payable ✅
  - allow entering amount with conversions from wei, ether, gwei & usdc ✅
  - conversion metrics should be specific to ETH ✅
  - show change in balance of account ✅
- reorganize array container add, delete & provide button. ✅
- start all arrays & array of tuples with 0 entries ✅
- support other uint types ✅
- support bytes ✅
  - bytes32 ✅
  - any bytes from 1 to 31 ✅
  - bytesArray ✅
  - bytes ✅
- support uint128, uint96, uint64 etc. ✅
- support mappings ✅
- support enums ✅

## Events ✅
- show them ✅
- should be of correct type ✅

## UI
- show reload button ✅
- show reload notification ✅
- remove content from top bar when screen is smaller ✅

## balances/wallets
- balance of contracts
  - display balance of contract ✅
  - fetch balance after transaction ✅
  - fetch balances of all contracts on startup ✅
- transfer balance between addresses ✅

## Issues Found
- changing to a different RPC, like via metamask, could result in broken UI if contracts are not present. ✅
  - ContractsTable can show that no contracts found on RPC ✅
- contracts page when refreshed is blank ✅
- input text box gives warning error ✅
- wallet drop down needs higher z index to be over left element icons ✅
- do no shorten address when it is invalid ✅
- app opened first without chain ✅
  - tell no chain found ✅
  - allow connecting to chain ✅
  - re-check if chain is now up ✅
  - shows red for contracts which were deployed after it checked. should be able to read them. ✅
- chain addresses are missing in the address dropdown ✅
- be able to call with empty array ✅
  - show add at bottom & preview in button dropdown ✅
- outputs & inputs are not changing when we remove them in code ✅
- does not show anything after uploading contract addresses when chain is missing ✅
- no way to make it re-check for chain. ✅
- the initiated toast should not go away after 5 seconds ✅

## Performance
- update balances by making 1 call to state ✅
- balance check calls should go in parallel without wait & with timeout ✅
- returning an address is slow. it re-renders the whole page (~ 400ms) ✅
- break up context to improve performance ✅
  - adding a new address to output should re-render only components which need that address ✅
- changing address in dropdown is slow.  ✅
  - it causes everything to be rebuilt as `contractWriteObject` has changed.  ✅

## Refactor
- refactor display number element to use `InputLeftElement` ✅

## impersonation ✅
- allow impersonation of any account ✅
  - store `isHardhat` state ✅
  - prevent adding same account again as impersonated account ✅
  - store impersonated accounts in list ✅
- transfer eth to/from that account ✅
- use that account on a contract ✅
- use that account on a public contract ✅

## Production Usage
- add a contract manually ✅
- what should happen to manually added contract when provider changes ✅
- what should happen to manually added contract when we reset ✅
- impresonate an account ✅
- edit a contract abi ✅

## Issue
- flickers when opnening modal for transfer ✅
  - scroll bar on contracts page, and no scroll bar when opening modal ✅
- contract addresses as duplicates ✅

## Error parsing improvement
- when reason is there, then no need of method & code with generic info ✅
  - method: estimateGas, code: UNPREDICTABLE_GAS_LIMIT ✅
- when not enough money, parse error better ✅