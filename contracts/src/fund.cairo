use starknet::ContractAddress;

#[starknet::interface]
trait IFund<TContractState> {
    fn getId(self: @TContractState) -> u128;
    fn getOwner(self: @TContractState) -> ContractAddress;
    fn setName(ref self: TContractState, name: felt252);
    fn getName(self: @TContractState) -> felt252;
    fn setReason(ref self: TContractState, reason: felt252);
    fn getReason(self: @TContractState) -> felt252;
    fn sumVote(ref self: TContractState);
    fn getUpVotes(self: @TContractState) -> u32;
    fn setGoal(ref self: TContractState, goal: u64);
    fn getGoal(self: @TContractState) -> u64;
    fn donate(ref self: TContractState, amount: u64);
    fn getCurrentGoalState(self: @TContractState) -> u64;
    fn setIsActive(ref self: TContractState, is_active: bool);
    fn getIsActive(self: @TContractState) -> bool;
}

#[starknet::contract]
mod Fund {
    use starknet::ContractAddress;

    #[storage]
    struct Storage {
        id: u128,
        owner: ContractAddress,
        name: felt252,
        reason: felt252,
        up_votes: u32,
        goal: u64,
        current_goal_state: u64,
        is_active: bool
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        id: u128,
        owner: ContractAddress,
        name: felt252,
        reason: felt252,
        goal: u64
    ) {
        self.id.write(id);
        self.owner.write(owner);
        self.name.write(name);
        self.reason.write(reason);
        self.up_votes.write(0);
        self.goal.write(goal);
        self.current_goal_state.write(0);
        self.is_active.write(true);
    }

    #[abi(embed_v0)]
    impl FundImpl of super::IFund<ContractState> {
        fn getId(self: @ContractState) -> u128 {
            return self.id.read();
        }
        fn getOwner(self: @ContractState) -> ContractAddress {
            return self.owner.read();
        }
        fn setName(ref self: ContractState, name: felt252) {
            self.name.write(name);
        }
        fn getName(self: @ContractState) -> felt252 {
            return self.name.read();
        }
        fn setReason(ref self: ContractState, reason: felt252) {
            self.reason.write(reason);
        }
        fn getReason(self: @ContractState) -> felt252 {
            return self.reason.read();
        }
        fn sumVote(ref self: ContractState) {
            self.up_votes.write(self.up_votes.read() + 1);
        }
        fn getUpVotes(self: @ContractState) -> u32 {
            return self.up_votes.read();
        }
        fn setGoal(ref self: ContractState, goal: u64) {
            self.goal.write(goal);
        }
        fn getGoal(self: @ContractState) -> u64 {
            return self.goal.read();
        }
        fn donate(ref self: ContractState, amount: u64) {
            self.current_goal_state.write(self.current_goal_state.read() + amount);
        }
        fn getCurrentGoalState(self: @ContractState) -> u64 {
            return self.current_goal_state.read();
        }
        fn setIsActive(ref self: ContractState, is_active: bool) {
            self.is_active.write(is_active);
        }
        fn getIsActive(self: @ContractState) -> bool {
            return self.is_active.read();
        }
    }
}
