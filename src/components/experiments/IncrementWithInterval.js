import { Button, Heading, Text } from "@chakra-ui/react";
import { useEffect, useReducer, useRef, useState } from "react";

const IncrementWithInterval = (props) => {
  // const [count, setCount] = useState(1);
  // const [step, setStep] = useState(1);

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setCount(count + step);
  //   }, 1000);
  //   return () => {
  //     clearInterval(id);
  //   };
  // }, [count, step]);
  // having count & steps as deps, makes the function redo the setInterval everytime the value changes
  // so its like setTimeout and less setInterval as everytime count changes it re-sets up
  // and every time we change step it resets up the setInterval and starts waiting for 1 second again
  // since we can manually change the step, everytime we change it,
  // it sets up again and starts waiting for 1 second from that point

  // const stepRef = useRef();
  // stepRef.current = step;

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setCount(count + stepRef.current);
  //   }, 1000);
  //   return () => {
  //     clearInterval(id);
  //   };
  // }, [count]);
  // this is still acting like setTimeout
  // everytime we change count, we reset it up
  // but we no longer rely on step
  // we have a reference to step, so if its changed by future render call
  // here in this function we have reference to it and get the correct value

  // change to ref wont cause render
  // so we store value in state and then get that value in to the ref
  // now  a future render cycle updtes the ref
  // and the interval function setup in an old render cycle gets the latest value
  // in interval we read from ref, and then change the state
  // the step button reads direct from state as it is run in the same render cycle as when step has current value.

  // const countRef = useRef();
  // countRef.current = count;
  // const stepRef = useRef();
  // stepRef.current = step;
  //
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setCount(countRef.current + stepRef.current);
  //   }, 1000);
  //   return () => {
  //     clearInterval(id);
  //   };
  // }, []);

  // return (
  //   <>
  //     <Heading>IncrementWithInterval</Heading>
  //     <Text>Count: {count}</Text>
  //     <Text>Step: {stepRef.current}</Text>
  //     <Button onClick={() => setStep(step + 1)}>
  //       Increment Step
  //     </Button>
  //   </>
  // );

  // here the effect dispatches what happened instead of doing what should be done
  // the dispatch function is static, so the useEffect always has the correct one
  // dispatch causes React to call the reducer function with the latest state,
  // this latest state is the latest value of state, and not the old value which the effect had.
  const [state, dispatch] = useReducer(
    (state, action) => {
      const { type, payload } = action;
      const { count, step } = state;
      if (type == "tick") {
        return { count: count + step, step };
      } else if (type == "step") {
        return { count: count, step: step + 1 };
      } else {
        console.log(state);
        console.log(action);
        throw new Error("Unknown action");
      }
    },
    {
      count: 1,
      step: 1,
    }
  );

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({type: "tick"}) ;
    }, 1000);
    return () => {
      clearInterval(id);
    };
  })

  return (
    <>
      <Heading>IncrementWithInterval</Heading>
      <Text>Count: {state.count}</Text>
      <Text>Step: {state.step}</Text>
      <Button onClick={() => dispatch({type: "step"})}>Increment Step</Button>
    </>
  );
};

export default IncrementWithInterval;
