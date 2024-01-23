// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

import { SignUpGatekeeper } from "./SignUpGatekeeper.sol";
import { SignUpToken } from "../SignUpToken.sol";

import { MACI } from "../MACI.sol";

/// @title SignUpTokenGatekeeper
/// @notice This contract allows to gatekeep MACI signups
/// by requiring new voters to own a certain ERC721 token
contract SignUpTokenGatekeeper is SignUpGatekeeper, Ownable(msg.sender) {
  /// @notice the reference to the SignUpToken contract
  SignUpToken public token;
  /// @notice the reference to the MACI contract
  MACI public maci;

  /// @notice a mapping of tokenIds to whether they have been used to sign up
  mapping(uint256 => bool) public registeredTokenIds;

  /// @notice custom errors
  error AlreadyRegistered();
  error NotTokenOwner();
  error OnlyMACI();

  /// @notice creates a new SignUpTokenGatekeeper
  /// @param _token the address of the SignUpToken contract
  constructor(SignUpToken _token) payable {
    token = _token;
  }

  /// @notice Adds an uninitialised MACI instance to allow for token signups
  /// @param _maci The MACI contract interface to be stored
  function setMaciInstance(MACI _maci) public override onlyOwner {
    maci = _maci;
  }

  /// @notice Registers the user if they own the token with the token ID encoded in
  /// _data. Throws if the user does not own the token or if the token has
  /// already been used to sign up.
  /// @param _user The user's Ethereum address.
  /// @param _data The ABI-encoded tokenId as a uint256.
  function register(address _user, bytes memory _data) public override {
    if (address(maci) != msg.sender) revert OnlyMACI();
    // Decode the given _data bytes into a uint256 which is the token ID
    uint256 tokenId = abi.decode(_data, (uint256));

    // Check if the user owns the token
    bool ownsToken = token.ownerOf(tokenId) == _user;
    if (!ownsToken) revert NotTokenOwner();

    // Check if the token has already been used
    bool alreadyRegistered = registeredTokenIds[tokenId];
    if (alreadyRegistered) revert AlreadyRegistered();

    // Mark the token as already used
    registeredTokenIds[tokenId] = true;
  }
}
