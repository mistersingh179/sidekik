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
- add arbiscan ✅

## bug
- Temp fix - stop this checking ✅
- app breaks when there is a struct with bytes32 & bytes ✅

------------------------------------------------

## ui
- show units when parsing
- no money should have better
- copy address of contract easily
- wei <-> $
- usdc <-> $

Input side you enter a number, and you tell us what unit you are entering in.
We then convert what you have to what we need.
e.g. 
- Eth <-> wei
here you are typing in Eth and you want us to conver to Wei
so we just divide it by 10^18 by doing parseUint

## features
- think/research/prototype on providing a pre-setup link for a forking
- should we change chain to fetch from be same as your own chain
- how can we deploy from remix to our chain

## bugs
 
## website
 - getting started videos
   - truffle
   - hardhat
   - foundary