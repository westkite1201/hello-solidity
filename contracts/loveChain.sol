// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Chain is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Memory Lock Chain", "MEMLCKCHIN") {}

    struct Metadata {
        string name;
    }

    mapping(uint256 => Metadata) metadata;

    function mintNFT(address to, string memory name) public onlyOwner {
        // TokenId Generate
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        // User Customdata store
        metadata[tokenId] = Metadata(name);
        // Mint Excute
        _safeMint(to, tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        string memory description = "User Custom Chain.";
        Metadata memory meta = metadata[tokenId];
        string memory imageUrl = string(abi.encodePacked('data:image/svg+xml;base64,', Base64.encode(gernateSvg(meta))));

        bytes memory metaData = abi.encodePacked(
                        '{"name":"',
                         meta.name,
                        '",',
                        '"description":"',
                        description,
                        '",',
                        '"image":"',
                        imageUrl,
                        '"'
                        "}"
                    );

        return string(abi.encodePacked("data:application/json;base64,", Base64.encode(metaData)));

    
    }
    function gernateSvg(Metadata memory meta) internal pure returns (bytes memory) {
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="130" height="185" version="1.0">',
            "<defs>",
            '<linearGradient xlink:href="#linearGradient12103" id="c" x1="19" x2="125" y1="149.5" y2="149.5" gradientUnits="userSpaceOnUse">',
            '<stop offset="0" stop-color="#fae693"/>',
            '<stop offset=".5" stop-color="#fffdf3"/>',
            '<stop offset="1" stop-color="#fef2c5"/>',
            "</linearGradient>",
            '<linearGradient id="a">',
            '<stop offset="0" stop-color="#f5da73"/>',
            '<stop offset="1" stop-color="#5f5739"/>',
            "</linearGradient>",
            '<linearGradient xlink:href="#a" id="e" x1="92.790001" x2="93" y1="97.160004" y2="96.400002" gradientUnits="userSpaceOnUse"/>',
            '<linearGradient xlink:href="#a" id="d" x1="16.73" x2="17" y1="101.6" y2="100.7" gradientUnits="userSpaceOnUse"/>',
            '<linearGradient id="b">',
            '<stop offset="0" stop-color="#4c4c4c"/>',
            '<stop offset=".5" stop-color="#ccc"/>',
            '<stop offset="1" stop-color="#fff"/>',
            "</linearGradient>",
            '<linearGradient xlink:href="#b" id="g" x1="123" x2="143" y1="80.791756" y2="80.791756" gradientTransform="matrix(1 0 0 1.00807 -30.200001 -8.6605754)" gradientUnits="userSpaceOnUse"/>',
            '<linearGradient xlink:href="#b" id="f" x1="46.5" x2="67.5" y1="82.956146" y2="82.956146" gradientTransform="matrix(1 0 0 1.00157 -30.200001 -7.9739891)" gradientUnits="userSpaceOnUse"/>',
            '<radialGradient id="h" cx="75" cy="47" r="58" fx="75" fy="47" gradientUnits="userSpaceOnUse">',
            '<stop offset="0" stop-color="#4c4c4c"/>',
            '<stop offset=".31034482" stop-color="#4c4c4c"/>',
            '<stop offset=".48275861" stop-color="#ccc"/>',
            '<stop offset=".65517241" stop-color="#fff"/>',
            '<stop offset=".82758623" stop-color="#ccc"/>',
            '<stop offset="1" stop-color="#4c4c4c"/>',
            "</radialGradient>",
            "</defs>",
            '<path fill="#f5db72" d="m110.94 90.19 13.53 9.69c-34.8 3.96-69.59 6.93-105.38 6.93L5.5 95.16c34.81-1.99 69.63-3.98 105.44-4.97z"/>',
            '<path fill="url(#c)" d="M124.81 100.22v68.62c-34.88 7.97-69.76 13.46-105.62 13.97v-75.62c35.87-.01 70.75-2.99 105.62-6.97z"/>',
            '<path fill="#ac8e14" d="m5.19 95.44 13.62 11.65v75.41L5.19 167.91V95.44z"/>',
            '<path fill="url(#d)" d="M23 94.1875c-5.834307.328542-11.670856.635512-17.5.96875l5.8125 4.96875L23 103.3125v-9.125z"/>',
            '<path fill="url(#e)" d="M97 90.625c-8.189242.28402-16.32772.635979-24.4375 1L97 98.3125V90.625z"/>',
            '<path fill="url(#f)" d="M17 48.9h20v50.7c0 5.4-13 5.4-20 1.1V48.9z"/>',
            '<path fill="url(#g)" d="M93 48.9h20v46.4c0 4.9-14.3 4.9-20 1.1V48.9z"/>',
            '<path fill="url(#h)" d="M113 49H93c0-15.456-12.544-28-28-28S37 33.544 37 49H17C17 22.504 38.504 1 65 1s48 21.504 48 48z"/>',
            '<path fill="none" stroke="#000" stroke-width=".40000001" d="M37 99.6c0 5.4-13 5.4-20 1.1m96-5.4c0 4.9-14.3 4.9-20 1.1"/>',
            '<text x="50%" y="75%" width="50%" dominant-baseline="middle" text-anchor="middle" font-family="Impact, Charcoal, sens-serif" font-size="14" fill="black">', meta.name, '</text>',
            "</svg>"
        );
        return svg;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override returns (bool) {
        return super.supportsInterface(interfaceId);
    }

}