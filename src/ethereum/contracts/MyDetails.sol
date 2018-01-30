pragma solidity ^0.4.17;

contract MyDetails {
   
    mapping (address => string) ipfsHashes;
    
    function setHash(string ipfsHash) public {
       ipfsHashes[msg.sender] = ipfsHash;
    }

    function getHash(address account) public view returns(string, uint) {
      return (ipfsHashes[account], block.timestamp);
    }

}