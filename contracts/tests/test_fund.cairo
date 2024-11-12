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
otherUser
fn OTHER_USER() -> ContractAddress {
    contract_address_const::<'USER'>()
}
fn FUND_MANAGER() -> ContractAddress {
    contract_address_const::<FundManagerConstants::FUND_MANAGER_ADDRESS>()
}
fn NAME() -> ByteArray {
    "Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum"
}
fn REASON_1() -> ByteArray {
    "Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum"
}
fn REASON_2() -> ByteArray {
    "Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum"
}
fn GOAL() -> u256 {
    1000
}
fn EVIDENCE_LINK_1() -> ByteArray {
    "Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum"
}
fn EVIDENCE_LINK_2() -> ByteArray {
    "Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum"
}
fn CONTACT_HANDLE_1() -> ByteArray {
    "Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum"
}
fn CONTACT_HANDLE_2() -> ByteArray {
    "Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum, Lorem impsum"
}
fn _setup_() -> ContractAddress {
    let contract = declare("Fund").unwrap();
    let mut callData: Array<felt252> = array![];
    callData.append_serde(ID());
    callData.append_serde(OWNER());
    callData.append_serde(NAME());
    callData.append_serde(GOAL());
    callData.append_serde(EVIDENCE_LINK_1());
    callData.append_serde(CONTACT_HANDLE_1());
    callData.append_serde(REASON_1());
    let (contract_address, _) = contract.deploy(@callData).unwrap();
    contract_address
}
// ***************************************************************************************
//                              TEST
// ***************************************************************************************
#[test]
#[fork("Mainnet")]
fn testConstructor() {
    let contractAddress = _setup_();
    let dispatcher = IFundDispatcher { contractAddress };
    let id = dispatcher.getId();
    let owner = dispatcher.getOwner();
    let name = dispatcher.getName();
    let reason = dispatcher.getReason();
    let upVotes = dispatcher.getUpVotes();
    let goal = dispatcher.getGoal();
    let currentGoalState = dispatcher.get_current_goal_state();
    let state = dispatcher.getState();
    assert(id == ID(), 'Invalid id');
    assert(owner == OWNER(), 'Invalid owner');
    assert(name == NAME(), 'Invalid name');
    assert(reason == REASON_1(), 'Invalid reason');
    assert(upVotes == 0, 'Invalid up votes');
    assert(goal == GOAL(), 'Invalid goal');
    assert(currentGoalState == 0, 'Invalid current goal state');
    assert(state == 1, 'Invalid state');
}

#[test]
fn testSetName() {
    let contractAddress = _setup_();
    let dispatcher = IFundDispatcher { contractAddress };
    let name = dispatcher.getName();
    assert(name == NAME(), 'Invalid name');
    start_cheat_caller_address_global(OWNER());
    dispatcher.setName("NEW_NAME");
    let newName = dispatcher.getName();
    assert(newName  == "NEW_NAME", 'Set name method not working')
}

#[test]
fn testSetReason() {
    let contractAddress = _setup_();
    let dispatcher = IFundDispatcher { contractAddress };
    let reason = dispatcher.getReason();
    assert(reason == REASON_1(), 'Invalid reason');
    start_cheat_caller_address_global(OWNER());
    dispatcher.setReason(REASON_2());
    let newReason = dispatcher.getReason();
    assert(newReason == REASON_2(), 'Set reason method not working')
}

#[test]
fn testSetGoal() {
    let contractAddress = _setup_();
    let dispatcher = IFundDispatcher { contractAddress };
    let goal = dispatcher.getGoal();
    assert(goal == GOAL(), 'Invalid goal');
    start_cheat_caller_address_global(FUND_MANAGER());
    dispatcher.setGoal(123);
    let newGoal = dispatcher.getGoal();
    assert(newGoal == 123, 'Set goal method not working')
}

#[test]
fn testReceiveVoteSuccessful() {
    let contractAddress = _setup_();
    let dispatcher = IFundDispatcher {contractAddress };
    dispatcher.receiveVote();
    let me = dispatcher.getVoter();
    // Owner vote, fund have one vote
    assert(me == 1, 'Owner is not in the voters');
    let votes = dispatcher.getUpVotes();
    assert(votes == 1, 'Vote unuseccessful');
}

#[test]
#[should_panic(expected: ('User already voted!',))]
fn testReceiveVoteUnsuccessfulDoubleVote() {
    let contractAddress = _setup_();
    let dispatcher = IFundDispatcher { contractAddress  };
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
fn testReceiveDonationSuccessful() {
    let contractAddress  = _setup_();
    let dispatcher = IFundDispatcher { contractAddress  };
    let goal: u256 = 10;
    let minterAddress = contract_address_const::<StarknetConstants::STRK_TOKEN_MINTER_ADDRESS>();
    let tokenAddress = contract_address_const::<StarknetConstants::STRK_TOKEN_ADDRESS>();
    let tokenDispatcher = IERC20Dispatcher { contractAddress: tokenAddress };
    // Put state as recollecting dons
    dispatcher.setState(2);
    // Put 10 strks as goal, only fund manager
    start_cheat_caller_address(contractAddress, FUND_MANAGER());
    dispatcher.setGoal(goal);
    // fund the manager with STRK token 
    cheat_caller_address(tokenAddress, minterAddress , CheatSpan::TargetCalls(1));
    let mut callData = array![];
    callData .append_serde(FUND_MANAGER());
    callData.append_serde(goal);
    call_contract_syscall(tokenAddress, selector!("permissioned_mint"),  callData.span()).unwrap();
    // approve
    cheat_caller_address(tokenAddress, FUND_MANAGER(), CheatSpan::TargetCalls(1));
    tokenDispatcher.approve(contractAddress, goal);
    // Donate 5 strks
    dispatcher.receiveDonation(goal / 2);
    let currentGoalState = dispatcher.get_current_goal_state();
    assert(currentGoalState == goal / 2, 'Receive donation not working');
    // Donate 5 strks, the goal is done
    dispatcher.receiveDonation(goal / 2);
    let state = dispatcher.getState();
    assert(state == 3, 'State should be close');
}

#[test]
#[should_panic(expected: ('Fund not recollecting dons!',))]
fn testReceiveDonationUnsuccessfulWrongState() {
    let contractAddress = _setup_();
    let dispatcher = IFundDispatcher { contractAddress };
    // Put a wrong state to receive donations
    dispatcher.setState(1);
    // Donate
    dispatcher.receiveDonation(5);
}

#[test]
#[should_panic(expected: ("You are not the fund manager",))]
fn testSetGoalUnauthorized() {
    let contractAddress = _setup_();
    let dispatcher = IFundDispatcher { contractAddress };
    // Change the goal without being the fund manager
    dispatcher.setGoal(22);
}


#[test]
fn testNewVoteReceivedEventEmittedSuccessful() {
    let contractAddress = _setup_();
    let dispatcher = IFundDispatcher { contractAddress };

    let mut spy = spy_events();

    start_cheat_caller_address(contractAddress, OTHER_USER());
    dispatcher.receiveVote();

    spy
        .assert_emitted(
            @array![
                (
                    contractAddress,
                    Fund::Event::NewVoteReceived(
                        Fund::NewVoteReceived {
                            voter: OTHER_USER(), fund: contractAddress, votes: 1
                        }
                    )
                )
            ]
        );
}

#[test]
#[fork("Mainnet")]
fn testEmitEventDonationWithdraw() {
    //Set up contract addresses
    let contractAddress = _setup_();
    let goal: u256 = 10;

    let dispatcher = IFundDispatcher { contractAddress };
    let minterAddress = contract_address_const::<StarknetConstants::STRK_TOKEN_MINTER_ADDRESS>();
    let tokenAddress = contract_address_const::<StarknetConstants::STRK_TOKEN_ADDRESS>();
    let tokenDispatcher = IERC20Dispatcher { contractAddress: tokenAddress };

    //Set up donation call
    dispatcher.setState(2);
    // Put 10 strks as goal, only fund manager
    start_cheat_caller_address(contractAddress, FUND_MANAGER());
    dispatcher.setGoal(goal);
    // fund the manager with STRK token
    cheat_caller_address(tokenAddress, minterAddress, CheatSpan::TargetCalls(1));
    let mut callData  = array![];
    callData .append_serde(FUND_MANAGER());
    callData.append_serde(goal);
    call_contract_syscall(tokenAddress, selector!("permissioned_mint"), callData.span()).unwrap();
    // approve
    cheat_caller_address(tokenAddress, FUND_MANAGER(), CheatSpan::TargetCalls(1));
    tokenDispatcher.approve(contractAddress, goal);

    dispatcher.receiveDonation(goal);

    start_cheat_caller_address_global(OWNER());
    cheat_caller_address(tokenAddress, OWNER(), CheatSpan::TargetCalls(1));

    // Spy on emitted events and call the withdraw function
    let mut spy = spy_events();
    dispatcher.withdraw();

    // Verify the expected event was emitted with the correct values
    spy
        .assert_emitted(
            @array![
                (
                    contractAddress,
                    Fund::Event::DonationWithdraw(
                        Fund::DonationWithdraw {
                            owner_address: OWNER(),
                            fund_contract_address: contractAddress,
                            withdrawn_amount: 10
                        }
                    )
                )
            ]
        );
}

#[test]
#[should_panic(expected: ("You are not the owner",))]
fn testWithdrawWithWrongOwner() {
    let contractAddress = _setup_();

    // call withdraw fn with wrong owner 
    start_cheat_caller_address_global(OTHER_USER());
    IFundDispatcher { contractAddress }.withdraw();
}

#[test]
#[should_panic(expected: ('Fund not close goal yet.',))]
fn testWithdrawWithNonClosedState() {
    let contractAddress = _setup_();
    let fundDispatcher = IFundDispatcher { contractAddress };

    start_cheat_caller_address_global(FUND_MANAGER());
    // set goal
    fundDispatcher.setGoal(500_u256);

    start_cheat_caller_address_global(OWNER());
    // withdraw funds
    fundDispatcher.withdraw();
}

#[test]
#[fork("Mainnet")]
fn testWithDraw() {
    let contractAddress = _setup_();
    let goal: u256 = 500;

    let dispatcher = IFundDispatcher { contractAddress };
    let minterAddress = contract_address_const::<StarknetConstants::STRK_TOKEN_MINTER_ADDRESS>();
    let tokenAddress = contract_address_const::<StarknetConstants::STRK_TOKEN_ADDRESS>();
    let tokenDispatcher = IERC20Dispatcher { contractAddress: tokenAddress };

    //Set donation state
    dispatcher.setState(2);

    start_cheat_caller_address(contractAddress, FUND_MANAGER());
    dispatcher.setGoal(goal);

    cheat_caller_address(tokenAddress, minterAddress, CheatSpan::TargetCalls(1));
    let mut callData = array![];
    callData.append_serde(FUND_MANAGER());
    callData.append_serde(goal);
    call_contract_syscall(tokenAddress, selector!("permissioned_mint"),  callData.span()).unwrap();

    cheat_caller_address(tokenAddress, FUND_MANAGER(), CheatSpan::TargetCalls(1));
    tokenDispatcher.approve(contractAddress, goal);

    dispatcher.receiveDonation(goal);

    start_cheat_caller_address_global(OWNER());
    cheat_caller_address(tokenAddress, OWNER(), CheatSpan::TargetCalls(1));

    let ownerBalanceBefore = tokenDispatcher.balance_of(OWNER());
    let fundBalanceBefore = tokenDispatcher.balance_of(contractAddress);

    // withdraw
    dispatcher.withdraw();

    let ownerBalanceAfter = tokenDispatcher.balance_of(OWNER());
    let fundBalanceAfter = tokenDispatcher.balance_of(contractAddress);

    assert( ownerBalanceAfter == (ownerBalanceBefore + goal), 'wrong owner balance');
    assert((fundBalanceBefore - goal) == fundBalanceAfter, 'wrong fund balance');
}

#[test]
#[fork("Mainnet")]
fn testEmitEventDonationReceived() {
    //Initial configuration of contract addresses and donation targets
    let contractAddress = _setup_();
    let goal: u256 = 10;
    let dispatcher = IFundDispatcher { contractAddress };
    let minterAddress = contract_address_const::<StarknetConstants::STRK_TOKEN_MINTER_ADDRESS>();
    let tokenAddress = contract_address_const::<StarknetConstants::STRK_TOKEN_ADDRESS>();
    let tokenDispatcher = IERC20Dispatcher { contractAddress: tokenAddress };

    //Donation target configuration in the dispatcher
    dispatcher.setState(2);
    start_cheat_caller_address(contractAddress, FUND_MANAGER());
    dispatcher.setGoal(goal);

    //Provision of STRK token to the fund manager
    cheat_caller_address(tokenAddress, minterAddress, CheatSpan::TargetCalls(1));
    let mut callData = array![];
    callData.append_serde(FUND_MANAGER());
    callData.append_serde(goal);
    call_contract_syscall(tokenAddress, selector!("permissioned_mint"), callData.span()).unwrap();

    //Approve
    cheat_caller_address(tokenAddress, FUND_MANAGER(), CheatSpan::TargetCalls(1));
    tokenDispatcher.approve(contractAddress, goal);
    let mut spy = spy_events();

    //Receipt of the donation at the dispatcher
    dispatcher.receiveDonation(goal);
    start_cheat_caller_address_global(FUND_MANAGER());

    //Verification of the current balance and issuance of the expected event
    let currentBalance = dispatcher.get_current_goal_state();
    spy
        .assert_emitted(
            @array![
                (
                    contractAddress,
                    Fund::Event::DonationReceived(
                        Fund::DonationReceived {
                            currentBalance,
                            donated_strks: goal,
                            donator_address: FUND_MANAGER(),
                            fund_contract_address: contractAddress,
                        }
                    )
                )
            ]
        );
}

#[test]
fn testSetEvidenceLink() {
    let contractAddress = _setup_();
    let dispatcher = IFundDispatcher { contractAddress };
    let evidenceLink = dispatcher.get_evidence_link();
    assert(evidenceLink == EVIDENCE_LINK_1(), 'Invalid evidence_link');
    start_cheat_caller_address_global(OWNER());
    dispatcher.set_evidence_link(EVIDENCE_LINK_2());
    let newEvidenceLink = dispatcher.get_evidence_link();
    assert(newEvidenceLink == EVIDENCE_LINK_2(), 'Set evidence method not working')
}

#[test]
#[should_panic(expected: ("You are not the owner",))]
fn testSetEvidenceLinkWrongOwner() {
    let contractAddress = _setup_();

    // call set_evidence_link fn with wrong owner 
    start_cheat_caller_address_global(OTHER_USER());
    IFundDispatcher { contractAddress }.set_evidence_link(EVIDENCE_LINK_2());
}

#[test]
fn testSetContactHandle() {
    let contractAddress _setup_();
    let dispatcher = IFundDispatcher { contractAddress};
    let contactHandle = dispatcher.get_contact_handle();
    assert(contactHandle == CONTACT_HANDLE_1(), 'Invalid contact handle');
    start_cheat_caller_address_global(OWNER());
    dispatcher.set_contact_handle(CONTACT_HANDLE_2());
    let newContactHandle = dispatcher.get_contact_handle();
    assert( newContactHandle  == CONTACT_HANDLE_2(), 'Set contact method not working')
}

#[test]
#[should_panic(expected: ("You are not the owner",))]
fn testSetContactHandleWrongOwner() {
    let contractAddress = _setup_();

    // call set_contact_handle fn with wrong owner 
    start_cheat_caller_address_global(OTHER_USER());
    IFundDispatcher { contractAddress }.set_contact_handle(CONTACT_HANDLE_2());
}
