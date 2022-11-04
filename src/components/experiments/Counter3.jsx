import { Button, Heading, Switch } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useInterval } from "../../hooks";

export default function (props) {
  const [count, updateCount] = useState(5);
  const callbackRef = useRef();

  const callbackFunc = () => {
    console.log("in interval callaback");
    updateCount(count + 1);
  };

  /*
  this time we are mutating and resetting up a reference to the callback function
  and everytime we do that it pickups the latest count value
   */

  useEffect(() => {
    console.log("*** setting up callback reference");
    callbackRef.current = callbackFunc;
  }, [callbackFunc]);

  const [shouldPoll, updateShouldPoll] = useState(false);

  useEffect(() => {
    // const handler = setInterval(() => callbackFunc(), 1000);
    let handler;
    if(shouldPoll){
      handler = setInterval(() => callbackRef.current(), 1000);
    }
    return () => clearInterval(handler);
  }, [shouldPoll]);


  return (
    <>
      <Heading>I am counter {count}</Heading>
      Should Poll:{" "}
      <Switch
        isChecked={shouldPoll}
        onChange={(evt) => updateShouldPoll(evt.target.checked)}
      />
    </>
  );
}
