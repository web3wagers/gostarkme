// ***************************************************************************************
//                              FUND TEST
// ***************************************************************************************
use starknet::{ContractAddress, contract_address_const};

use snforge_std::{
    declare, ContractClassTrait, start_cheat_caller_address_global, spy_events,
    EventSpyAssertionsTrait
};

use openzeppelin::utils::serde::SerializedAppend;

use gostarkme::fund::{Fund, IFundDispatcher, IFundDispatcherTrait};
use gostarkme::constants::{funds::{fund_manager_constants::FundManagerConstants},};
use openzeppelin::presets::ERC20;

fn ID() -> u128 {
    1
}
fn OWNER() -> ContractAddress {
    contract_address_const::<'OWNER'>()
}
fn OTHER_USER() -> ContractAddress {
    contract_address_const::<'USER'>()
}
fn FUND_MANAGER() -> ContractAddress {
    contract_address_const::<FundManagerConstants::FUND_MANAGER_ADDRESS>()
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
fn _setup_() -> ContractAddress {
    let contract = declare("Fund").unwrap();
    let mut calldata: Array<felt252> = array![];
    calldata.append_serde(ID());
    calldata.append_serde(OWNER());
    calldata.append_serde(NAME());
    calldata.append_serde(GOAL());
    let (contract_address, _) = contract.deploy(@calldata).unwrap();
    contract_address
}
fn _setup_erc20_() -> ContractAddress {
    // Declare the ERC20 contract and retrieve the class hash
    let erc20_class_hash = declare("ERC20").unwrap();

    // Define the ERC20 token's properties
    let erc20_name: ByteArray = "Mock ERC20";
    let erc20_symbol: ByteArray = "MMM";
    let initial_supply: u256 = 10000;
    let recipient: ContractAddress = OWNER();

    // Initialize constructor calldata array for ERC20 deployment
    let mut erc20_constructor_calldata: Array<felt252> = ArrayTrait::new();

    // Serialize the token properties into the constructor calldata
    erc20_name.serialize(ref erc20_constructor_calldata);
    erc20_symbol.serialize(ref erc20_constructor_calldata);
    initial_supply.serialize(ref erc20_constructor_calldata);
    recipient.serialize(ref erc20_constructor_calldata);

    // Deploy the ERC20 contract using the class hash and constructor calldata
    let (erc20_contract_address, _) = erc20_class_hash.deploy(@erc20_constructor_calldata).unwrap();

    erc20_contract_address
}
// ***************************************************************************************
//                              TEST
// ***************************************************************************************
#[test]
fn test_constructor() {
    let contract_address = _setup_();
    let dispatcher = IFundDispatcher { contract_address };
    let id = dispatcher.getId();
    let owner = dispatcher.getOwner();
    let name = dispatcher.getName();
    let reason = dispatcher.getReason();
    let up_votes = dispatcher.getUpVotes();
    let goal = dispatcher.getGoal();
    let current_goal_state = dispatcher.getCurrentGoalState();
    let state = dispatcher.getState();
    assert(id == ID(), 'Invalid id');
    assert(owner == OWNER(), 'Invalid owner');
    assert(name == NAME(), 'Invalid name');
    assert(reason == " ", 'Invalid reason');
    assert(up_votes == 0, 'Invalid up votes');
    assert(goal == GOAL(), 'Invalid goal');
    assert(current_goal_state == 0, 'Invalid current goal state');
    assert(state == 1, 'Invalid state');
}

#[test]
fn test_set_name() {
    let contract_address = _setup_();
    let dispatcher = IFundDispatcher { contract_address };
    let name = dispatcher.getName();
    assert(name == NAME(), 'Invalid name');
    start_cheat_caller_address_global(OWNER());
    dispatcher.setName('NEW_NAME');
    let new_name = dispatcher.getName();
    assert(new_name == 'NEW_NAME', 'Set name method not working')
}

#[test]
fn test_set_reason() {
    let contract_address = _setup_();
    let dispatcher = IFundDispatcher { contract_address };
    let reason = dispatcher.getReason();
    assert(reason == " ", 'Invalid reason');
    start_cheat_caller_address_global(OWNER());
    dispatcher.setReason(REASON());
    let new_reason = dispatcher.getReason();
    assert(new_reason == REASON(), 'Set reason method not working')
}

#[test]
fn test_set_goal() {
    let contract_address = _setup_();
    let dispatcher = IFundDispatcher { contract_address };
    let goal = dispatcher.getGoal();
    assert(goal == GOAL(), 'Invalid goal');
    start_cheat_caller_address_global(FUND_MANAGER());
    dispatcher.setGoal(123);
    let new_goal = dispatcher.getGoal();
    assert(new_goal == 123, 'Set goal method not working')
}

#[test]
fn test_receive_vote_successful() {
    let contract_address = _setup_();
    let dispatcher = IFundDispatcher { contract_address };
    dispatcher.receiveVote();
    let me = dispatcher.getVoter();
    // Owner vote, fund have one vote
    assert(me == 1, 'Owner is not in the voters');
    let votes = dispatcher.getUpVotes();
    assert(votes == 1, 'Vote unuseccessful');
}

#[test]
#[should_panic(expected: ('User already voted!',))]
fn test_receive_vote_unsuccessful_double_vote() {
    let contract_address = _setup_();
    let dispatcher = IFundDispatcher { contract_address };
    dispatcher.receiveVote();
    let me = dispatcher.getVoter();
    // Owner vote, fund have one vote
    assert(me == 1, 'Owner is not in the voters');
    let votes = dispatcher.getUpVotes();
    assert(votes == 1, 'Vote unuseccessful');
    // Owner vote, second time
    dispatcher.receiveVote();
}

#[test]
fn test_receive_donation_successful() {
    let contract_address = _setup_();
    let dispatcher = IFundDispatcher { contract_address };
    // Put state as recollecting dons
    dispatcher.setState(2);
    // Put 10 strks as goal, only fund manager
    start_cheat_caller_address_global(FUND_MANAGER());
    dispatcher.setGoal(10);
    // Donate 5 strks
    dispatcher.receiveDonation(5);
    let current_goal_state = dispatcher.getCurrentGoalState();
    assert(current_goal_state == 5, 'Receive donation not working');
    // Donate 5 strks, the goal is done
    dispatcher.receiveDonation(5);
    let state = dispatcher.getState();
    assert(state == 3, 'State should be close');
}

#[test]
#[should_panic(expected: ('Fund not recollecting dons!',))]
fn test_receive_donation_unsuccessful_wrong_state() {
    let contract_address = _setup_();
    let dispatcher = IFundDispatcher { contract_address };
    // Put a wrong state to receive donations
    dispatcher.setState(1);
    // Donate 
    dispatcher.receiveDonation(5);
}

#[test]
#[should_panic(expected: ("You are not the fund manager",))]
fn test_set_goal_unauthorized() {
    let contract_address = _setup_();
    let dispatcher = IFundDispatcher { contract_address };
    // Change the goal without being the fund manager
    dispatcher.setGoal(22);
}

#[test]
fn test_emit_event_donation_withdraw() {
    //Set up contract addresses
    let contract_address = _setup_();
    let erc20_contract_address = _setup_erc20_();

    let dispatcher = IFundDispatcher { contract_address };

    start_cheat_caller_address_global(OWNER());

    // Set up initial contract states needed for the test
    dispatcher.setState(3);
    dispatcher.setCurrentGoalState(10);

    // Spy on emitted events and call the withdraw function
    let mut spy = spy_events();
    dispatcher.withdraw(erc20_contract_address);

    // Verify the expected event was emitted with the correct values
    spy
        .assert_emitted(
            @array![
                (
                    contract_address,
                    Fund::Event::DonationWithdraw(
                        Fund::DonationWithdraw {
                            owner_address: OWNER(),
                            fund_contract_address: contract_address,
                            withdrawn_amount: 0
                        }
                    )
                )
            ]
        );
}

