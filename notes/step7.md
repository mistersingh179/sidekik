# step7 mission: add much needed features & quality of life improvements

## ui
- make polling on by default ✅
- add some space at bottom ✅
- not enough gas error needs formatting ✅
- show units when parsing ✅
- seperate mwei, usdc & decimals to USD ✅
- refactor numberDisplay & numberInput ✅

## features
 - ga ✅
 - clarity by msft ✅
 - hardcode [owner & 'ownerShip'] a sibbling ✅
- when impersonating & has no eth, be able to add eth. ✅
  - allow doing setBalance when transfer does not work ✅
  - update balance when it changes on an impersonated account ✅
- work with proxy contracts ✅
- dai contract has inputs with no name. key issue ✅
- add arbiscan ✅

## bug
- Temp fix - stop this checking ✅
- app breaks when there is a struct with bytes32 & bytes ✅

------------------------------------------------

## ui

## features
- think/research/prototype on providing a pre-setup link for a forking
  - one machine with 100's of hardhat commands running
  - each service is at a different port / subdomain
  - all services stores in a hash
  - UI page which says "Create Private Testnet by using Hardhat & forking mainnet"
  - /getHardhatEndPoint -> gives one service URL back
  - now you can use that endpoint inside hardhat and explore any contract
  - you can also deploy to it & then explore your own contracts
  - you can do impersonate, setBal, checkpoint, restore & reset.
  - FE makes call to /keepHardhatEndPointAlive?id=xyz
  - If x time has passed & no keep alive requests, then we reset node & make it available for others 
  - If hardhat chain has received no requests for some time, we can find out by logs maybe, then we can reset node & take it away.
  - x minutes of no transactions and we reset it
  - when we reset, can we set new subdomain for it, so if you hit old one, it tells you not here.
- should we change chain to fetch from be same as your own chain
- how can we deploy from remix to our chain

## bugs
 - events shows empty box when doing setName
## website
 - getting started videos
   - truffle
   - hardhat
   - foundary

## some example with chainlink