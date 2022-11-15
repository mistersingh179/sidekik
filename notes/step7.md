## ui
- make polling on by default ✅
- add some space at bottom ✅


## features
 - ga ✅
 - clarity by msft ✅
 - hardcode [owner & 'ownerShip'] a sibbling ✅

----

- work with proxy contracts ✅
- dai contract has inputs with no name. key issue ✅

----

# step7 mission: add much needed features & quality of life improvements

## ui
- show units when parsing
- no money should have better
  - impersonated account, had no money
- copy address of contract easily
- wei <-> $
- usdc <-> $
- 

## features
- when impersonating & has no eth, add eth.
  - auto do setBalance upon impersonation
- think/research/prototype on providing a pre-setup link for a forking


## bugs
- why is polling making USDC & DAI slow?
  - current on every poll we check chain if contracts exist
  - and then we update the state with their "found" value
  - this causes slowness as DOM is changing
  - Temp fix - stop this checking
  - Long term fix is that we have seperate poll for existance check
    - this poll is slower
    - it makes requests to check in parallel
    - it handles any failed requests
    - does not change state when values is not changing
  - struct broke app when it had bytes32
 
