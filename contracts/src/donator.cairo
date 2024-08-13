use starknet::ContractAddress;

#[starknet::interface]
trait IDonator<TContractState> {
    fn getId(self: @TContractState) -> u128;
    fn getOwner(self: @TContractState) -> ContractAddress;
    fn getTotalDonations(self: @TContractState) -> u128;
    fn getLevel(self: @TContractState) -> u128;
    fn calculateLevel(
        ref self: ContractState, total_starks_donated: u128, level: u8, threshold: u128
    );
    fn donate(ref self: ContractState, new_donation: u128);
}

#[starknet::contract]
mod Donator {
    // *************************************************************************
    //                            IMPORT
    // *************************************************************************
    use starknet::ContractAddress;
    use gostarkme::{constants::donator_constants::DonatorConstants};

    // *************************************************************************
    //                            STORAGE
    // *************************************************************************
    #[storage]
    struct Storage {
        id: u128,
        owner: ContractAddress,
        total_donations: u128,
        level: u128
    }

    // *************************************************************************
    //                            CONSTRUCTOR
    // *************************************************************************
    #[constructor]
    fn constructor(ref self: ContractState, id: u128, owner: ContractAddress) {
        self.id.write(id);
        self.owner.write(owner);
        // Total donations will be the total starks donated
        self.total_donations.write(0);
        self.level.write(DonatorConstants::INICIAL_LEVEL);
    }

    // *************************************************************************
    //                            EXTERNALS
    // *************************************************************************
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
        fn calculateLevel(
            ref self: ContractState, total_starks_donated: u128, level: u8, threshold: u128
        ) {
            // TODO: Add validation only project owner
            if (totalStarksDonated < threshold) {
                return level;
            }
            return calculateLevel(totalStarksDonated, level + 1, threshold * 2);
        }

        fn donate(ref self: ContractState, new_donation: u128) {
            // TODO: Add validation only donator owner
            // TODO: Pending donation logic
            let total_starks_donated = self.total_donations + new_donation;
            self
                .level =
                    calculateLevel(
                        total_starks_donated,
                        DonatorConstants::INICIAL_LEVEL,
                        DonatorConstants::INICIAL_TOTAL_STARKS_DONATION
                    );
        }
    }
}
