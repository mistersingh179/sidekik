import { Input } from "@chakra-ui/react";
import { useEffect } from "react";

export default function ({ value, setInput, placeholder }) {
  useEffect(() => {
    if (value === undefined) {
      setInput("");
    }
  }, []);
  return (
    <Input
      placeholder={placeholder}
      onChange={(evt) => setInput(evt.target.value)}
    ></Input>
  );
}
