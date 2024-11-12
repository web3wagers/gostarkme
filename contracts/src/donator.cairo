use starknet::ContractAddress;

#[starknet::interface]
pub trait IDonator<TContractState> {
    fn getOwner(self: @TContractState) -> ContractAddress;
    fn getLevel(self: @TContractState) -> u32;
    fn getTotalStarkDonations(self: @TContractState) -> u256;
    fn getMaxStarkDonationsToNextLevel(self: @TContractState) -> u256;
    fn updateDonatorValues(ref self: TContractState, donatedStarks: u256);
}

#[starknet::contract]
mod Donator {
    // *************************************************************************
    //                            IMPORT
    // *************************************************************************
    use starknet::ContractAddress;
    use gostarkme::constants::{donator::{donator_constants::DonatorConstants}};

    // *************************************************************************
    //                            STORAGE
    // *************************************************************************   
    #[storage]
    struct Storage {
        owner: ContractAddress,
        level: u32,
        totalStarkDonations: u256,
        maxStarkDonationsToNextLevel: u256
    }

    // *************************************************************************
    //                            CONSTRUCTOR
    // *************************************************************************
    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.owner.write(owner);
        self.level.write(DonatorConstants::INITIAL_LEVEL);
        self.totalStarkDonations.write(0);
        self.maxStarkDonationsToNextLevel
            .write(DonatorConstants::INITIAL_MAX_STARKS_DONATION_TO_NEXT_LEVEL);
    }

    // *************************************************************************
    //                            EXTERNALS
    // *************************************************************************
    #[abi(embed_v0)]
    impl DonatorImpl of super::IDonator<ContractState> {
        fn getOwner(self: @ContractState) -> ContractAddress {
            return self.owner.read();
        }
        fn getLevel(self: @ContractState) -> u32 {
            return self.level.read();
        }
        fn getTotalStarkDonations(self: @ContractState) -> u256 {
            return self.totalStarkDonations.read();
        }
        fn getMaxStarkDonationsToNextLevel(self: @ContractState) -> u256 {
            return self.maxStarkDonationsToNextLevel.read();
        }
        fn updateDonatorValues(ref self: ContractState, donatedStarks: u256) {
            let totalDonatorPod = self.totalStarkDonations.read() + donatedStarks;
            self.totalStarkDonations.write(totalDonatorPod);
            if (totalDonatorPod > self.maxStarkDonationsToNextLevel.read()) {
                self.level.write(self.level.read() + 1);
                self
                    .maxStarkDonationsToNextLevel
                    .write(self.maxStarkDonationsToNextLevel.read() * 2);
            }
        }
    }
}
