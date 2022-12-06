import md5 from "md5";
import readJsonObjFromFileHandle from "../helpers/readJsonObjFromFileHandle";

export async function getFileMd5(fileHandle){
  const fileJsonObj = await readJsonObjFromFileHandle(fileHandle);
  const fileStringObj = JSON.stringify(fileJsonObj);
  const fileMd5 = md5(fileStringObj);
  return fileMd5;
}