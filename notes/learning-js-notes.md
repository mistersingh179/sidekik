# react
 
## performance
- dont puts 
## bugs
- don't use key same as index when the order will change.

## render props
- todo

## context

## hooks
- if you use a props, state or function, then it must be a depenedency
- if you have a func as dependency, then when it changes, expect the effect to re-fire
- best practice to move functions used by effect, to be inside the effect
- this way we can better see what the dependencies are.
- if the function does not rely on any state or prop, then move them entirely outside the function

## Notes after reading complete guide on `useEffect`
- https://overreacted.io/a-complete-guide-to-useeffect/
- everytime the state changes, React calls the component function again
- when the component function runs again `setState(initValue)` now returns the `newValue`
- this happened because state was changed with call to `setState(newValue)`
```
const Foo(props) => {
    const [count, setCount] = useState(0); // this line returns the new updated value for `count` when the function is called again
    cont handler = () => { setCount((new Date()).getTime())} } // this updates the state, because of which React calls this entire function again.
    return <Button onClick={hander}>Foo</Button>
}
```
- the value of `count` stays fixed in every `render`
- the component is called again and then the count gets its new value & that stays fixed.
- in every call to the function component, the functions are also redefined
- and they take/see the value of state/props as they are in that function, as of that call.
- when they are redefined/reinitialized, they take the latest updated value of state/props
- this is important, otherwise they would be showing old values.
- React runs the functions in `useEffect` everytime the function component runs
- React calls it **after** the DOM has changed and browser has been painted
- so `effect` are part of the render result
- each event handler, effect, function, etc. see the value of state/prop as it is in that function call
- to get latest value, we can use refs 
- here when updating value we set `refObj.current = newValue` and then we retrieve it from the same `refObj`
- the ref remains obj remains same between renders, so it gets latest value.
- in `useState` it returns a fixed value.
- in `useRef` it returns a reference to a value, so if that value changes, then we will read the newer value
- in `useState` it was copy by calue, so even it the value has changed, in this render, we are still seeing old value.
- when new props or state comes, the effect & the effect cleanup run after the dom has been updated with new values
- the cleanup still has access to old value even though they state/prop has changed to new value
- for effect functions, react will run them everytime, but if we pass in dependencies, then it can compare them
- it compares the new dependencies with the old one, and if they are same it can skip running the effect fucntion
- if we don't specify dependencies, then react will just run it everytime the function is rendered
- if we do specify dependencies then we must list all props & state being used otherwise it wont run the function
- another approach is to reduce the dependencies. if the effect relies on less things which change, then thats better.
- using `useRef` yes we can get the latest value of variable. in current run of the render cycle we are getting the value which is as per the change made by a future render cycle
- but change to `useRef.current` does not trigger the render cycle again
- so if you are showing `{useRef.current}` yes it has latest value, but when it changes, that change wont trigger a re-render
- for the re-render to happen we need change to state or props
- so have value in state and then have `myRef.current = stateVal` and then change state. this cause rerender and the ref changes so code in old render cycles can get latest value as well
```
const Foo=(props) => {
    const fetchData = () => {}; // calls API & updates state;
    useEffect(fetchData);
}
```
- here `useEffect` should have deps and that deps should include any state props used by `fetchProps`
- deps should not have `fetchData` as that function is being redefined on every render call.
- unless the function used `useCallback` and rebuilt itself only when props/state changed
- then in that case the effect could just check if the function was redefined.
- `useReducer` allows setting when state variable which depends on another state variable
- note: `setState`, `dispatch` and `useRef` container objects are guaranteed by React to be static throughout the component's lifetime, thus we can omit writing them as a dependency in an effect.
- by using `dispatch` in an effect, the effect can tell what happened, rather than taking action
- the dispatch causes React to call the reducer function with latest state
- unlike the effect, if it had taken action it would have had old state value
```
useReducer(state, action) => {}); // here we get latest state;
useEffect(() => { disaptch({type: "INC"}); })
```
- see that the reducer function gets `state` injected as a param from react
- the reducer function can also access props. dispatch which is static will call the latest reducer from the latest render, thus it will have the latest prop values
- it is best to either define the function inside the hook and all other functions it calls so we can see its dependecies
- or we should add the external function as a dependency, but this means that we need to use `useCallback` and redefine the function only when its deps have changed. if we don't the function will change everytime and the effect will fire everytime.
- or if the function doesn't use any state prop then just move it outside the function component so that is clear and no dep is added by mistake in future.
- when a function is being passed down & being called from an effect in the child, then best to put `useCallback` around it, so it is only redefined when its deps have changed and then in the child class we can make the passed down function as a dependency since it doesnt know its implementation and have access to its dependencies.
- if an object is a dependency then that object should be `useMemo`. and now we wont unnecessarily fire the effect.
- if the `useEffect` does an `async` thing, then we can have a race condition as it may fire twice and first aysnc finishes second and thus its data overwrites whats in state.
- solution for race condition is to track if it has been cancelled inside the hook by using its return which is called by React when component unmount/clean-up happens. then after the async returns we check if it has cancelled and if so we wont save in state
- with this approach if first effect finishes second it wont save it as its cleanup as flipped the boolean.
- instead of passing down callbacks, we can just pass down `dispatch` from `useReducer`. no need to pass down custom callbacks as dispatch alone is enough.

## notes after reading classes vs function components
- https://overreacted.io/how-are-function-components-different-from-classes/
- functions in class components have access to `this` and `this` is mutable and thus has access to latest state & props, regardless of which render cycle its called from. 
- function components have props & state which are not mutable, so the handlers have access to value of that render
- ref's are an escape to setup a mutable value

## notes from bug o 
- https://overreacted.io/the-bug-o-notation/
- turn it on and off again
- dont let bugs build over
- by blanking the UI and then rebuilding based on input, we make code predictable
- instead of actions building on top of each other and output is matter of order

## notes from writing reselient components
- https://overreacted.io/writing-resilient-components/
- don't copy props in to state
- `const [foo, setFoo] = useState(props.foo)`
- `useState` will take init value only on first render and ignore any changes to it afterwards.
- our code will be using `foo` which wont change as only `props.foo` have changed
- if we use `prop.foo` directly then any changes made to it will cause our UI to use it
- load your `<App />` twice and make sure all works. nothing should be coded as singleton.
- state should be local for a component. test is think if that component was rendered twice do we want seperate state for each or want them to update each other.
- 

## pending read of react ui runtime
- https://overreacted.io/react-as-a-ui-runtime/

## notes after reading data fetching with hooks
- https://www.robinwieruch.de/react-hooks-fetch-data/
- maintain `isLoading` & `isFailed`
- maintain `isCancelled`. this will prevent race condition
- move it all out to a custom hook
- since 2 values depend on each other, then we should use `useReducer`
- `useReducer`'s reducer function always has access to latest state & prop, even when its called from a function of a previous render cycle


## functions inside a functional component
- it sees values from the render where it was created in
- it is by default re-created in every render 
- therefore by default has access to the latest state & prop
- when we optimize it, then we need to make sure that everything it uses causes it to redefine
- this is due to closure the functions create
- or we can use `ref` and access the `ref` inside the function which always gives it latest value.

## reducer hook
- advantage is that all properties are managed together through one reducer function
- so you can't accidentally set on property

## remount
- change its key, this will remount
- this mean it will loose all of its local old state
- and any uncontrolled inputs will loose their state

## context
- when context changes, it will render the compnonent again, even if it memozied
- so keep context outside, pass in what you need.

# ethers

## provider

### `JsonRpcProvider`

- `new ethers.providers.JsonRpcProvider("http://rpcurl.com")` will give a provider connected the provided rpc via http
- this will cause it to poll this url if you have event handler for `block`, `poll` etc.
- it will also poll if the event handler is for a event filter like `{ address: ethers.constants.AddressZero, topics: null }` which matches any topic from `address(0)`
- in theory, it should not poll if we use `ws` url, although not able to test this locally with hardhat

### `getDefaultProvider`

- `getDefaultProvider` will take chain name and then build the url with the names of the provider & their keys.
- it internally has logic to build url with chain name, provider name & auth key
- it also returns a `FallbackProvider` with has multiple RPC backings so it can do concensus check on their results

### `Web3Provider`

- gives a ethers.js provider by wrapping an existing wrapper which follows the EIP-1193 standard
- we can take the provider from metamask, wrap it & then use as a ethers.js provider 
- `const p = new ethers.providers.Web3Provider(window.ethereum);`
- and now `p.getSigner` is also coming from metamask
- `window.ethereum.enable()` allows site to work with metamask

### calling a method on a contract 
- `contract.functions.funcName` will always give a `Result` object, even when there is error or single value.
- `contract.funcName` will give single value if single item returned or `Result` object when more than one value is returns and throw error when there is error.
- `Result` Object has each item positionally and optionally named if it was named in the contract
- https://docs.ethers.io/v5/api/utils/abi/interface/#Result
- https://docs.ethers.io/v5/api/contract/contract/#Contract-functionsCall
- e.g. 
```
function boo() external view returns(string memory a, string memory b){
        return ("a", "b");
    }
```
will give back an object with properties `['a', 'b', a: 'a', b: 'b']`

### which provider is being used `metamask` or `infura`?

- for write transactions, we will use this `signer` coming from `metamask`, which has provider behind it
- for read requests, we can use our `JsonRpcProvider` directly as it does not need a `signer`, it bypasses `metamask` and we use our own RPC url

# web3Modal

- gives us a modal window to connect with different wallets
- `web3Modal.connect()` this gets us a `provider` from the wallet
- this is a web3 / eip-1193 compatible provider
- we can wrap this using `Web3Provider`
- on the `provider` we can call `wallet_switchEthereumChain`
- it gives us `web3Modal.cachedProvider` which when present we can connect
- also gives us `web3Modal.clearCachedProvider()` to remove all info
- gives us methods to get changes from the wallet like `accountsChanged`, `chainChanged`, `disconnect`
- it is our job to listen to these events & udate our UI as wallet has changed
- the default provider is `metamask`. for others we need to provide `providerOptions`

# gotchas

## looping & awaiting
- `forEach` loop is **not** promise aware
- `map` will return array of promises.
- `filter` it wont do any filtering as it wont await on the promise to resolve instead takes its value which is a promise & that would be truthy and thus it wont filter.
- `reduce` is similar. it is not getting a value, but a promise
- so we can can map over the items. get all promises then use `Promise.all` to get real values & then do `filter` or `reduce`
- a regular for loop, or any one without a callback works.
- https://zellwk.com/blog/async-await-in-loops/

## nullish coalescing operator `??`
- js has `??` which gives second value only if first value is either null or undefined
- `const b = 0 ?? c`. will set b to 0
- `const b = 0 || c`. will make b to c
- the `||` operator takes first non falsy value

## logical nullish assignment `??=`
- js has `??=` sets the value only if it is nullish
- `a = null; a ??= 5`, this sets a to 5
- `a = 2; a ??= 5`, this leaves a at 2
- same as saying `a = null; a = a ? 5`;
- similar can be done with `||` but that will skip over any falsely value like 0
- real life e.g. where `||` fails is `functionResult[func.name]?.transactionIndex || ""`
- here when `transactionIndex` is 0, it gives us ``

## optional chaining `?.`
- `?.` to access nested keys without checking that the previous key exists
- `a?.foo?.bar?.foobar` wont give an error but `undefined` when something in the chain is missing

## controlled input element's cursor jumps to end
- if `onChange` is doing something with `await` and then updating state and we are using that state in the input, then after changing it wont update immediately, this means the input will show old value & then when new value comes down, it will update whole thing.
- on other hand if we remove the async part our then the state updates immediately and the component never gets the wrong old value and thus no moving of cursor
- https://dev.to/kwirke/solving-caret-jumping-in-react-inputs-36ic?signin=true

## the callback function passes to `setInterval` doesn't have access to state
- we want to run some function periodically and in that function we access state
- but the function, when it runs gets old state
- https://overreacted.io/making-setinterval-declarative-with-react-hooks/
- https://www.youtube.com/watch?v=eTDnfS2_WE4
- issue is that the callback function is a closure and stores the value to state when it is defined first time, then if state changes and it runs the interval, it doesnt see the latest value because it is a closure. solution is to make that function a reference and then have that reference redefine that function everytime the state changes. since when state changes the callback function will redefine itself as it is not a useCallback thing. so we have new function, this function now again a closure has the latest value so we use it as a dependency in a useEffect and update our reference. then in the interval the reference is use
- so in essense we basically updated / redefined our function everytime the state rerendered itself, so that the functions closure can get the latest values from state & props.
- you ask why does the callback change, causing the effect to run & mutate the reference? it is because it is defined in the body of the function and whenever its state changes it will re-render causing the function to be defined again and this will make its closure pick up new values.

## component below are re-rendering?
- when the top components state changes, it will re-render all of its children component
- we dont want it to re-render when it doesnt take any state or props from the top component
- memo can prevent it from re-rendering, specially when nothing it needs has changed
- or we can decopuple them and not make one child of another
- or we can pass the child in as `children` and now react wont re-render its children when its state changes
- https://overreacted.io/before-you-memo/
- https://kentcdodds.com/blog/optimize-react-re-renders
- even though we say re-render, it is just calling that function and it internlly will not render to the dom as output is same

## seutp eslint
- `cra` already has brings eslint with some config in package.json
- in webstorm we just need to enable eslint automatic detection
- in files we will checkmarks, tick, warning error etc. for every file now thanks to eslint
- webstorm also has `problems` tab `cmd + q` which will show all lint issues

## in `useEffect` after `await` the value beinf read from state is stale
- this is because the value changed between when this function was initialized & when the code ran
- the `await` makes this possible
- the `useEffect` function is a closure and has old `state`

## useMemo & useCallback

- When you define an object inside your React function component, it is not going to be referentially equal to the last time that same object was defined (even if it has all the same properties with all the same values).
- so on every render it is different
- if the object.is aka === says that 2 objects/components are different then it will re-render.
- but primitives with same value, are same
- https://kentcdodds.com/blog/usememo-and-usecallback
- useMemo is not same as React.memo
- useCallback does not eliminate a re-render

## everything in context
- if anything in the context changes, then all components which use that context will get an update
- it may seem like each component is destructing only certain keys, but they get the whole context and thus get updated.
- to prevent this we want to have seperate contexts.