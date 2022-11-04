Assumption: solidity devs & web3 devs are seperate as FE & BE devs are.

always show things like block.timestamp, block number etc.
webstorm integration to show methods in a tab.
ui of events
postgres database of events, auto builds tables, types, indexes etc. from abi
different from graphql postgres as maps events and not entities
api endpoint for events
local/hosted graphql from mappings & schema in folder or github
gas usage, & stat graphs
console.logs
button to impersonate any account.
get tokens on a fork. click button and it puts USDC, ETH, DAI etc. in to my wallet. it has the contract address of popular contracts, allows adding more and then lookup their top wallet holders and transfers from there. it knows the ABI so knows what methods to call. it has addresses for each currency for different rpc urls / chains.
show correct error when it write fails.
show gas cost as you change input params and detect failure like wallets do.
redploy contract from UI, this can help reset state
show history of method calls. so i can see what output was or what gas cost was with varying input.
preview of gas estimate before calling method as input is changed
auto tell that transaction wont go through as insuffecient balance
e.g. of running method on every deployment is change owner to address in UI.
when function is called show me how much gas it cost, how many units it took, what that is in $ per chain, with average gas cost at that time. note each chain has different cost per unit.
i should be able to change input params and see gas cost change.
detects that the contracts exist to detect if fork.
allow setting how much gas price we want for our transactions, in settings and customize per transaction.
input can be ethers or other currencies and it get the decimals right as usdc has 6 and ethers has 18
with forked network call methods on any contract. e.g. check & transfer usdc balance.
need to put ether in to the top holder account. need to find a holder which is EOA.
dynamic contracts, address not in exported hardhat abi file
allow adding an external contract on any chain via address & show its methods from its abi where verified. for when not verified, allow using local path to abi. this means i can type in usdc contract address & give myself usdc.
function types auto setup including time, wei, structs, arrays etc.
function which takes a struct should have box for each input of struct, not one box for entire struct. and each smaller input box should be of right types. and if it is array of structs, then it is multiple such items.
even after the tests pass, i feel the need to call it from the UI and make sure that the function returns what i want and in the order i want. my tests are in JS so it is more likely that the tests see what web will see, but when tests are in a different language, then this becomes even more important.
shortcut to seed data in to the contract. it calls the funcions for me, everytime the contract is deployed. e.g. everytime i change code on auction.sol, it is re-deployed, so seed in 2 auctions.
publishes pages let contract makers tell a story to their audience, while also allowing the audience to be the customer and purchase with no UI restriction.
as dev i want to pushlish page with 3 functions like shutdown, withdraw, change fee for business. then something similar for ops team. i dont want to show all the other functions there.
last deployed at. when many seconds ago, i know  my latest code is not here.
show the result of each call including transaction hash, success status.
show proper error message when it fails
allow mapping of inputs to any type & remember example uint to ether & string to iso8601 yyyy-mm-dd then show appropriate widget to fill it up.
compile error shows in UI. telling that the UI you see doesnt have your changes
command+k to highlight a methods
BigNumbers auto changed to Numbers in returns & in errors.
auto sends default value for params
when function is called, show transaction status
allow tabbing to go between inputs
press enter to execute function
drop down to show previously entered values for the function
button to convert any number into Eth, date because we use ints to represent them.
auto build methods for evm methods like mine, increment time, impersonate etc.
takes numbers as strings, converts to bigNumber and then sends it up.
tab to go between methods
my wallet address, token amounts, contracts to click in to, contract addresses etc. frozen so if i scroll down for methods i still see addresses etc.
if takes an array, auto build array when only 1 value is entered.
drag and drop methods so i can see the getter and setter together when working.
view funcions show inline, auto refresh, with last change timestamp, last fetch timestamp, and refresh button
write function show correct response with eth cost, gas etc. auto gets gas with notification when not there.
show values changing old value strike-thru and then new value. so i know value changed.
when function is called show inline transactionHash, index, blockNumber, blockHash etc.
handle errors when calling functions. show correct error message inline.
better ui to send multiple params and get multiple params
input types with quick defaults like 0 address, 1 eth, random address, your address, another wallet address
save inputs to a function, name it, so that next time we can repeat it, rather than having to type it again
show inhereted methods seperately, many times the public mehods of inherited contracts just add noise, e.g. all methods of ownable. They should be categoried by the class which is causing them to be there.
see state of contracts with highlighting for as it changes. e.g. i have wrong address for a contract, this will show me that
build documentation by looking at abi and showing that to me when reviewing contract or interacting with method
chain agnostic, no package required so we can use in production or elsewhere, and anyone can use including business peopple. no need to rely on etherscan to be working or devs to be making admin portals.
make calls from any wallet. ui has all wallets funded and ready to go.
script to fund them with tokens of other contracts.
quick search box to find of method. command + k.
all number input boxes should have dropdown to select ether, gwei, or calendar date. with ability to use decimals. it behind the scenes sends in wei
string input boxes shouuld have calendar
address input box should have select with addresses
after adding an additional param to function, be able to edit existing call like in postman you edit the request obj to have additional params.
multiple input boxes when it takes an array, if array of numbers, then multiple number boxes. if array of strings, the multiple sting boxes, without the need to put quotes around each string and having to open close paranthesis as we do in scaffold-eth. if array of a struct, then it list of boxes where each box has further multiple boxes.
when response is an array show each item seperately parsed.
very important to call the same function we called before as we can in postman. in postman it saves each function call in a new tab. then we can name and save it. same should happen here. e.g. "place small bid", "place large bid". they are to the same function but because params are different, they have different names & thus meanings.
when return type is int, then have option cast to eth (calling ethers.formatEther), gwei, & date etc. and then remember that.
various ways to order functions, alphabetic, most recently used, getter/setters together, custom drag+drop, etc.
with scaffold eth the deployer is not the wallet in the browser. the deployer is the owner by default. so functions which require owner wont work. should be able to have deployer, owner or any wallet as the transaction maker in the browser.
quick inserting address 0 or random addresses or my address or another wallet address
save running of functions in order with params as a recipe
toggle auto run on deployment with results
tell when contract was last deployed or redployed so we know if it has latest changes or not.
bypass metamask
toggle on-off auto refreshing of some or all read-values on every block.
see console.log outputs inline after making function call
see events inline after making function calls
see state change inline after making function calls
address type input should dropdown to other contracts, wallets etc.
remember my inputs so i can use them elsewhere
input boxes should handle decimals
ui has reset / redeploy button
previous transaction history
ui has checkpoint button, it stores all interactions till then and then redploys contract and runs all interactions in that order. this may not have same outcome if code looks at block.timestamp as that will be different. also it is checkpointing this contract and it may interact with other contracts which have not necessarily been reset.
when a bug is found, i can share that state with someone else. at least a history of what was done to easily reproduce that.
publish a page for the contract to the web, with just selected functions & selected recepies
the published page is like postman collection which twitter gives
the published page can also be customer facing. mvp.
the published page is also for marketing, as anyone can make this page on anyones smart contract with their recipe.
published page removes reliance on etherscan.
published page is better for normal people to interact & understand what the contract does than their own UI & etherscan. here they see functions & recepies.
published page can have comments from the world.
like dune analytics or thegraph, anyone can make published pages of contracts & share with their recepies

add any wallet by private key, mnemonic or use hardhat built in wallets, or random burner wallet
auto start functions which runs everytime contract is redeployed. this is like the setup which dissapears when the contract is redeployed.
solidity console emulation
correct errors when wrong type in
response is properly formatted
types options to go between
ability to pick wallet for each function call
ability to pick gas for each function call
errors
transaction hashes
etherscan transactions
all methods read/write
set gas/wallet for transaction
handle wei/eth string/array/bytes date/hour conversion to be like solidity
sharing config
tests
wallet, funds, transfer, mnemonic, privat key
load abi from github/locally/etherscan
connect to local chain or remote chain
server for recent data and local server for unlimited data
allows sending many input as bytes by donig abi.encode and then allows viewing data as correct types when output is bytes by doing abi.decode. we just tell it the types and it remembers it.
all previous transactions with decoded data
time stepping like in redux tools for the contract, shows the values as they changed with each transaction the tool made. here if other parties are calling the contract also then results will be according to that.

in development phase: ease of development
in production phase: ease of interaction, no reliance on hosted service like etherscan
built in `solidity-shell`