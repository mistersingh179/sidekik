# step 8 mission: make on boarding of users easier.

## features
- support truffle ✅
  - parse the address from json file ✅
  - extract correct network name(develop) and id(5777) from chain ✅
  - support forking & impersonating
- allow user to specify which chain to read contracts for
  - so when inputting a file, they want to read contracts deployed to to chain 1234(ganache gui chain) but their ganache ui is behing the scenes using ganache which is at 1337
- needs to be a way to refresh found icon on contracts
  - maybe read again should do it
  - or tapping on the icon should make it look again
  - currently having to refresh app

## content
- build content showing that it works with truffle
- rearrange content to fit in truffle
- do something with flashbots
- do something with chainlink
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
## bug
- when no network, it is reading every 1 second, and flashing th e input contracts
- pending tx via metamask did not show spinner while tx was being mined

## documentation
- update for truffle
- add path & fs to document for saveContractFile in hardhat
- also make sure name is correct for saveContractFile in hardhat