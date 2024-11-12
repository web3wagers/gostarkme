// *************************************************************************
//                              DONATOR TEST
// *************************************************************************
use starknet::{ContractAddress, contract_address_const};

use snforge_std::{declare, ContractClassTrait};
use openzeppelin::utils::serde::SerializedAppend;

use gostarkme::donator::IDonatorDispatcher;
use gostarkme::donator::IDonatorDispatcherTrait;

fn OWNER() -> ContractAddress {
    contract_address_const::<'OWNER'>()
}

fn __setUp__() -> ContractAddress {
    let contract = declare("Donator").unwrap();
    let mut callData: Array<felt252> = array![];
    callData.append_serde(OWNER());
    let (address, _) = contract.deploy(@callData).unwrap();
    address
}

// *************************************************************************
//                              TEST
// *************************************************************************
#[test]
fn testGetOwner() {
    let contractAddress = __setUp__();
    let dispatcher = IDonatorDispatcher { contractAddress };
    let owner = dispatcher.getOwner();
    assert(owner == OWNER(), 'Invalid owner');
}

#[test]
fn testGetLevel() {
    let contractAddress = __setUp__();
    let dispatcher = IDonatorDispatcher { contractAddress };
    let level = dispatcher.getLevel();
    assert(level == 1, 'Invalid level');
}

#[test]
fn testGetTotalStarkDonations() {
    let contractAddress = __setUp__();
    let dispatcher = IDonatorDispatcher { contractAddress };
    let totalStarkDonations = dispatcher.getTotalStarkDonations();
    assert(totalStarkDonations == 0, 'Invalid total stark donations');
}

#[test]
fn testGetMaxStarkDonationsToNextLevel() {
    let contractAddress = __setUp__();
    let dispatcher = IDonatorDispatcher { contractAddress };
    let maxStarkDonationsToNextLevel = dispatcher.getMaxStarkDonationsToNextLevel();
    assert( maxStarkDonationsToNextLevel == 10, 'Invalid total stark donations');
}

#[test]
fn testUpdateDonatorValues() {
    let contractAddress =  __setUp__();
    let dispatcher = IDonatorDispatcher { contractAddress };
    dispatcher.updateDonatorValues(5);
    let level = dispatcher.getLevel();
    let totalStarkDonations = dispatcher.getTotalStarkDonations();
    assert(level == 1, 'Invalid level');
    assert(totalStarkDonations == 5, 'Invalid total stark donations');
    dispatcher.updateDonatorValues(5);
    let level = dispatcher.getLevel();
    assert(level == 1, 'Invalid level');
    dispatcher.updateDonatorValues(1);
    let level = dispatcher.getLevel();
    let totalStarkDonations = dispatcher.getTotalStarkDonations();
    let maxStarkDonationsToNextLevel = dispatcher.getMaxStarkDonationsToNextLevel();
    assert(level == 2, 'Invalid level');
    assert(totalStarkDonations == 11, 'Invalid total stark donations');
    assert(maxStarkDonationsToNextLevel == 20, 'Invalid total stark donations');
}
