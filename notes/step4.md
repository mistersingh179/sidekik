Mission of Step 4 is: Make it presentable & usable. Not trying to add features, but make what we have usable.

UI
- add Fixed Top Menu ✅
- Provider in Menu ✅
- ChainId in Menu ✅
- Wallet in menu ✅
- File Setup in Menu or Drawer or Model ✅
- show contracts with addresses first ✅
- allow removing files from sync ✅
- show contract found on chain check mark ✅
- re-read contracts when chain id has changed ✅
- remove old non-existent contracts when chain id changes ✅
- Welcome Screen Starts with File Setup ✅
- Menu Fixed ✅
- Contract Tabs Shown with their own Scroll ✅
- Don't show contracts without an address ✅
- smart loading of address for when address is nested by chain & name ✅
- smart loading of abi when nested ✅

Refactor
- use a custom hook to manage state of `chainRpcUrlSetup` better ✅

Issue
- clean up injectedState when disconnected ✅
- contract found icon should change as address is changed ✅

thinking on file uploads
- upload directory, upload file ✅
- both call `readFileContent` with file ✅
- read file json & extract abi. this gives us contract name ✅
- then search all files for addresses. this happens later. ✅
