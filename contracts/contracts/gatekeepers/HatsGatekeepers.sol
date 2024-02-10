// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { SignUpGatekeeper } from "./SignUpGatekeeper.sol";

interface IHats {
  function isWearerOfHat(address account, uint256 hat) external view returns (bool);
}

// custom errors
error OnlyMACI();
error NotWearingCriterionHat();
error NotOwner();
error NotCriterionHat();

contract HatsGatekeeperSimple is SignUpGatekeeper, Ownable {
  /// @notice The Hats Protocol contract address
  IHats public immutable hats;

  /// @notice The hat users must wear to be eligible to register
  // QUESTION we could also accept multiple hats with a mapping instead
  uint256 public immutable criterionHat;

  /// @notice the reference to the MACI contract
  address public maci;

  /// @notice Deploy an instance of HatsGatekeeper
  /// @param _hats The Hats Protocol contract
  /// @param _criterionHat The hat users must wear to register // could also accept multiple hats in an array
  constructor(address _hats, uint256 _criterionHat) payable Ownable() {
    hats = IHats(_hats);
    criterionHat = _criterionHat;
  }

  /// @notice Allows to set the MACI contract
  function setMaciInstance(address _maci) public override onlyOwner {
    maci = _maci;
  }

  /// @notice Registers the user
  /// @param _user The address of the user
  function register(address _user, bytes memory /*_data*/) public override {
    // ensure that the caller is the MACI contract
    if (maci != msg.sender) revert OnlyMACI();

    // _user must be wearing the criterion hat
    if (!hats.isWearerOfHat(_user, criterionHat)) revert NotWearingCriterionHat();
  }
}

contract HatsGatekeeperWithOwnerHat is SignUpGatekeeper {
  /// @notice The Hats Protocol contract address
  IHats public immutable hats;

  /// @notice The hat that users must wear to be eligible to register
  uint256 public immutable criterionHat;

  /// @notice The hat defining the owner of this contract
  uint256 public ownerHat;

  /// @notice the reference to the MACI contract
  address public maci;

  /// @notice Deploy an instance of HatsGatekeeper
  /// @param _hats The Hats Protocol contract
  /// @param _criterionHat The required hat // could also accept multiple hats in an array
  /// @param _ownerHat The hat defining the owner of this contract
  constructor(address _hats, uint256 _criterionHat, uint256 _ownerHat) payable {
    hats = IHats(_hats);
    criterionHat = _criterionHat;
    ownerHat = _ownerHat;
  }

  /*//////////////////////////////////////////////////////////////
                            OWNER FUNCTIONS
    //////////////////////////////////////////////////////////////*/

  /// @notice Allows to set the MACI contract
  function setMaciInstance(address _maci) public override {
    _checkOwner(msg.sender);
    maci = _maci;
  }

  function setOwnerHat(uint256 _newOwnerHat) public {
    _checkOwner(msg.sender);
    ownerHat = _newOwnerHat;
  }

  function _checkOwner(address _account) internal view {
    if (!hats.isWearerOfHat(_account, ownerHat)) revert NotOwner();
  }

  /*//////////////////////////////////////////////////////////////
                            GATEKEEPER FUNCTION
    //////////////////////////////////////////////////////////////*/

  /// @notice Registers the user
  /// @param _user The address of the user
  function register(address _user, bytes memory /*_data*/) public override {
    // ensure that the caller is the MACI contract
    if (maci != msg.sender) revert OnlyMACI();

    // _user must be wearing the criterion hat
    if (!hats.isWearerOfHat(_user, criterionHat)) revert NotWearingCriterionHat();
  }
}

contract HatsGatekeeperMultiple is SignUpGatekeeper {
  /// @notice The Hats Protocol contract address
  IHats public immutable hats;

  /// @notice Tracks hats that users must wear to be eligible to register
  mapping(uint256 => bool) public criterionHat;

  /// @notice The hat defining the owner of this contract
  uint256 public ownerHat;

  /// @notice the reference to the MACI contract
  address public maci;

  /// @notice Deploy an instance of HatsGatekeeper
  /// @param _hats The Hats Protocol contract
  /// @param _criterionHats Array of accepted criterion hats
  /// @param _ownerHat The hat defining the owner of this contract
  constructor(address _hats, uint256[] memory _criterionHats, uint256 _ownerHat) payable {
    hats = IHats(_hats);
    ownerHat = _ownerHat;
    _addCriterionHats(_criterionHats);
  }

  /*//////////////////////////////////////////////////////////////
                            OWNER FUNCTIONS
    //////////////////////////////////////////////////////////////*/

  /// @notice Allows to set the MACI contract
  function setMaciInstance(address _maci) public override {
    _checkOwner(msg.sender);
    maci = _maci;
  }

  function setOwnerHat(uint256 _newOwnerHat) public {
    _checkOwner(msg.sender);
    ownerHat = _newOwnerHat;
  }

  function addCriterionHats(uint256[] memory _criterionHats) public {
    _checkOwner(msg.sender);
    _addCriterionHats(_criterionHats);
  }

  function _addCriterionHats(uint256[] memory _criterionHats) internal {
    for (uint256 i; i < _criterionHats.length; ++i) {
      criterionHat[_criterionHats[i]] = true;
    }
  }

  function _checkOwner(address _account) internal view {
    if (!hats.isWearerOfHat(_account, ownerHat)) revert NotOwner();
  }

  /*//////////////////////////////////////////////////////////////
                            GATEKEEPER FUNCTION
    //////////////////////////////////////////////////////////////*/

  /// @notice Registers the user
  /// @param _user The address of the user
  /// @param _data additional data
  function register(address _user, bytes memory _data) public override {
    // ensure that the caller is the MACI contract
    if (maci != msg.sender) revert OnlyMACI();

    // decode the _data as a hat
    uint256 hat = abi.decode(_data, (uint256));

    // the hat must be set as a criterion hat
    if (!criterionHat[hat]) revert NotCriterionHat();

    // _user must be wearing the criterion hat
    if (!hats.isWearerOfHat(_user, hat)) revert NotWearingCriterionHat();
  }
}
