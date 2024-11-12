// *************************************************************************
//                              DONATOR MANAGER TEST
// *************************************************************************
use starknet::{ContractAddress, contract_address_const};
use starknet::class_hash::{ClassHash};
use starknet::syscalls::deploy_syscall;

use snforge_std::{
    ContractClass, declare, ContractClassTrait, start_cheat_caller_address_global, get_class_hash,
    spy_events, EventSpyAssertionsTrait,
};

use openzeppelin::utils::serde::SerializedAppend;

use gostarkme::donatorManager::{
    DonatorManager, IDonatorManagerDispatcher, IDonatorManagerDispatcherTrait
};

fn OWNER() -> ContractAddress {
    contract_address_const::<'OWNER'>()
}

fn __setUp__() -> (ContractAddress, ClassHash) {
    // Donator
    let donator = declare("Donator").unwrap();
    let mut donatorCalldata: Array<felt252> = array![];
    donatorCalldata.append_serde(OWNER());
    let (donator_contract_address, _) = donator.deploy(@donatorCalldata).unwrap();
    let donatorClassHash = get_class_hash(donator_contract_address);

    // Donator Manager 
    let donatorManager = declare("DonatorManager").unwrap();
    let mut donatorManagerCalldata: Array<felt252> = array![];
    donatorManagerCalldata.append_serde(donatorClassHash);
    let (contract_address, _) = donatorManager.deploy(@donatorManagerCalldata).unwrap();

    return (contract_address, donatorClassHash,);
}

// *************************************************************************
//                              TEST
// *************************************************************************
#[test]
fn testConstructor() {
    // Put owner address like caller
    start_cheat_caller_address_global(OWNER());
    let (contract_address, donatorClassHash) = __setUp__();
    let donatorManagerContract = IDonatorManagerDispatcher { contract_address };
    let expectedDonatorAddress = donatorManagerContract.getDonatorClassHash();
    let owner = donatorManagerContract.getOwner();
    assert(owner == OWNER(), 'Invalid owner');
    assert(donatorClassHash == expectedDonatorAddress, 'Invalid donator class hash');
}

#[test]
fn testNewDonator() {
    start_cheat_caller_address_global(OWNER());
    let (contract_address, donatorClassHash) =  __setUp__();
    let donatorManagerContract = IDonatorManagerDispatcher { contract_address };
    donatorManagerContract.newDonator();
    let expectedDonatorClassHash = get_class_hash(
        donatorManagerContract.getDonatorByAddress(OWNER())
    );
    assert(expectedDonatorClassHash == donatorClassHash, 'Invalid donator address');
}

#[test]
fn testEmitEventDonatorContractDeployed() {
    start_cheat_caller_address_global(OWNER());
    let (contract_address, _) =  __setUp__();
    let donatorManagerContract = IDonatorManagerDispatcher { contract_address };
    let mut spy = spy_events();
    donatorManagerContract.newDonator();

    spy
        .assert_emitted(
            @array![
                (
                    contract_address,
                    DonatorManager::Event::DonatorContractDeployed(
                        DonatorManager::DonatorContractDeployed {
                            newDonator: donatorManagerContract.getDonatorByAddress(OWNER()),
                            owner: OWNER()
                        }
                    )
                )
            ]
        );
}
