// *************************************************************************
//                              DONATOR MANAGER TEST
// *************************************************************************
use starknet::{ContractAddress, contract_address_const};
use starknet::class_hash::{ClassHash, class_hash_const};
use starknet::syscalls::deploy_syscall;

use snforge_std::{declare, ContractClassTrait};
use openzeppelin::utils::serde::SerializedAppend;

use gostarkme::donatorManager::IDonatorManagerDispatcher;
use gostarkme::donatorManager::IDonatorManagerDispatcherTrait;

fn OWNER() -> ContractAddress {
    contract_address_const::<'OWNER'>()
}

fn DONATOR_CLASS_HASH() -> ClassHash {
    class_hash_const::<'HASH'>()
}

fn __setup__() -> ContractAddress {
    let contract = declare("DonatorManager");
    let mut calldata: Array<felt252> = array![];
    calldata.append_serde(DONATOR_CLASS_HASH());
    contract.deploy(@calldata).unwrap()
}

fn __init_contract__() -> (ContractAddress, IDonatorManagerDispatcher) {
    let contract_address = __setup__();
    let dispatcher = IDonatorManagerDispatcher { contract_address };

    (contract_address, dispatcher)
}

// *************************************************************************
//                              TEST
// *************************************************************************
#[test]
fn test_constructor() {
    let (_, dispatcher) = __init_contract__();
    let donator_class_hash = dispatcher.getDonatorClassHash();
    let owner = dispatcher.getOwner();
    assert(owner == OWNER(), 'Invalid owner');
    assert(donator_class_hash == DONATOR_CLASS_HASH(), 'Invalid donator class hash');
}


#[test]
fn test_new_donator(){
    let (_, dispatcher) = __init_contract__();

    let mut calldata = ArrayTrait::<felt252>::new();

    calldata.append(OWNER().try_into().unwrap());

    let (expected_donator_address, _) = deploy_syscall(
        DONATOR_CLASS_HASH(), 12345, calldata.span(), false
    ).unwrap();

    dispatcher.newDonator();

    assert(expected_donator_address == dispatcher.getDonatorByAddress(OWNER()), 'Invalid donator address');
}
