use starknet::ContractAddress;
use starknet::class_hash::ClassHash;

#[starknet::interface]
pub trait IDonatorManager<TContractState> {
    fn newDonator(ref self: TContractState);
    fn getOwner(self: @TContractState) -> ContractAddress;
    fn getDonatorClassHash(self: @TContractState) -> ClassHash;
    fn getDonatorByAddress(self: @TContractState, owner: ContractAddress) -> ContractAddress;
}

#[starknet::contract]
pub mod DonatorManager {
    // *************************************************************************
    //                            IMPORT
    // *************************************************************************
    use core::array::ArrayTrait;
    use core::traits::TryInto;
    use starknet::ContractAddress;
    use starknet::syscalls::deploy_syscall;
    use starknet::class_hash::ClassHash;
    use starknet::get_caller_address;

    // *************************************************************************
    //                            STORAGE
    // *************************************************************************
    #[storage]
    struct Storage {
        owner: ContractAddress,
        donators: LegacyMap::<ContractAddress, ContractAddress>,
        donatorClassHash: ClassHash,
    }

    // *************************************************************************
    //                            CONSTRUCTOR
    // *************************************************************************
    #[constructor]
    fn constructor(ref self: ContractState, donatorClassHash: felt252) {
        self.owner.write(get_caller_address());
        self.donatorClassHash.write(donatorClassHash.try_into().unwrap());
    }

    // *************************************************************************
    //                            EVENTS
    // *************************************************************************
    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        DonatorContractDeployed: DonatorContractDeployed,
    }

    #[derive(Drop, starknet::Event)]
    pub struct DonatorContractDeployed {
        pub newDonator: ContractAddress,
        pub owner: ContractAddress
    }

    // *************************************************************************
    //                            EXTERNALS
    // *************************************************************************
    #[abi(embed_v0)]
    impl DonatorManagerImpl of super::IDonatorManager<ContractState> {
        fn newDonator(ref self: ContractState) {
            let mut callData = ArrayTrait::<felt252>::new();
            callData.append(get_caller_address().try_into().unwrap());

            let (newDonatorAddress, _) = deploy_syscall(
                self.donatorClassHash.read(), 12345, callData.span(), false
            )
                .unwrap();
            self.donators.write(get_caller_address().try_into().unwrap(), newDonatorAddress);
            self
                .emit(
                    DonatorContractDeployed {
                        owner: get_caller_address(), newDonator: newDonatorAddress
                    }
                )
        }
        fn getOwner(self: @ContractState) -> ContractAddress {
            return self.owner.read();
        }
        fn getDonatorClassHash(self: @ContractState) -> ClassHash {
            return self.donatorClassHash.read();
        }
        fn getDonatorByAddress(self: @ContractState, owner: ContractAddress) -> ContractAddress {
            return self.donators.read(owner);
        }
    }
}
