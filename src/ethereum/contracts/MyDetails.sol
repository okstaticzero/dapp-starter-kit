pragma solidity ^0.4.17;

contract MyDetails {
   
    mapping (address => string) ipfsHashes;
    
    function setHash(string ipfsHash) public {
       ipfsHashes[msg.sender] = ipfsHash;
    }

    function getHash(address) public view returns(string) {
      return ipfsHashes[msg.sender];
    }

}