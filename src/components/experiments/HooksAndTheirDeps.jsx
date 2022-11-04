import { Heading } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

export default function HooksAndTheirDeps(props) {
  const [ts, updateTs] = useState();
  useEffect(() => {
    const handler = setInterval(() => {
      updateTs(new Date().getTime());
    }, 1000);
    return () => clearInterval(handler);
  }, []);
  return <Inner ts={ts} />;
}

const Inner = (props) => {
  // const foo = useCallback(() => {
  //   console.log("in foo");
  // }, []);

  const foo = () => {
    console.log("in foo");
  };

  useEffect(() => {
    console.log("in useEffect and props.ts is: ", props.ts);
  }, [props.ts]);
  // if we don't specify props.ts as a dependency then eslint complains
  // we must specify it, otherwise it wont run even though the prop has changed.

  useEffect(() => {
    console.log("in useEffect");
  }, [foo]);
  // this effect keeps running as new prop.ts comes in
  // this causes foo to be redefined
  // and that is a dependency

  return (
    <>
      <Heading>Hooks</Heading>
      foo: {props.ts}
    </>
  );
};
