import _ from "lodash";
import { useContext, useReducer } from "react";
import { ethers } from "ethers";
import { GlobalContext } from "../contexts";
const {
  utils: { isAddress },
  constants: { AddressZero },
} = ethers;

const TYPES = {
  ADD_CONTRACT_ABI: "ADD_CONTRACT_ABI",
  ADD_CONTRACT_ADDRESS: "ADD_CONTRACT_ADDRESS",
  ADD_CONTRACT_ADDRESS_AND_ABI: "ADD_CONTRACT_ADDRESS_AND_ABI",
  MARK_CONTRACT_FOUND: "MARK_CONTRACT_FOUND",
  REMOVE_CONTRACT: "REMOVE_CONTRACT",
  ADD_CONTRACT: "ADD_CONTRACT",
};

/*
  {
    Foo: {
      abi: [],
      address: '',
      found: false
    }
  }
 */

export default function useContractFileData() {
  const reducer = (state, action) => {
    console.debug("in reducer with: ", action);

    switch (action.type) {
      case TYPES.ADD_CONTRACT: {
        const newState = { ...state };
        newState[action.name] = { abi: [], address: "", found: false };
        return newState;
      }
      case TYPES.ADD_CONTRACT_ABI: {
        const newState = { ...state };
        if (!newState[action.name]) {
          newState[action.name] = { abi: [], address: "", found: false };
        }
        newState[action.name].abi = action.abi;
        return newState;
      }
      case TYPES.ADD_CONTRACT_ADDRESS: {
        const newState = { ...state };
        if (!newState[action.name]) {
          newState[action.name] = { abi: [], address: "", found: false };
        }
        newState[action.name].address = action.address;
        return newState;
      }
      case TYPES.ADD_CONTRACT_ADDRESS_AND_ABI: {
        const newState = { ...state };
        if (!newState[action.name]) {
          newState[action.name] = { abi: [], address: "", found: false };
        }
        newState[action.name].abi = action.abi;
        newState[action.name].address = action.address;
        return newState;
      }
      case TYPES.MARK_CONTRACT_FOUND: {
        const newState = { ...state };
        if (!newState[action.name]) {
          newState[action.name] = { abi: [], address: "", found: false };
        }
        newState[action.name].found = action.found;
        return newState;
      }
      case TYPES.REMOVE_CONTRACT: {
        const newState = { ...state };
        delete newState[action.name];
        return newState;
      }
      default:
        return state;
    }
  };

  const initialState = {};

  const [contracts, dispatch] = useReducer(reducer, initialState);
  window.c = contracts;

  const addContractAddress = async (name, address) => {
    console.debug("in addContract Address");
    dispatch({
      type: TYPES.ADD_CONTRACT_ADDRESS,
      address: address,
      name: name,
    });
  };

  const addContractAbi = (name, abi) => {
    dispatch({
      type: TYPES.ADD_CONTRACT_ABI,
      abi: abi,
      name: name,
    });
  };
  const removeContract = (name) => {
    dispatch({
      type: TYPES.REMOVE_CONTRACT,
      name: name,
    });
  };
  const markContractFound = (name, found) => {
    dispatch({
      type: TYPES.MARK_CONTRACT_FOUND,
      name: name,
      found: found,
    });
  };

  return {
    contracts,
    addContractAddress,
    addContractAbi,
    removeContract,
    markContractFound,
  };
}
