pragma solidity ^0.4.10;

contract MyDetails {
   
    mapping (address => string) ipfsHashes;
    mapping (address => uint) timestamp;
    
    function setHash(string ipfsHash) public {
       ipfsHashes[msg.sender] = ipfsHash;
       timestamp[msg.sender] = now;
    }

    function getHash(address account) public view returns(string, uint) {
      return (ipfsHashes[account], timestamp[account]);
    }

}