// *************************************************************************
//                              DONATOR MANAGER TEST
// *************************************************************************
use starknet::{ContractAddress, contract_address_const};
use starknet::class_hash::{ClassHash, class_hash_const};
use starknet::syscalls::deploy_syscall;

use snforge_std::{
    ContractClass, declare, ContractClassTrait, start_cheat_caller_address_global, get_class_hash
};

use openzeppelin::utils::serde::SerializedAppend;

use gostarkme::donatorManager::IDonatorManagerDispatcher;
use gostarkme::donatorManager::IDonatorManagerDispatcherTrait;

fn OWNER() -> ContractAddress {
    contract_address_const::<'OWNER'>()
}

// *************************************************************************
//                              TEST
// *************************************************************************

#[test]
fn test_constructor() {
    start_cheat_caller_address_global(OWNER());

    let donator = declare("Donator").unwrap();
    let mut donator_calldata: Array<felt252> = array![];
    donator_calldata.append_serde(OWNER());
    let (donator_contract_address, _) = donator.deploy(@donator_calldata).unwrap();
    let donator_class_hash = get_class_hash(donator_contract_address);

    let donator_manager = declare("DonatorManager").unwrap();
    let mut donator_manager_calldata: Array<felt252> = array![];
    donator_manager_calldata.append_serde(donator_class_hash);
    let (contract_address, _) = donator_manager.deploy(@donator_manager_calldata).unwrap();
    let donator_manager_contract = IDonatorManagerDispatcher { contract_address };

    let expected_donator_address = donator_manager_contract.getDonatorClassHash();
    let owner = donator_manager_contract.getOwner();

    assert(owner == OWNER(), 'Invalid owner');
    assert(donator_class_hash == expected_donator_address, 'Invalid donator class hash');
}


#[test]
fn test_new_donator() {
    start_cheat_caller_address_global(OWNER());

    // Deploy Donator Contract
    let donator = declare("Donator").unwrap();
    let mut donator_calldata: Array<felt252> = array![];
    donator_calldata.append_serde(OWNER());
    let (expected_donator_address, _) = donator.deploy(@donator_calldata).unwrap();
    let donator_class_hash = get_class_hash(
        expected_donator_address
    ); // Retrieve Class Hash from the deployed contract

    // Deploy Donator Manager Contract
    let donator_manager = declare("DonatorManager").unwrap();
    let mut donator_manager_calldata: Array<felt252> = array![];
    donator_manager_calldata.append_serde(donator_class_hash);
    let (contract_address, _) = donator_manager.deploy(@donator_manager_calldata).unwrap();
    let donator_manager_contract = IDonatorManagerDispatcher { contract_address };

    donator_manager_contract.newDonator();

    let expected_donator_class_hash = get_class_hash(
        donator_manager_contract.getDonatorByAddress(OWNER())
    );

    // Assert that in the Donator Manager contract the deployed Donator match de expected class hash
    assert(expected_donator_class_hash == donator_class_hash, 'Invalid donator address');
}
