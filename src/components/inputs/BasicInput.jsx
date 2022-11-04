import { Input } from "@chakra-ui/react";

export default function ({ value, setInput, placeholder }) {
  return (
    <Input
      placeholder={placeholder}
      onChange={(evt) => setInput(evt.target.value)}
    ></Input>
  );
}
