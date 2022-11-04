import { isAddress } from "ethers/lib/utils";

export function buildDisplayAddress(address, count) {
  if (count === undefined) {
    count = 4;
  }
  let displayAddress;
  if (address && address.length >= 10) {
    displayAddress =
      address.slice(0, count + 2) + "..." + address.slice(-1 * count);
  } else {
    displayAddress = address;
  }
  return displayAddress;
}
