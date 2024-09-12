use starknet::ContractAddress;

#[starknet::interface]
pub trait IFund<TContractState> {
    fn getId(self: @TContractState) -> u128;
    fn getOwner(self: @TContractState) -> ContractAddress;
    fn setName(ref self: TContractState, name: felt252);
    fn getName(self: @TContractState) -> felt252;
    fn setReason(ref self: TContractState, reason: ByteArray);
    fn getReason(self: @TContractState) -> ByteArray;
    fn receiveVote(ref self: TContractState);
    fn getUpVotes(self: @TContractState) -> u32;
    fn setGoal(ref self: TContractState, goal: u64);
    fn getGoal(self: @TContractState) -> u64;
    fn receiveDonation(ref self: TContractState, strks: u64);
    fn getCurrentGoalState(self: @TContractState) -> u64;
    fn setIsActive(ref self: TContractState, state: u8);
    fn getIsActive(self: @TContractState) -> u8;
    fn getVoter(self: @TContractState) -> u32;
}

#[starknet::contract]
mod Fund {
    // *************************************************************************
    //                            IMPORT
    // *************************************************************************
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use gostarkme::constants::{funds::{state_constants::FundStates},};
    use gostarkme::constants::{funds::{fund_constants::FundConstants},};


    // *************************************************************************
    //                            STORAGE
    // *************************************************************************
    #[storage]
    struct Storage {
        id: u128,
        owner: ContractAddress,
        name: felt252,
        reason: ByteArray,
        up_votes: u32,
        voters: LegacyMap::<ContractAddress, u32>,
        goal: u64,
        current_goal_state: u64,
        state: u8
    }

    // *************************************************************************
    //                            CONSTRUCTOR
    // *************************************************************************
    #[constructor]
    fn constructor(
        ref self: ContractState,
        id: u128,
        owner: ContractAddress,
        name: felt252,
        goal: u64
    ) {
        self.id.write(id);
        self.owner.write(owner);
        self.name.write(name);
        self.reason.write("");
        self.up_votes.write(FundConstants::INITIAL_UP_VOTES);
        self.goal.write(goal);
        self.current_goal_state.write(FundConstants::INITIAL_GOAL);
        self.state.write(FundStates::RECOLLECTING_VOTES);
    }

    // *************************************************************************
    //                            EXTERNALS
    // *************************************************************************
    #[abi(embed_v0)]
    impl FundImpl of super::IFund<ContractState> {
        fn getId(self: @ContractState) -> u128 {
            return self.id.read();
        }
        fn getOwner(self: @ContractState) -> ContractAddress {
            return self.owner.read();
        }
        fn setName(ref self: ContractState, name: felt252) {
            let caller = get_caller_address();
            assert!(self.owner.read() == caller, "You are not the owner");
            self.name.write(name);
        }
        fn getName(self: @ContractState) -> felt252 {
            return self.name.read();
        }
        fn setReason(ref self: ContractState, reason: ByteArray) {
            let caller = get_caller_address();
            assert!(self.owner.read() == caller, "You are not the owner");
            self.reason.write(reason);
        }
        fn getReason(self: @ContractState) -> ByteArray {
            return self.reason.read();
        }
        fn receiveVote(ref self: ContractState) {
            assert(self.voters.read(get_caller_address()) == 0, 'User already voted!');
            assert(
                self.state.read() == FundStates::RECOLLECTING_VOTES, 'Fund not recollecting votes!'
            );
            self.up_votes.write(self.up_votes.read() + 1);
            self.voters.write(get_caller_address(), self.up_votes.read());
            if self.up_votes.read() >= FundConstants::UP_VOTES_NEEDED {
                self.state.write(FundStates::RECOLLECTING_DONATIONS);
            }
        }
        fn getUpVotes(self: @ContractState) -> u32 {
            return self.up_votes.read();
        }
        fn setGoal(ref self: ContractState, goal: u64) {
            let caller = get_caller_address();
            assert!(self.owner.read() == caller, "You are not the owner");
            self.goal.write(goal);
        }
        fn getGoal(self: @ContractState) -> u64 {
            return self.goal.read();
        }
        // TODO: implement the logic where user actually donates starks
        fn receiveDonation(ref self: ContractState, strks: u64) {
            assert(
                self.state.read() == FundStates::RECOLLECTING_DONATIONS,
                'Fund not recollecting dons!'
            );
            self.current_goal_state.write(self.current_goal_state.read() + strks);
            if self.current_goal_state.read() >= self.goal.read() {
                self.state.write(FundStates::CLOSED);
            }
        }
        fn getCurrentGoalState(self: @ContractState) -> u64 {
            return self.current_goal_state.read();
        }
        // TODO: Validate to change method to change setState and getState
        fn setIsActive(ref self: ContractState, state: u8) {
            self.state.write(state);
        }
        fn getIsActive(self: @ContractState) -> u8 {
            return self.state.read();
        }
        fn getVoter(self: @ContractState) -> u32 {
            return self.voters.read(get_caller_address());
        }
    }
}
