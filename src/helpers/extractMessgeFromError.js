export default function extractMessageFromError(error) {
  const output = {
    method: error?.method || "",
    reason: error?.reason || "",
    message: error.message || "",
    code: error.code || "",
    argument: error.argument || "",
  };

  const USELESS_REASON =
    "missing revert data in call exception; Transaction reverted without a reason string";

  if (
    output.reason === USELESS_REASON &&
    output.message &&
    output.message !== output.reason
  ) {
    output.reason = "";
  }

  const regexArr = [
    /":"(Nonce too high.*)"}}}'/,
    /:\sreverted\swith\sreason\sstring\s'(.*?)'/,
    /Error: VM Exception while processing transaction: reverted with panic code.* \((.*)\)/,
    /Error: VM Exception while processing transaction:(.*)"},"/,
    /(sender doesn't have enough funds to send tx. The max upfront cost is: \d* and the sender's account only has: \d*)/,
    /\\\\"(Error: Transaction reverted without a reason string)\\\\"/
  ];

  let regexResult;
  for (let regex of regexArr) {
    if ((regexResult = regex.exec(output.reason)?.[1])) {
      output.reason = regexResult;
    }
    if ((regexResult = regex.exec(output.message)?.[1])) {
      output.message = regexResult;
    }
  }

  console.log("output: ", output);

  if (output.message === output.reason) {
    output.message = "";
  }

  if (output?.reason?.length > 0 && output?.message?.length > 0) {
    if (output.message.indexOf(output.reason) == 0) {
      output.message = "";
    }
  }

  if (output?.reason?.length > 0) {
    if (
      output.method === "estimateGas" &&
      output.code === "UNPREDICTABLE_GAS_LIMIT"
    ) {
      output.method = "";
      output.code = "";
    }
  }

  if (output?.message?.length > 0) {
    if (
      output.reason === "processing response error" &&
      output.code === "SERVER_ERROR"
    ) {
      output.reason = "";
      output.code = "";
    }
  }

  return output;
}

export const getErrorString = (error) => {
  const errorObj = extractMessageFromError(error);
  return Object.values(errorObj).find((value) => !!value);
};

