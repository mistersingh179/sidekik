import { color, Heading, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function PropsInState(props) {
  const [ans, setAns] = useState("green.50")
  return (
    <>
      {ans}
      <Select value={ans} onChange={(evt) => setAns(evt.target.value)}>
        <option value={"green.50"}>green.50</option>
        <option value={"yellow.50"}>yellow.50</option>
        <option value={"orange.50"}>orange.50</option>
        <option value={"purple.50"}>purple.50</option>
      </Select>
      <MyHeading color={ans}/>
    </>
  )
}

const MyHeading = (props) => {
  const { color } = props; // here color is more like initialColor
  const [myColor, setMyColor] = useState(color); // useState takes initial value only 1st time.

  // this makes sure that if prop is changed, then we reprocess it
  useEffect(() => {
    setMyColor(color);
  }, [color])

  return (
    <>
      <Heading bg={myColor}>MyHeading</Heading>
      <Text>{myColor}</Text>
      <Select value={myColor} onChange={(evt) => setMyColor(evt.target.value)}>
        <option value={"green.50"}>green.50</option>
        <option value={"yellow.50"}>yellow.50</option>
        <option value={"orange.50"}>orange.50</option>
        <option value={"purple.50"}>purple.50</option>
      </Select>
    </>
  );
};
