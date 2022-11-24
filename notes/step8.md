# step 8 mission: make on boarding of users easier.

## features
- support truffle ✅
  - parse the address from json file ✅
  - extract correct network name(develop) and id(5777) from chain ✅
  - support forking & impersonating
- support foundry
  - accept its abi file in the out directory
    - it has no contractName, so need substitue. 
    - the abi itself is good.
  - accept its contract address file
    - it has deployedTo in the key
- allow user to specify which chain to read contracts for
  - so when inputting a file, they want to read contracts deployed to to chain 1234(ganache gui chain) but their ganache ui is behing the scenes using ganache which is at 1337
- needs to be a way to refresh found icon on contracts
  - maybe read again should do it
  - or tapping on the icon should make it look again
  - currently having to refresh app
- transfer & transferFrom, should be together
- read files in a worker thread
  - this is to not block UI when it is reading the disk
- when uploading directory set sync to default to minimum 5 seconds
  - so if time is less than 5 seconds, bump it to 5 seconds

## content
- build content showing that it works with truffle
- rearrange content to fit in truffle
- do something with flashbots
- do something with chainlink
- do something with zkSync
- write about how to deploy code in real time & sav addresses to a file. ✅
- add new demo video to "introduction to sidekik" & homepage ✅
- build docs with gitbook ✅

## ui
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

## bug
- when no network, it is reading every 1 second, and flashing th e input contracts
- pending tx via metamask did not show spinner while tx was being mined
- slow with whole directory loaded in
- ignore blank `[]` abi's when parsing. shows lots empty items when parsing complete directories

## bugs from slivertongue
So list of bugs:

- When I try to pass in an empty array: [] as a bytes[] arguments, it returns an error for some reason
  --- That happens when I try to pass in the empty array as part of a struct, like Transaction for instance
- Formatting isn't great on smaller desktop devices which makes it difficult for me to be able to interact with your application

Extra feature:

- I end up copy pasting a lot of the same variables when I am testing, so it would be great to have a way to 1. have variables ready in the drop down for certain parameters or 2. have them directly rendered into the input field so I don't have to go for a copy / paste of 10 arguments every time it reloads
  LMK if all that is clear.

## documentation
- update for truffle
- add path & fs to document for saveContractFile in hardhat
- also make sure name is correct for saveContractFile in hardhat