use starknet::ContractAddress;

#[starknet::interface]
trait IDonator<TContractState> {
    fn getId(self: @TContractState) -> u128;
    fn getOwner(self: @TContractState) -> ContractAddress;
    fn getTotalDonations(self: @TContractState) -> u128;
    fn getLevel(self: @TContractState) -> u128;
}

#[starknet::contract]
mod Donator {
    use starknet::ContractAddress;

    #[storage]
    struct Storage {
        id: u128,
        owner: ContractAddress,
        total_donations: u128,
        level: u128
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        id: u128,
        owner: ContractAddress
    ) {
        self.id.write(id);
        self.owner.write(owner);
        self.total_donations.write(0);
        self.level.write(1);
    }

    #[abi(embed_v0)]
    impl DonatorImpl of super::IDonator<ContractState> {
        fn getId(self: @ContractState) -> u128 {
            return self.id.read();
        }
        fn getOwner(self: @ContractState) -> ContractAddress {
            return self.owner.read();
        }
        fn getTotalDonations(self: @ContractState) -> u128 {
            return self.total_donations.read();
        }
        fn getLevel(self: @ContractState) -> u128 {
            return self.level.read();
        }
    }
}
