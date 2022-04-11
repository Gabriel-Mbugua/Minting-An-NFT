// SPDX-License-Identifier: MIT
pragma solidity >=0.6.6;

// contains the implementation of the ERC721 standard, which our NFT smart contract will inherit.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// provides counters that can only be incremented or decremented by one
import "@openzeppelin/contracts/utils/Counters.sol";
// sets up access control on our smart contract, so only the owner of the smart contract (you) can mint NFTs
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("MyNFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
