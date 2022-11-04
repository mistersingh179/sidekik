const readJsonObjFromFileHandle = async (fileHandle) => {
  try {
    const file = await fileHandle.getFile();
    if (file.type === "application/json") {
      try {
        return JSON.parse(await file.text());
      } catch (e) {
        console.debug("skipping file as fails to json parse ", file.name);
      }
    } else {
      console.debug("skipping file as type not json", file.name);
    }
  } catch {
    console.log("unable to get file: ", fileHandle);
  }

  return {};
};

export default readJsonObjFromFileHandle;