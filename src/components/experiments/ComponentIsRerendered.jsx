import { Heading, Input } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";

// this is being re-rendered
const CaptureInfo1 = ({handler}) => {
  return (
    <Input onChange={(evt) => handler(evt.target.value)} />
  )
}

// will return same element for same props
// so will not be re-rendered as long as it gets same handler
const CaptureInfo2 = React.memo(({handler}) => {
  return (
    <Input onChange={(evt) => handler(evt.target.value)} />
  )
})

// this should always be rendered because it has to show new value
const DisplayInfo = ({value}) => {
  return (
    <Heading>{value}</Heading>
  )
}

export default function ComponentIsReRendered(props){
  const [state, setState] = useState("");

  // this function is new everytime
  // so React.memo is breaking
  // either pass setState or dispatch directly as they are a reference and always same between renders
  // or we need to make this function to be the same

  const updateState = useCallback((val) => {
    setState(val)
  }, [])

  return (
    <>
      <Heading>Component is Re Rendered</Heading>
      <DisplayInfo value={state} />
      <CaptureInfo1 handler={updateState} />
      <CaptureInfo2 handler={updateState} />
    </>
  )
}