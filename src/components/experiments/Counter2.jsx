import { Heading } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useInterval } from "../../hooks";

export default function (props) {
  const [count, updateCount] = useState(5);
  const countRef = useRef(count);
  countRef.current = count;


  /*
  here setIntervals callback function has countRef object
  whose current value first has value from state
  then we refer to it and use it to update state
  this causes re-render and then we mutate ref to new value
  then in interval we are again referring to latest value
  should be noted that mutating ref does not cause re-render
   */

  useEffect(() => {
    const handler = setInterval(() => {
      console.log("in interval callaback")
      updateCount(countRef.current + 1);
    }, 1000);
    return () => clearInterval(handler);
  }, [])

  return (
    <>
      <Heading>I am counter {count}</Heading>
    </>
  );
}
