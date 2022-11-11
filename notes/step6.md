# Mission of Step6: Fix issues discovered while making demo video

## bugs
- be able to add address before ABI ✅
  - should be able to use address which came before ✅
  - should be able to tell that it was found ✅
- should say ABI missing when just address is there ✅
- be able to fix address and get ABI on contract page ✅
- adding another function at index0, moved old function down and new function took state of old function ✅
  - issue with key, now new function has key0. so it's using those input components ✅
  - lets make key based on something else. ✅
  - test case add function name, then age. ✅
  - adding a function with no input params now has input params of old guy. ✅
- higlights the wrong row when functions are added or removed ✅ 
- display usdc tooltip is no longer showing how calculation happened ✅
- tx methods cause the row to jump ✅
- rpc url box is not showing chaid id & name ✅
- for chain https://polygon-rpc.com it says 1337 & localhost ✅
- more than 32 bytes causes an error ✅
- flickers when raw input/output is open ✅

## features
- process hardhat-deploy files ✅
- group function with same suffix together like name & setName ✅

## ui improvements
- make it look decent at half screen width ✅
- setup files is overflowing on half screen width ✅
- add scroll space at  number input USDC should show calculation inputs ✅
- jerks when last input has address dropdown ✅
- extract error reason from ✅
  - `Error: VM Exception while processing transaction: reverted with panic code 0x11 (Arithmetic operation underflowed or overflowed outside of an unchecked block)`  ✅
  - `Error: VM Exception while processing transaction: reverted with panic code 0x32 (Array accessed at an out-of-bounds or negative index)` ✅
  - `Error: VM Exception while processing transaction: reverted with panic code 0x11 (Arithmetic operation underflowed or overflowed outside of an unchecked block)` ✅
- show name of contract in the dropdown ✅
- show wallet index in dropdown ✅
- make continue blue when ready ✅