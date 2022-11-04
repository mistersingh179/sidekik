import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useInterval } from "../../hooks";

export default function (props) {
  const [count, updateCount] = useState(5);

  useEffect(() => {

    /*
    Because of how closures work, when setInterval executed,
     its callback function took the value count at that time
     then it runs 1 second later,
     but the value of count is whatever its initial value was
     */

    const handler = setInterval(() => {
      console.log("here")
      updateCount(count + 1);
    }, 1000);
    return () => clearInterval(handler);
  }, [])

  return (
    <>
      <Heading>I am counter {count}</Heading>
    </>
  );
}
