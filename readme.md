# `node-fetch@3.2.0` and `jest`

This repository is a test case for [issue 1479](https://github.com/node-fetch/node-fetch/issues/1479)

## Steps to reproduce

1. Use node@16 and npm@8.1.0
2. Install project dependencies with: `npm install`
3. Run the test with `npm test`

The test runs fine but before closing the proccess, it output two warnings:
    - `MESSAGEPORT`
    - `TLSWRAP`

The console output should look similar to:

```sh
l.alvarez-fantone in ~/Workspace/node-fetch-test λ npm test                                                                  

> node-starter@0.0.0 test
> NODE_OPTIONS='--experimental-vm-modules --no-warnings' jest --env=node --colors --bail --detectOpenHandles --setupFilesAfterEnv=jest-extended/all --errorOnDeprecated --noStackTrace --forceExit --logHeapUsage src/

 PASS  src/retrieve-something.test.js (57 MB heap size)
  the retrieve-something function
    ✓ should return something (606 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.165 s
Ran all test suites matching /src\//i.

Jest has detected the following 2 open handles potentially keeping Jest from exiting:

  ●  MESSAGEPORT

      at Object.<anonymous> (node_modules/node-domexception/index.js:6:12)
          at async Promise.all (index 16)
          at async Promise.all (index 0)
          at async Promise.all (index 0)
      at TestScheduler.scheduleTests (node_modules/@jest/core/build/TestScheduler.js:333:13)
      at runJest (node_modules/@jest/core/build/runJest.js:404:19)
      at _run10000 (node_modules/@jest/core/build/cli/index.js:320:7)
      at runCLI (node_modules/@jest/core/build/cli/index.js:173:3)


  ●  TLSWRAP

      2 |
      3 | export default async function retrieveSomething(url = 'https://httpbin.org/get', options) {
    > 4 |   const response = await fetch(url, options)
        |                          ^
      5 |
      6 |   if (!response.ok) {
      7 |     const message = await response.text()

      at node_modules/node-fetch/src/index.js:94:20
      at fetch (node_modules/node-fetch/src/index.js:49:9)
      at retrieveSomething (src/retrieve-something.js:4:26)
      at Object.<anonymous> (src/retrieve-something.test.js:5:28)
      at TestScheduler.scheduleTests (node_modules/@jest/core/build/TestScheduler.js:333:13)
      at runJest (node_modules/@jest/core/build/runJest.js:404:19)
      at _run10000 (node_modules/@jest/core/build/cli/index.js:320:7)
      at runCLI (node_modules/@jest/core/build/cli/index.js:173:3)
```

Finally, those warnings messages are not there if the `node-fetch` module is rollback to 3.1.1.
