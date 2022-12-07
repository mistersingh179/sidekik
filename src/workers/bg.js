import md5 from "md5";
import readJsonObjFromFileHandle from "../helpers/readJsonObjFromFileHandle";

export async function getFileMd5(fileHandle) {
  const fileJsonObj = await readJsonObjFromFileHandle(fileHandle);
  const fileStringObj = JSON.stringify(fileJsonObj);
  const fileMd5 = md5(fileStringObj);
  return fileMd5;
}

export async function fetchChainId(rpcUrl) {
  try {
    const response = await fetch(rpcUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "eth_chainId",
        params: [],
        id: new Date().getTime(),
        jsonrpc: "2.0",
      }),
    });
    const body = await response.json();
    const { result, error } = body;
    if(result){
      return result;
    }else{
      return null;
    }
  } catch (e) {
    return null;
  }
}