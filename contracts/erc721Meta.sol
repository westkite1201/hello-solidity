// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Erc721Meta is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    string internal baseTokenURI;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    struct Metadata {
        string name;
        string description;
        string image;
        string externalUrl;
    }

    mapping(uint256 => Metadata) metadata;

    function setBaseTokenURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function mintNFT(
        address to,
        string memory name,
        string memory description,
        string memory image,
        string memory externalUrl
    ) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        metadata[tokenId] = Metadata(name, description, image, externalUrl);
        _safeMint(to, tokenId);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        Metadata memory meta = metadata[tokenId];

        string memory json = string(
            abi.encodePacked(
                '{',
                '"name":"', meta.name, '",',
                '"description":"', meta.description, '",',
                '"image":"', meta.image, '",',
                '"external_url":"', meta.externalUrl, '"'
                '}'
            )
        );

        string memory baseURI = baseTokenURI;
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId, "/", json)) : json;
    }

    function getAllTokenIds() public view returns (uint256[] memory) {
        uint256[] memory tokenIds = new uint256[](_tokenIdCounter.current());
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            tokenIds[i] = i;
        }
        return tokenIds;
    }


}
