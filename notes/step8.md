# step 8 mission: make onboarding of users easier.

## features
- support truffle ✅
  - parse the address from json file ✅
  - extract correct network name(develop) and id(5777) from chain ✅
- support foundry ✅
  - accept its abi file in the out directory ✅
    - it has no contractName, so need substitue.  ✅
    - the abi itself is good. ✅
  - accept its contract address file ✅
    - it has deployedTo in the key ✅
  - support impersonating ✅

## performance improvements
- read files in a worker thread
  - this is to not block UI when it is reading the disk
- when uploading directory set sync to default to minimum 5 seconds
  - so if time is less than 5 seconds, bump it to 5 seconds

## content
- rearrange content to fit in truffle ✅
- update foundry instructions with chokidar ✅
- do something with flashbots
- do something with chainlink
- do something with zkSync
- write about how to deploy code in real time & sav addresses to a file. ✅
- add new demo video to "introduction to sidekik" & homepage ✅
- build docs with gitbook ✅
- investigate ethbuilders.nyc
- setup meetup
- make video of hot reloading for foundry ✅

## ui
- add message when browser is not supported
- when launching tell them boldly that no network has been found.
- inform the user what we read, this way they can fix or triage why their contracts are not being read or why the wrong contracts are being read.
- make address box editable on setup Files screen
- title of app says React App ✅
- or Connect -> to or MetaMask ✅
- bigger error when no chain connected
- connect tour & Learn more to -> get started ✅
- update home page video ✅
- move $ in decimals to the bottom
- dont show chrome auto suggest on name
- can not move forward by hitting continue till we also have ABI
- ignore recording of ga & clarity in dev

## bug
- two files with same name cause clash of keys
- can add two files with same name, this causes loop reading
- why so many getBalance calls, when syncing a directory?
- when names are same it keeps reading over & over ✅
  - makes multiple calls to chain for balance & code ✅
  - store path of file. ✅
- every transaction leads to a bunch of getBalance calls
- when no network, it is reading every 1 second, and flashing the input contracts
- pending tx via metamask did not show spinner while tx was being mined
- slow with whole directory loaded in
- ignore blank `[]` abi's when parsing. shows lots empty items when parsing complete directories
- unable to use on brave ✅
- show message asking to use chrome ✅
  - showOpenFilePicker does not work ✅
  - showDirectoryPicker does not work ✅
  - disable buttons which won't work ✅
- not fetching abi when connected to metamask
- address field should either be editable or not be there

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
- all fields but address should work when set to empty.  ✅
  - it should not error out as it is submitting their appropriate empty value ✅
- When I try to pass in an empty array: [] as a bytes[] arguments, it returns an error for some reason ✅
- That happens when I try to pass in the empty array as part of a struct, like Transaction for instance ✅

## more from silvertongue
- how to fake things such as block.timestamp
- @MisterSingh - other future feature request -> can you give me ability to organize my functiosn in the order that I want too? and for that order to be saved - would be nice to prevent me from scrolling up and down unnecessarily while I'm testing
- >and another additional - most likely more important feature - the ability to create a "FLOW" => I can order transactions in a specific order with their placeholder / pre-determined inputs and trigger them, so that I don't have to click through A -> B -> C to see the result of C every time - unsure if that is clear?

## bugs from chillipaneer
> nice. sidekik looks like it will be awesome.
I stuck with remix for something recently just because it made it easy to interact with the contracts on testnet.
but it looks like the app is still being built.
I can't upload a file or sync to a directory     errror:Uncaught (in promise) TypeError: window.showOpenFilePicker is not a function
polling of local server appears to still be happening even when connected with metamask
and none of the contact links connect to anything
let me know if I can help out with testing. It looks like a killer tool

## bugs from chillipaneer on live session
- auto remove space from pasted in contract address
- no paste in address dropdown
- address dropdown blur, removes the value
- the reason I use remix, because I get these functions UI. now i can switch to hardhat.
- overloaded functions dont work!!!


## feedback form austin
> put last used function on top
> preserve values
> show contract address on top
> re-run a tx
> 

## more feedback from slivertongue
> when i switch out between contracts the inputs of the contract im switching out of disappear, would be great to keep them
> would be great to split the screen so i dont have to tab in and out

## more bugs from chillipaneer
> yeah. those buttons are working with chrome, but not with Brave, even with shields down.
They're both constantly polling localhost:8545 even when metamask connected and RPC URL option is disabled
have pinged you on twitter

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