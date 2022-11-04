import { Heading, Input } from "@chakra-ui/react";
import { useState } from "react";

const GetInfo1 = ({ value, handler }) => {
  return (
    <>
      <Input value={value} onChange={(evt) => handler(evt.target.value)} />
    </>
  );
};

export default function InputCursorGone(props) {
  const [state, setState] = useState("");

  // looses cursor every time as it is redefined on a rerender which happens when we update state

  const GetInfo2 = ({ value, handler }) => {
    return (
      <>
        <Input value={value} onChange={(evt) => handler(evt.target.value)} />
      </>
    );
  };

  return (
    <>
      <Heading>Input Cursor Gone</Heading>
      <GetInfo1 value={state} handler={setState} />
      <GetInfo2 value={state} handler={setState} />
    </>
  );
}
