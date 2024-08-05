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
    fn setIsActive(ref self: TContractState, isActive: bool);
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
        upVotes: u32,
        goal: u64,
        currentGoalState: u64,
        isActive: bool
    }

    #[constructor]
    fn constructor(ref self: ContractState, id: u128, owner: ContractAddress, name: felt252, reason: felt252, goal: u64) {
        self.id.write(id);
        self.owner.write(owner);
        self.name.write(name);
        self.reason.write(reason);
        self.upVotes.write(0);
        self.goal.write(goal);
        self.currentGoalState.write(0);
        self.isActive.write(true);
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
            self.upVotes.write(self.upVotes.read() + 1);
        }
        fn getUpVotes(self: @ContractState) -> u32 {
            return self.upVotes.read();
        }
        fn setGoal(ref self: ContractState, goal: u64) {
            self.goal.write(goal);
        }
        fn getGoal(self: @ContractState) -> u64 {
            return self.goal.read();
        }
        fn donate(ref self: ContractState, amount: u64) {
            self.currentGoalState.write(self.currentGoalState.read() + amount);
        }
        fn getCurrentGoalState(self: @ContractState) -> u64 {
            return self.currentGoalState.read();
        }
        fn setIsActive(ref self: ContractState, isActive: bool) {
            self.isActive.write(isActive);
        }
        fn getIsActive(self: @ContractState) -> bool {
            return self.isActive.read();
        }
    }
}
