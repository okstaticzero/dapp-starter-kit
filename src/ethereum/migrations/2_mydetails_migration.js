var MyDetails = artifacts.require("./MyDetails.sol");

module.exports = function (deployer) {
  deployer.deploy(MyDetails);
};
