# step 8 mission: make onboarding of users easier.

## features

- support truffle ✅
  - parse the address from json file ✅
  - extract correct network name(develop) and id(5777) from chain ✅
- support foundry ✅
  - accept its abi file in the out directory ✅
    - it has no contractName, so need substitue. ✅
    - the abi itself is good. ✅
  - accept its contract address file ✅
    - it has deployedTo in the key ✅
  - support impersonating ✅
- remove confusing console.logs ✅
- make ajax call first before RPC to catch & show pretty error ✅
- add instructions in the console ✅
- walletBalance unable to read error when chain is broken ✅
- disable continue button unless at least 1 contract has address ✅
- add tooltip to the continue button ✅
- ui freaks out if chainProvider is bad and contracts are entered ✅
  - it starts refreshing over & over ✅
- provide help tooltip on sync directory & files ✅
- make RPC box red when endpoint unavailable ✅
- check rpc is good beforehand by making an actual RPC call ✅
  - a valid URL which is not a RPC should fail ✅
- add intercom ✅
  - integrate id in to clarity ✅

## content

- rearrange content to fit in truffle ✅
- update foundry instructions with chokidar ✅
- write about how to deploy code in real time & sav addresses to a file. ✅
- add new demo video to "introduction to sidekik" & homepage ✅
- build docs with gitbook ✅
- make video of hot reloading for foundry ✅
- write about web worker ✅
- investigate ethbuilders.nyc
- setup meetup

## ui

- add message when browser is not supported ✅
- tell them boldly no network has not been set up. ✅
- bigger error when no chain connected ✅
- make address box editable on setup Files screen ✅
- move $ in decimals to the bottom
- can not move forward by hitting continue till we also have ABI ✅
- ignore recording of ga & clarity in dev ✅
- title of app says React App ✅
- or Connect -> to or MetaMask ✅
- connect tour & Learn more to -> get started ✅
- update home page video ✅

## bug

- two files with same name cause clash of keys ✅
  - rejecting two files with same name ✅
  - rejecting two directories with same name ✅
- can add two files with same name, this causes loop reading ✅
  - the loop happened when files had different content ✅
  - rejecting duplicate names solves the issue ✅
- why so many getBalance calls, when syncing a directory? ✅
  - we are fetching all balances when new contracts without addresses are added ✅
  - it is calling even when abi comes in with no address ✅
  - we are fetching all balances when a tx runs ✅
- when names are same it keeps reading over & over ✅
  - makes multiple calls to chain for balance & code ✅
  - store path of file. ✅
- every transaction leads to a bunch of getBalance calls ✅
- when no network, it is reading every 1 second, and flashing the input contracts ✅
- unable to use on brave ✅
- show message asking to use chrome ✅
  - showOpenFilePicker does not work ✅
  - showDirectoryPicker does not work ✅
  - disable buttons which won't work ✅
- address field should either be editable or not be there ✅
- shows continue button, when there is no address, just a contract
- fix name of worker file ✅
- fix name of woker instance from instance to something else ✅
- refactor processRpcUrl to have proper if statement for `instance.current` ✅
- removing and adding directory does not read its files which were before removed. ✅
  - seems like it still has cache even though it was removed. ✅
- pending tx via metamask did not show spinner while tx was being mined
- not fetching abi when connected to metamask

### bug - slowness / performance issue when syncing directory ✅

- read files in a worker thread ✅
  - this is to not block UI when it is reading the disk ✅
  - make 1 persistent worker for better performance ✅
- change polling to be 2 seconds ✅
- changed polling delay to be a gap after reading ended ✅
- slow with whole directory loaded in ✅
- ignore blank `[]` abi's when parsing. shows lots empty items when parsing complete directories ✅
- ignoring abi files with empty abi and bytecodes for hardhat & foundry format ✅

## bugs from silvertongue

- bytes can be set with empty value & internally uses 0x ✅
- bytes32 can be set with empty value & internally uses 0x00..00 ✅
- if a struct has an array show array ✅
- set input array to empty value of `[]` was already ✅
- set input number to be empty value ✅
- set input string to be empty value ✅
  - the field seems to be missing completely when there is no change ✅
  - after a change we have emtpy string which works ✅
  - maybe because there is no format, so it never handles change initially ✅
- set bool to empty value ✅
  - currently also missing as string since no format operator ✅
- all fields but address should work when set to empty. ✅
  - it should not error out as it is submitting their appropriate empty value ✅
- When I try to pass in an empty array: [] as a bytes[] arguments, it returns an error for some reason ✅
- That happens when I try to pass in the empty array as part of a struct, like Transaction for instance ✅


## bugs from chillipaneer

> I can't upload a file or sync to a directory errror:Uncaught (in promise) TypeError: window.showOpenFilePicker is not a function ✅
> polling of local server appears to still be happening even when connected with metamask
> and none of the contact links connect to anything ✅

## bugs from chillipaneer on live session

- auto remove space from pasted in contract address
- no paste in address dropdown
- address dropdown blur, removes the value
- the reason I use remix, because I get these functions UI. now i can switch to hardhat.
- overloaded functions dont work!!! ✅

## feedback form austin

> put last used function on top
> preserve values
> show contract address on top
> re-run a tx

## more feedback from slivertongue

> when i switch out between contracts the inputs of the contract im switching out of disappear, would be great to keep them
> would be great to split the screen so i dont have to tab in and out

## more bugs from chillipaneer

> yeah. those buttons are working with chrome, but not with Brave, even with shields down.
> They're both constantly polling localhost:8545 even when metamask connected and RPC URL option is disabled
> have pinged you on twitter

## Extra feature request from silvertongue:

- I end up copy pasting a lot of the same variables when I am testing, so it would be great to have a way to 1. have variables ready in the drop down for certain parameters or 2. have them directly rendered into the input field so I don't have to go for a copy / paste of 10 arguments every time it reloads
  LMK if all that is clear.

## documentation

- update for truffle ✅
- add path & fs to document for saveContractFile in hardhat ✅
- also make sure name is correct for saveContractFile in hardhat ✅

## refactor

- put error boundary around each row

## research

- can disappearing abi tell us, that there is a compile error.
  - in foundry file becomes empty when there is compilation error.

## ts definition builder
- use abi files to build type definitions

## sidekik-notification

- use `osascript -e` to call `display notification` when there is a compile error ✅

## feedback from blue taxi from toronto

- I'm curious, is there any way for contracts I put on here to be saved? Everytime I refresh or disconnect metamask they dissapear which makes it kinda pointless.
- Using it for a live chain not for hardhat*

