Input
- items can be divided by groups
- Input Array with types recognized
- Input Struct with types recognized
- string to be shown as a link with meta data
- string to have preview if an image
  - bytes to upload file
- how to delete a specific item in input
- address dropdown should show ens name
- address dropdown should allow typing ens name 

naviation
- command+K to jump between functions

Output
- DropDown to format number to custom units where uints are provided
- show last ran on, on each function
- when via metamask, show block number
- look in to showing status
- show transaction started, pending, finished toast.
- address should ens name 
- output time & date option should have utc & local

Navigation
- search box to navigate contracts & their functions
- keyboard shortcut to open that search box

3 things
- contract interaction
- transaction history, these are all previous interactions we have had 
  - clicking on old transaction, brings that contract/function in view & populates it & indicates that they need to execute it. it also removes old response.
- it also has transaction hash so that can be searched on.
- events - these are all events we listen for, and they show up

recipies
- create a recipie
- add new transactions to recipe (can be accross multiple contracts)
- add old transactions to recipe (picked from transaction history) 
- re-order them
- execute entire recipe

search box
- searches contract names & functions
- on click scrolls & brings that contract/function in view
- look in to algolia

Input & Output
- anything which can be collapsed, should be collapsed by default
- button to expand
- row level button toggle expand & collapse of all inputs and outputs
- look at `decimals` to build specific conversions
  - use in USDC conversion
  - tooltips for outputs
  - labels for options

wallet
- inject any wallet using private key
- inject any wallet via mnemonic & index
- show latest balance by block
  - look in to eth-hooks
- transfer eth from one account to another
- add refresh to re-read balance
- auto read balance every block
- option to poll & refetch latest ballance
  - this way if an external tx changed it, we get updated
- add address by key
- add addresses by mnemonic

- file setup
  - read ABI from etherscan
  - allow manual entry of ABI
  - preview of uploaded file
  - be able manually add contract name
  - show abi missing/found icon
  - capture pure ABI files with just abi array
  - show last read on
  - instead of delete, we have disable enable
    - so if a re-read reads again, processes it as it has updated it wont enable it, if already disabled
  - see & edit ABI of a contract
    - currently we have to delete and re-add the contract
  
- outputs
  - in gas conversion allow user to customize price of token
  - in gas conversion allow use to add a token
  - if string, then check for base64 encoded data pointing to json or image etc.

- refactor
  - contract function, each function should have its state in its own component
  - put all addresses, contract addresses, output addresses etc. together in with one reducer
  - customAddress, OutputAddress & ImpersonatedAddress to be made by a common hook

- question
  - should it copy value being displayed or the source value. 
    - e.g if source value is X, then you change display to USD and now display value is Y.
    - what should be copied when looking at Y?

- execute
  - callStatic to check if will succeed or not without running it
  - estimateGas to get gas without state change

- reload
  - show last load time
  - indicate that in process of reloading UI

# refactoring
- dont store localProvider, instead just URL & isRPCValid
  - now we can reprocess it, and if it was present before, and present again, then it wont cause a re-render
  - therefore we can just keep reprocessing periodically
  - keep rpcURL & chainId & name all as simple primitives
  - in our code we will build the provider object as needed `new ethers.providers.JsonRpcProvider(rpcUrl);`
  - solves the problem of us showing green when RPC has disappeared
  - periodically check for contracts presence
    - check box next to address should go from green to red when contract dissapears and vice-versa
- show blocking modal when RPC not found
  - periodically reprocess RPC
  - if RPC changed, then also reprocess file
  - if RPC changed, then also check if contracts exist or not
  - when not found ask to either enter RPC or connect to metamask
- move outputAddresses & its setter to separate context provider
  - this way adding a new address does not update the entire globalContext
  - only dropdowns which use this new context will be updated
- `InputArrayContainer` should not keep its own state, but use what is passed in.
- We have 3 places with files
  - we have resources with file objects,
  - then we have contracts which are from those files
  - and then we have fileMd5Checksums for those files
  - Lets combine all this
  - so if we remove a file, then its contracts go away
  - also the md5 goes away
- removing directory/file should remove contracts we got from that file.
- refactor reducer for contracts to be a reducer for each object, and then giant reducer for hash

# performance
- don't use input boxes for displaying output
  - this will make re-rendering lighter
  - now when no data we just see labels
  - when there is data we see labels, values & conversion dropdown
  - clearing output makes all values go away, we now just see labels
- inputs which are tuples should be collapsed on start
  - tuples should have button "expand tuple"
  - if array has tuple, should add tuple expanded
- store hash of abi in common place, so it doesn't have to recaculate everytime it is rendered
- dont sort functions in render

# issues
- changing address in metamask is sending us to setup page
  - changing address does reconnect to wallet which sets up new Provider
  - since new provider it removes all old contracts and adds them again
  - this causes sending to setup page
  - this also causes fetching new chainAddresses
- support multiple toats for transactions
  - need to track each ref per click

# ui
- balance input box should be dynamiclly sized
- show which chain connected to icon like polygon, etherscan etc.
- the table is when overlflows is growing only on the right
  - can we use flex or grid 
  - shoud stay in center and then grow together
  - or Hstack with table in center and we can take full space
  - then table inputs needs to take fixed space
  - we want the table to start with the width it takes, and then grow, but input boxes are 100% unless we tell them their size. so size should be 400px when blank, else auto, i.e. 100%
  - try setting width on td to sm, md, lg based on size of screen
- allow inputs can become small when on small width
- for inputs remove placeholders to show type and move that to place holder when on small
- 

# features
- detect proxy contract & get implementation address
  - should work on proxy contracts
- when not polling, still poll & show a notification on the reload button of how many changes pending
- can we show console.logs in UI
  - check for events on the console contract and get data from there
- ui notification saying that code has been updated. should say that X number of functions added, Y number removed & Z changed.
- for hardhat addresses use label saying Hardhat address 0-20
- for impersonated addresses & output addresses do ens lookup and show picture
- if a verb, then sibblings are past, present & future
  - plural should match singular, so teeth & tooth should be grouped together
- implement hardhat helpers
  - move time forward
  - move time backward
  - show time
  - mine blocks
  - take snapshot / restore snapshot
  - https://hardhat.org/hardhat-network/docs/reference
- set hardhat gas price from what it learns
- expose all hardhat functions
  - can we fork chain from UI using hardhat functions
  - make snapshots, save & restore
- expose all evm functions
- auto add any contract on uniswap
- get money of any token on uniswap
- add custom contracts you want to fetch
- add custom tokens you want to fetch
- see mempool
- miner gas payment
- can we show code inline
- can we show natspec inline
- get code from transaction
- think, how can we tie this transaction to an outside event and fire it

# bugs
- display Number should not say Eth, but say 10^18 etc.
  - for example output of Dai should say 55 Million Dai, not 55 Million Eth
  - for usdc, it should say assuming the input is Wei, then using Eth/Usdc price, this is USDC: X
- why is polling making USDC & DAI slow?
- current on every poll we check chain if contracts exist
- and then we update the state with their "found" value
- this causes slowness as DOM is changing
- Long term fix: have separate poll for contract "found" check
  - this poll should do slowly
  - should requests to check in parallel for every contract
  - handle any failed requests
  - should not change state when values have not changing
- show the events which come from calling a function, but belong to another contract which was called
  - e.g. we call setName -> usdc.transfer
  - we need to get the event ABI from the contract which was called
  - and there is no event name & args on `receipt.event`, so we need to figure those out from `logs` etc.
  