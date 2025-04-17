# realestate-investment-dapp
Decentralized Application for Real Estate Investment

## Setup for `Development`
### Prerequisites
- Node.js
- npm
- MetaMask (On the browser)
- Ganache
- Truffle
- VSCode

### 1. Clone the repository
```bash
git clone https://github.com/Rqkko/realestate-investment-dapp.git
cd realestate-investment-dapp
```

### 2. Setup Ganache
Open Ganache and create a new workspace
- Name the workspace
- For `truffle projects`, select the `truffle-config.js` file in the `blockchain` folder
- Go to `Server` tab and set `Network ID` to `1337`
- Click `Add Project`

If done correctly, you should see:
- A new workspace with 10 accounts and 100 ETH each
- Network ID is `1337`
- RPC server is `HTTP://127.0.0.1:7545`

### 3. Setup MetaMask
Install the MetaMask extension on your browser and create a new wallet

Click on `Add a Custom Network` and enter the following details:
- Network Name: Ganache (or any name you prefer)
- Default RPC URL: HTTP://127.0.0.1:7545
- Chain ID: 1337

Click `Save`

Select the Ganache network that you just created

`Add Account` and import the first account from Ganache
- Import using `Private Key`
- To obtain the private key, click the key icon next to the first account, reveal the keys, and copy the private key.

Make sure to select the account after import

### 4. Continue setup on [Backend Development](#setup-for-backend-development) or [Frontend Development](#setup-for-frontend-development) section

## Setup for `Backend Development`
### 1. Complete [Setup for Development](#setup-for-development) section
### 2. Setup Truffle
Compile & Deploy Smart Contracts
```bash
cd blockchain
truffle migrate
```
### 3. Interact with the contracts
Open the truffle console
```bash
truffle console
```

## Setup for `Frontend Development`
### 1. Complete [Setup for Development](#setup-for-development) section
### 2. Install dependencies
```bash
cd client
npm install
```
### 3. Setup contracts
```bash
npm run setup-contracts
```
### 4. Run the frontend
```bash
npm run dev
```