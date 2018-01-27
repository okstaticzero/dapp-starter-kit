var HDWalletProvider = require('truffle-hdwallet-provider');
var mnemonic =
  'candy maple cake sugar pudding cream honey rich smooth crumble sweet treat';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: 'localhost',
      port: 9545,
      network_id: '*', // match any network
    },
    rinkeby: {
      provider: new HDWalletProvider(
        mnemonic,
        'https://rinkeby.infura.io/XAmfM8SVSh5OkuiYMIBx',
        2
      ),
      network_id: 4,
      gas: 4712388,
      gasPrice: 1000000000
    },
  },
};