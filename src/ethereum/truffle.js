var HDWalletProvider = require('truffle-hdwallet-provider');
var mnemonic =
  'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    development: {
      host: 'localhost',
      port: 9545,
      network_id: '*', // match any network
    },
    ropsten: {
      provider: new HDWalletProvider(
        mnemonic,
        'https://ropsten.infura.io/XAmfM8SVSh5OkuiYMIBx',
        2
      ),
      network_id: 3,
      gas: 4600000,
    },
    rinkeby: {
      provider: new HDWalletProvider(
        mnemonic,
        'https://rinkeby.infura.io/XAmfM8SVSh5OkuiYMIBx',
        1
      ),
      network_id: 5,
      gas: 6712388,
      gasPrice: 10000000
    },
  },
};