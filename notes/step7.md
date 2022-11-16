# step7 mission: add much needed features & quality of life improvements

## ui
- make polling on by default ✅
- add some space at bottom ✅
- not enough gas error needs formatting ✅

## features
 - ga ✅
 - clarity by msft ✅
 - hardcode [owner & 'ownerShip'] a sibbling ✅
- when impersonating & has no eth, be able to add eth. ✅
  - allow doing setBalance when transfer does not work ✅
  - update balance when it changes on an impersonated account ✅
- work with proxy contracts ✅
- dai contract has inputs with no name. key issue ✅

------------------------------------------------

## ui
- show units when parsing
- no money should have better
  - impersonated account, had no money
- copy address of contract easily
- wei <-> $
- usdc <-> $


## features
- think/research/prototype on providing a pre-setup link for a forking

## bugs
- why is polling making USDC & DAI slow?
  - current on every poll we check chain if contracts exist
  - and then we update the state with their "found" value
  - this causes slowness as DOM is changing
  - Temp fix - stop this checking
  - Long term fix: have separate poll for contract "found" check
    - this poll should do slowly
    - should requests to check in parallel for every contract
    - handle any failed requests
    - should not change state when values have not changing
  - app breaks when there is a struct with bytes32
 
## website
 - getting started videos
   - truffle
   - hardhat