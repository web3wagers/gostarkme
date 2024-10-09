use starknet::ContractAddress;

#[starknet::interface]
pub trait IDonator<TContractState> {
    fn getOwner(self: @TContractState) -> ContractAddress;
    fn getLevel(self: @TContractState) -> u32;
    fn getTotalStarkDonations(self: @TContractState) -> u64;
    fn getMaxStarkDonationsToNextLevel(self: @TContractState) -> u64;
    fn updateDonatorValues(ref self: TContractState, donated_starks: u64);
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
        total_stark_donations: u64,
        max_stark_donations_to_next_level: u64
    }

    // *************************************************************************
    //                            CONSTRUCTOR
    // *************************************************************************
    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.owner.write(owner);
        self.level.write(DonatorConstants::INITIAL_LEVEL);
        self.total_stark_donations.write(0);
        self
            .max_stark_donations_to_next_level
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
        fn getTotalStarkDonations(self: @ContractState) -> u64 {
            return self.total_stark_donations.read();
        }
        fn getMaxStarkDonationsToNextLevel(self: @ContractState) -> u64 {
            return self.max_stark_donations_to_next_level.read();
        }
        fn updateDonatorValues(ref self: ContractState, donated_starks: u64) {
            let total_donator_pod = self.total_stark_donations.read() + donated_starks;
            self.total_stark_donations.write(total_donator_pod);
            if (total_donator_pod > self.max_stark_donations_to_next_level.read()) {
                self.level.write(self.level.read() + 1);
                self
                    .max_stark_donations_to_next_level
                    .write(self.max_stark_donations_to_next_level.read() * 2);
            }
        }
    }
}
