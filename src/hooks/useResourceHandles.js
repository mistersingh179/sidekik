import { useReducer, useState } from "react";



export default function useResourceHandles() {
  const [handles, updateHandles] = useState([]);
  window.handles = handles;
  const addHandle = (handle) => {
    updateHandles((prevState) => [...prevState, handle]);
  };
  const removeHandle = (handleToRemove) => {
    updateHandles((prevState) => {
      return [
        ...prevState.filter(
          (handle) =>
            !(
              handle.name === handleToRemove.name &&
              handle.kind === handleToRemove.kind
            )
        ),
      ];
    });
  };

  return { handles, addHandle, removeHandle };
}
