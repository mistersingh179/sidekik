import { Button, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

const GetInfo = (props) => {
  const {value, handler} = props;

  return (
    <>
      Input: <Input value={value} onChange={(evt) => handler(evt.target.value)} />
    </>
  )
}

// state remains the same on rerenders
const Counter1 = (props) => {
  console.log("*** in counter");
  const [count, setCount] = useState(0);
  return (
    <>
      Counter: {count}
      <Button onClick={() => setCount(prevState => prevState + 1)}>Increment</Button>
      <Button onClick={() => setCount(prevState => prevState - 1)}>Decrement</Button>
    </>
  )
}

export default function StateIsResetting(props) {
  const [state, setState] = useState("");

  // state resets as component is re-run
  const Counter2 = (props) => {
    console.log("*** in counter");
    const [count, setCount] = useState(0);
    return (
      <>
        Counter: {count}
        <Button onClick={() => setCount(prevState => prevState + 1)}>Increment</Button>
        <Button onClick={() => setCount(prevState => prevState - 1)}>Decrement</Button>
      </>
    )
  }

  return(
    <>
      <Heading>Why Rendering</Heading>
      <GetInfo value={state} handler={setState} />
      <Counter1 />
      <Counter2 />
    </>
  )
}