// ***************************************************************************************
//                              FUND TEST
// ***************************************************************************************
use starknet::{ContractAddress, contract_address_const};
use starknet::syscalls::call_contract_syscall;

use snforge_std::{
    declare, ContractClassTrait, start_cheat_caller_address_global, start_cheat_caller_address,
    cheat_caller_address, CheatSpan, spy_events, EventSpyAssertionsTrait
};

use openzeppelin::utils::serde::SerializedAppend;
use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};


use gostarkme::fund::Fund;
use gostarkme::fund::IFundDispatcher;
use gostarkme::fund::IFundDispatcherTrait;
use gostarkme::constants::{funds::{fund_manager_constants::FundManagerConstants},};
use gostarkme::constants::{funds::{state_constants::FundStates},};
use gostarkme::constants::{funds::{starknet_constants::StarknetConstants},};


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
// ***************************************************************************************
//                              TEST
// ***************************************************************************************
#[test]
#[fork("Mainnet")]
fn test_constructor() {
    let contract_address = _setup_();
    let dispatcher = IFundDispatcher { contract_address };
    let id = dispatcher.getId();
    let owner = dispatcher.getOwner();
    let name = dispatcher.getName();
    let reason = dispatcher.getReason();
    let up_votes = dispatcher.getUpVotes();
    let goal = dispatcher.getGoal();
    let current_goal_state = dispatcher.get_current_goal_state();
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
#[fork("Mainnet")]
fn test_receive_donation_successful() {
    let contract_address = _setup_();
    let dispatcher = IFundDispatcher { contract_address };
    let goal: u256 = 10;
    let minter_address = contract_address_const::<StarknetConstants::STRK_TOKEN_MINTER_ADDRESS>();
    let token_address = contract_address_const::<StarknetConstants::STRK_TOKEN_ADDRESS>();
    let token_dispatcher = IERC20Dispatcher { contract_address: token_address };
    // Put state as recollecting dons
    dispatcher.setState(2);
    // Put 10 strks as goal, only fund manager
    start_cheat_caller_address(contract_address, FUND_MANAGER());
    dispatcher.setGoal(goal);
    // fund the manager with STRK token
    cheat_caller_address(token_address, minter_address, CheatSpan::TargetCalls(1));
    let mut calldata = array![];
    calldata.append_serde(FUND_MANAGER());
    calldata.append_serde(goal);
    call_contract_syscall(token_address, selector!("permissioned_mint"), calldata.span()).unwrap();
    // approve
    cheat_caller_address(token_address, FUND_MANAGER(), CheatSpan::TargetCalls(1));
    token_dispatcher.approve(contract_address, goal);
    // Donate 5 strks
    dispatcher.receiveDonation(goal / 2);
    let current_goal_state = dispatcher.get_current_goal_state();
    assert(current_goal_state == goal / 2, 'Receive donation not working');
    // Donate 5 strks, the goal is done
    dispatcher.receiveDonation(goal / 2);
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
fn test_new_vote_received_event_emitted_successful() {
    let contract_address = _setup_();
    let dispatcher = IFundDispatcher { contract_address };

    let mut spy = spy_events();

    start_cheat_caller_address(contract_address, OTHER_USER());
    dispatcher.receiveVote();

    spy
        .assert_emitted(
            @array![
                (
                    contract_address,
                    Fund::Event::NewVoteReceived(
                        Fund::NewVoteReceived {
                            voter: OTHER_USER(), fund: contract_address, votes: 1
                        }
                    )
                )
            ]
        );
}

#[test]
#[fork("Mainnet")]
fn test_emit_event_donation_withdraw() {
    //Set up contract addresses
    let contract_address = _setup_();
    let goal: u256 = 10;

    let dispatcher = IFundDispatcher { contract_address };
    let minter_address = contract_address_const::<StarknetConstants::STRK_TOKEN_MINTER_ADDRESS>();
    let token_address = contract_address_const::<StarknetConstants::STRK_TOKEN_ADDRESS>();
    let token_dispatcher = IERC20Dispatcher { contract_address: token_address };

    //Set up donation call
    dispatcher.setState(2);
    // Put 10 strks as goal, only fund manager
    start_cheat_caller_address(contract_address, FUND_MANAGER());
    dispatcher.setGoal(goal);
    // fund the manager with STRK token
    cheat_caller_address(token_address, minter_address, CheatSpan::TargetCalls(1));
    let mut calldata = array![];
    calldata.append_serde(FUND_MANAGER());
    calldata.append_serde(goal);
    call_contract_syscall(token_address, selector!("permissioned_mint"), calldata.span()).unwrap();
    // approve
    cheat_caller_address(token_address, FUND_MANAGER(), CheatSpan::TargetCalls(1));
    token_dispatcher.approve(contract_address, goal);

    dispatcher.receiveDonation(goal);

    start_cheat_caller_address_global(OWNER());
    cheat_caller_address(token_address, OWNER(), CheatSpan::TargetCalls(1));

    // Spy on emitted events and call the withdraw function
    let mut spy = spy_events();
    dispatcher.withdraw();

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
                            withdrawn_amount: 10
                        }
                    )
                )
            ]
        );
}

#[test]
#[should_panic(expected: ("You are not the owner",))]
fn test_withdraw_with_wrong_owner() {
    let contract_address = _setup_();

    // call withdraw fn with wrong owner 
    start_cheat_caller_address_global(OTHER_USER());
    IFundDispatcher { contract_address }.withdraw();
}

#[test]
#[should_panic(expected: ('Fund not close goal yet.',))]
fn test_withdraw_with_non_closed_state() {
    let contract_address = _setup_();
    let fund_dispatcher = IFundDispatcher { contract_address };

    start_cheat_caller_address_global(FUND_MANAGER());
    // set goal
    fund_dispatcher.setGoal(500_u256);

    start_cheat_caller_address_global(OWNER());
    // withdraw funds
    fund_dispatcher.withdraw();
}

#[test]
#[should_panic(expected: ('Fund hasnt reached its goal yet',))]
fn test_withdraw_when_fund_has_not_reach_goal() {
    let contract_address = _setup_();
    let dispatcher = IFundDispatcher { contract_address };

    start_cheat_caller_address_global(FUND_MANAGER());

    dispatcher.setGoal(10);
    dispatcher.setState(3);

    start_cheat_caller_address_global(OWNER());
    dispatcher.withdraw();
}

#[test]
#[fork("Mainnet")]
fn test_withdraw() {
    let contract_address = _setup_();
    let fund_dispatcher = IFundDispatcher { contract_address };
    let starknet_dispatcher = IERC20Dispatcher {
        contract_address: StarknetConstants::STRK_TOKEN_ADDRESS.try_into().unwrap()
    };

    start_cheat_caller_address_global(FUND_MANAGER());

    // set goal
    fund_dispatcher.setGoal(500_u256);
    fund_dispatcher.setState(2);

    // donate
    fund_dispatcher.receiveDonation(500_u256);

    start_cheat_caller_address_global(OWNER());
    // withdraw funds
    fund_dispatcher.withdraw();

    let balance = starknet_dispatcher.balance_of(OWNER());

    //TODO assert correct balance when logic for depositing strks is complete
    assert(balance == 0, 'wrong balance');
}
