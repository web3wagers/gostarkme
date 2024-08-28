// *************************************************************************
//                              FUND TEST
// *************************************************************************
use starknet::{ContractAddress, contract_address_const};

use snforge_std::{declare, ContractClassTrait, CheatTarget};

use openzeppelin::utils::serde::SerializedAppend;

use gostarkme::fund::IFundDispatcher;
use gostarkme::fund::IFundDispatcherTrait;

fn ID() -> u128 {
    1
}
fn OWNER() -> ContractAddress {
    contract_address_const::<'OWNER'>()
}
fn NAME() -> felt252 {
    'NAME_FUND_TEST'
}
fn REASON() -> felt252 {
    'REASON_FUND_TEST'
}
fn GOAL() -> u64 {
    1000
}
fn __setup__() -> ContractAddress {
    let contract = declare("Fund");
    let mut calldata: Array<felt252> = array![];
    calldata.append_serde(ID());
    calldata.append_serde(OWNER());
    calldata.append_serde(NAME());
    calldata.append_serde(REASON());
    calldata.append_serde(GOAL());
    contract.deploy(@calldata).unwrap()
}
// *************************************************************************
//                              TEST
// *************************************************************************
#[test]
fn test_constructor() {
    let contract_address = __setup__();
    let dispatcher = IFundDispatcher { contract_address };
    let id = dispatcher.getId();
    let owner = dispatcher.getOwner();
    let name = dispatcher.getName();
    let reason = dispatcher.getReason();
    let up_votes = dispatcher.getUpVotes();
    let goal = dispatcher.getGoal();
    let current_goal_state = dispatcher.getCurrentGoalState();
    let state = dispatcher.getIsActive();
    assert(id == ID(), 'Invalid id');
    assert(owner == OWNER(), 'Invalid owner');
    assert(name == NAME(), 'Invalid name');
    assert(reason == REASON(), 'Invalid reason');
    assert(up_votes == 1, 'Invalid up votes');
    assert(goal == GOAL(), 'Invalid goal');
    assert(current_goal_state == 0, 'Invalid current goal state');
    assert(state == 1, 'Invalid state');
}

#[test]
fn test_set_name() {
    let contract_address = __setup__();
    let dispatcher = IFundDispatcher { contract_address };
    let name = dispatcher.getName();
    assert(name == NAME(), 'Invalid name');
    snforge_std::start_prank(CheatTarget::One(contract_address), OWNER());
    dispatcher.setName('NEW_NAME');
    let new_name = dispatcher.getName();
    assert(new_name == 'NEW_NAME', 'Set name method not working')
}

#[test]
fn test_set_reason() {
    let contract_address = __setup__();
    let dispatcher = IFundDispatcher { contract_address };
    let reason = dispatcher.getReason();
    assert(reason == REASON(), 'Invalid reason');
    snforge_std::start_prank(CheatTarget::One(contract_address), OWNER());
    dispatcher.setReason('NEW_REASON');
    let new_reason = dispatcher.getReason();
    assert(new_reason == 'NEW_REASON', 'Set reason method not working')
}

#[test]
fn test_set_goal() {
    let contract_address = __setup__();
    let dispatcher = IFundDispatcher { contract_address };
    let goal = dispatcher.getGoal();
    assert(goal == GOAL(), 'Invalid goal');
    snforge_std::start_prank(CheatTarget::One(contract_address), OWNER());
    dispatcher.setGoal(123);
    let new_goal = dispatcher.getGoal();
    assert(new_goal == 123, 'Set goal method not working')
}

