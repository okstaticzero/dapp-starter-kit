import { web3 } from "../util/Uport";
import contract from 'truffle-contract';
import MyDetails from '../ethereum/build/contracts/MyDetails.json';

const DetailsContract = contract(MyDetails);
DetailsContract.setProvider(web3.currentProvider);

const getInstance = async () => {
  const instance = await DetailsContract.deployed();
  return instance;
}

export const setContractHash = async (account, hash) => {
  const instance = await getInstance();
  const items = await instance.setHash(hash, { from: account });
  return items;
}

export const getContractHash = async (account) => {
  const instance = await getInstance();
  console.log('11111: ', account);

  const items = await instance.getHash(account);
  console.log('222222: ', items);

  return items;
}


