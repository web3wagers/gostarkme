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

fn __setup__() -> ContractAddress {
    let contract = declare("Donator").unwrap();
    let mut calldata: Array<felt252> = array![];
    calldata.append_serde(OWNER());
    let (address, _) = contract.deploy(@calldata).unwrap();
    address
}

// *************************************************************************
//                              TEST
// *************************************************************************
#[test]
fn test_get_owner() {
    let contract_address = __setup__();
    let dispatcher = IDonatorDispatcher { contract_address };
    let owner = dispatcher.get_owner();
    assert(owner == OWNER(), 'Invalid owner');
}

#[test]
fn test_get_level() {
    let contract_address = __setup__();
    let dispatcher = IDonatorDispatcher { contract_address };
    let level = dispatcher.get_level();
    assert(level == 1, 'Invalid level');
}

#[test]
fn test_get_total_stark_donations() {
    let contract_address = __setup__();
    let dispatcher = IDonatorDispatcher { contract_address };
    let total_stark_donations = dispatcher.get_total_stark_donations();
    assert(total_stark_donations == 0, 'Invalid total stark donations');
}

#[test]
fn test_get_max_stark_donations_to_next_level() {
    let contract_address = __setup__();
    let dispatcher = IDonatorDispatcher { contract_address };
    let max_stark_donations_to_next_level = dispatcher.get_max_stark_donations_to_next_level();
    assert(max_stark_donations_to_next_level == 10, 'Invalid total stark donations');
}

#[test]
fn test_update_donator_values() {
    let contract_address = __setup__();
    let dispatcher = IDonatorDispatcher { contract_address };
    dispatcher.update_donator_values(5);
    let level = dispatcher.get_level();
    let total_stark_donations = dispatcher.get_total_stark_donations();
    assert(level == 1, 'Invalid level');
    assert(total_stark_donations == 5, 'Invalid total stark donations');
    dispatcher.update_donator_values(5);
    let level = dispatcher.get_level();
    assert(level == 1, 'Invalid level');
    dispatcher.update_donator_values(1);
    let level = dispatcher.get_level();
    let total_stark_donations = dispatcher.get_total_stark_donations();
    let max_stark_donations_to_next_level = dispatcher.get_max_stark_donations_to_next_level();
    assert(level == 2, 'Invalid level');
    assert(total_stark_donations == 11, 'Invalid total stark donations');
    assert(max_stark_donations_to_next_level == 20, 'Invalid total stark donations');
}
