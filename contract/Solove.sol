// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleNftLowerGas is ERC721, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private supply;

    // For WL
    bytes32 immutable public merkleRoot;
    mapping(address => bool) public whitelistClaimed;
    mapping(address => bool) public whitelisted;

    // For minting
    string public baseURI;
    string public baseExtension = ".json";
    string public notRevealedUri;

    uint256 public cost = 0.2 ether;
    uint256 public maxSupply = 10000;
    uint256 public maxMintAmount = 2;

    // For operation
    bool public paused = false;
    bool public revealed = false;
    bool public public_mint = false;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        string memory _initNotRevealedUri,
        bytes32 _merkleRoot
    ) ERC721(_name, _symbol) {
        setBaseURI(_initBaseURI);
        setNotRevealedURI(_initNotRevealedUri);
        merkleRoot = _merkleRoot;
    }

    // Mint Part
    modifier mintCompliance(uint256 _mintAmount) {
        require(_mintAmount > 0 && _mintAmount <= maxMintAmount, "Invalid mint amount!");
        require(supply.current() + _mintAmount <= maxSupply, "Max supply exceeded!");
        _;
    }

    function totalSupply() public view returns (uint256) {
        return supply.current();
    }

    function whitelistmint(uint256 _mintAmount, bytes32[] calldata _merkleProof) public payable mintCompliance(_mintAmount) {
        require(!paused, "The contract is paused!");
        require(msg.value >= cost * _mintAmount, "Insufficient funds!");

        // WL parts
        require(!whitelistClaimed[msg.sender], "Address already claimed");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid Merkle Proof."
        );
        whitelistClaimed[msg.sender] = true;
        //

        for (uint256 i = 0; i < _mintAmount; i++) {
            supply.increment();
            _mint(msg.sender, supply.current());
        }
    }

    function publicmint(uint256 _mintAmount) public payable mintCompliance(_mintAmount) {
        require(!paused, "The contract is paused!");
        require(public_mint, "Not Public Minting period");
        require(msg.value >= cost * _mintAmount, "Insufficient funds!");

        for (uint256 i = 0; i < _mintAmount; i++) {
            supply.increment();
            _mint(msg.sender, supply.current());
        }
    }

    function mintForAddress(uint256 _mintAmount, address _receiver) public mintCompliance(_mintAmount) onlyOwner {
        for (uint256 i = 0; i < _mintAmount; i++) {
            supply.increment();
            _mint(_receiver, supply.current());
        }
    }

    function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory ownedTokenIds = new uint256[](ownerTokenCount);
        uint256 currentTokenId = 1;
        uint256 ownedTokenIndex = 0;

        while (ownedTokenIndex < ownerTokenCount && currentTokenId <= maxSupply) {
            address currentTokenOwner = ownerOf(currentTokenId);

            if (currentTokenOwner == _owner) {
                ownedTokenIds[ownedTokenIndex] = currentTokenId;

                ownedTokenIndex++;
            }

            currentTokenId++;
        }

        return ownedTokenIds;
    }

    function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if(revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
    }


    function setRevealed(bool _state) public onlyOwner {
        revealed = _state;
    }

    function setCost(uint256 _cost) public onlyOwner {
        cost = _cost;
    }

    function setMaxMintAmount(uint256 _maxMintAmount) public onlyOwner {
        maxMintAmount = _maxMintAmount;
    }

    // ipfs
    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
        baseExtension = _newBaseExtension;
    }
    //

    function setPaused(bool _state) public onlyOwner {
        paused = _state;
    }

    function withdraw() public onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }


}