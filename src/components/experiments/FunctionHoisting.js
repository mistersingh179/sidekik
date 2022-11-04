import { useEffect, useReducer } from "react";

const FunctionHoisting = (props) => {
  a();

  // const a = (state, action) => {
  //   console.log("i am a");
  // };

  function a() {console.log("I am a")}
};

export default FunctionHoisting;
