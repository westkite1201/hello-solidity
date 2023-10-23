// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";


contract MyNFT is ERC721, Ownable {
  using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private _tokenIdCounter;
    string internal baseTokenURI;
    

    // constructor() ERC721("MyNFT", "MYNFT") {}
    constructor(string memory name, string memory symbol, string memory baseURI) ERC721(name, symbol) {
        setBaseURI(baseURI);
    }

    struct NftData {
        string name;
        string description;
        string image;
        string message; // Add the 'message' variable to the NftData struct
    }

    mapping(uint256 => NftData) private _nftData;

    function safeMint(address to, string memory name, string memory description, string memory image, string memory message) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenData(tokenId, name, description, image, message);
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        baseTokenURI = baseURI;
    }
    
    function getTokenData(uint256 tokenId) public view returns (NftData memory) {
        return _nftData[tokenId];
    }

    // function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    //     _requireMinted(tokenId);
    //     string memory baseURI = getTokenData(tokenId).image;
    //     return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
    // }
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        NftData storage data = _nftData[tokenId];
        string memory json = string(
            abi.encodePacked(
                '{"name":"', data.name, '", ',
                '"description":"', data.description, '", ',
                '"image":"', data.image, '", ',
                '"attributes":[]}'
            )
        );
        
        return string(abi.encodePacked("data:application/json;base64,", Base64.encode(bytes(json))));
  

    
    }



    function _setTokenData(uint256 tokenId, string memory name, string memory description, string memory image, string memory message) internal {
        NftData storage data = _nftData[tokenId];
        data.name = name;
        data.description = description;
        data.image = image;
        data.message = message;
    }




}