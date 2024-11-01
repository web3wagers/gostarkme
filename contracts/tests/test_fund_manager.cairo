// ***************************************************************************************
//                              FUND MANAGER TEST
// ***************************************************************************************
use starknet::{ContractAddress, contract_address_const};
use starknet::class_hash::{ClassHash};
use starknet::syscalls::deploy_syscall;

use snforge_std::{
    ContractClass, declare, ContractClassTrait, start_cheat_caller_address_global, get_class_hash,
    spy_events, EventSpyAssertionsTrait
};

use openzeppelin::utils::serde::SerializedAppend;

use gostarkme::fundManager::IFundManagerDispatcher;
use gostarkme::fundManager::IFundManagerDispatcherTrait;
use gostarkme::fundManager::FundManager;

fn ID() -> u128 {
    1
}
fn OWNER() -> ContractAddress {
    contract_address_const::<'OWNER'>()
}
fn OTHER_USER() -> ContractAddress {
    contract_address_const::<'USER'>()
}
fn NAME() -> felt252 {
    'NAME_FUND_TEST'
}
fn REASON() -> ByteArray {
    "Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum"
}
fn GOAL() -> u256 {
    1000
}

fn _setup_() -> (ContractAddress, ClassHash) {
    // Fund
    let fund = declare("Fund").unwrap();
    let mut fund_calldata: Array<felt252> = array![];
    fund_calldata.append_serde(ID());
    fund_calldata.append_serde(OWNER());
    fund_calldata.append_serde(NAME());
    fund_calldata.append_serde(GOAL());
    let (fund_contract_address, _) = fund.deploy(@fund_calldata).unwrap();
    let fund_class_hash = get_class_hash(fund_contract_address);

    // Fund Manager
    let fund_manager = declare("FundManager").unwrap();
    let mut fund_manager_calldata: Array<felt252> = array![];
    fund_manager_calldata.append_serde(fund_class_hash);
    let (contract_address, _) = fund_manager.deploy(@fund_manager_calldata).unwrap();

    return (contract_address, fund_class_hash);
}

// ******************************************************************************
//                              TEST
// ******************************************************************************

#[test]
fn test_constructor() {
    start_cheat_caller_address_global(OWNER());
    let (contract_address, fund_class_hash) = _setup_();
    let fund_manager_contract = IFundManagerDispatcher { contract_address };
    let expected_fund_address = fund_manager_contract.getFundClassHash();
    let owner = fund_manager_contract.getOwner();
    assert(owner == OWNER(), 'Invalid owner');
    assert(fund_class_hash == expected_fund_address, 'Invalid fund class hash');
}

#[test]
fn test_new_fund() {
    start_cheat_caller_address_global(OWNER());
    let (contract_address, fund_class_hash) = _setup_();
    let fund_manager_contract = IFundManagerDispatcher { contract_address };
    fund_manager_contract.newFund(NAME(), GOAL());
    let expected_fund_class_hash = get_class_hash(fund_manager_contract.getFund(1));
    let current_id = fund_manager_contract.getCurrentId();
    assert(expected_fund_class_hash == fund_class_hash, 'Invalid fund address');
    assert(current_id == 2, 'Invalid current ID');
}

/// Test function `test_fund_deployed_event` verifies the correct emission of the `FundDeployed` event upon deploying a new fund.
///
/// - This function begins by setting up the initial environment and obtaining the contract address for the Fund Manager.
/// - A dispatcher instance `fund_manager_contract` is created to interact with the `IFundManager` contract at the specified `contract_address`.
/// - The caller address is set to `OWNER()` using `start_cheat_caller_address_global`, allowing the function to execute as the designated owner.
/// - A spy is initialized with `spy_events()` to capture and analyze emitted events for later verification.
/// - The `current_id` of the fund is retrieved before deploying a new fund.
/// - The `newFund` function is called with `NAME()` and `GOAL()` to deploy a new fund.
/// - `expected_fund_class_hash` is retrieved to obtain the expected address for the newly created fund.
/// - Finally, the `spy.assert_emitted` function verifies that the `FundDeployed` event was emitted with the expected `contract_address`, `fund_address`, `fund_id`, and `owner`.
///
/// This test ensures that all event attributes are correct and that the fund deployment event is emitted as expected.
#[test]
fn test_fund_deployed_event() {
    let (contract_address, _) = _setup_();
    let fund_manager_contract = IFundManagerDispatcher { contract_address };

    start_cheat_caller_address_global(OWNER());

    let mut spy = spy_events();

    let current_id = fund_manager_contract.getCurrentId();
    fund_manager_contract.newFund(NAME(), GOAL());

    let expected_fund_class_hash = fund_manager_contract.getFund(1);

    spy
        .assert_emitted(
            @array![
                (
                    contract_address,
                    FundManager::Event::FundDeployed(
                        FundManager::FundDeployed {
                            fund_address: expected_fund_class_hash,
                            fund_id: current_id,
                            owner: OWNER(),
                        }
                    )
                )
            ]
        );
}

