## Cypress test ##

### Tests executed ###
- Sign up flow
- Login flow
- Search flow

### Prerequisites ###
Install [npm](https://www.npmjs.com/)

Validate the installation :
```shell
npm --version
```
or

Install [yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)

Validate the installation :
```shell
yarn --version
```

### Installing Cypress ###
Install Cypress via npm:
```shell
npm install cypress --save-dev
```
or 

Install Cypress via yarn:
```shell
yarn add cypress --dev
```

### Installing project dependencies ###
Install the npm packages:
```shell
npm install
```
or

### Installing project dependencies ###
Install the yarn packages:
```shell
yarn install
```

### Running project tests ###
In the project root folder run the command:
```shell
npm run cypress:run
```

### Running tests using dev dashboard ###
In the project root folder run the command:
```shell
npm run cypress:open
```

### Running project tests and generate report ###
In the project root folder run the command:
```shell
npm run test
```

### See report generated ###
cd cypress/reports/mochareports

### See report screenshots ###
cypress/screenshots

### See report video record ###
cypress/videos