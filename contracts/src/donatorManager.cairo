use starknet::ContractAddress;
use starknet::class_hash::ClassHash;

#[starknet::interface]
pub trait IDonatorManager<TContractState> {
    fn newDonator(ref self: TContractState);
    fn getDonatorByAddress(self: @TContractState, owner: ContractAddress) -> ContractAddress;
}

#[starknet::contract]
mod DonatorManager {
    // *************************************************************************
    //                            IMPORT
    // *************************************************************************
    use core::array::ArrayTrait;
    use core::traits::TryInto;
    use starknet::ContractAddress;
    use starknet::syscalls::deploy_syscall;
    use starknet::class_hash::ClassHash;
    use starknet::get_caller_address;

    // This hash will change if donator.cairo file is modified
    const DONATOR_CLASS_HASH: felt252 =
        0x03ddcb5ac2ecf82627887217de833132e7252b146cce03a6e38374fc9b6d61b2;

    // *************************************************************************
    //                            STORAGE
    // *************************************************************************
    #[storage]
    struct Storage {
        owner: ContractAddress,
        donators: LegacyMap::<ContractAddress, ContractAddress>,
    }

    // *************************************************************************
    //                            CONSTRUCTOR
    // *************************************************************************
    #[constructor]
    fn constructor(ref self: ContractState) {
        self.owner.write(get_caller_address());
    }

    // *************************************************************************
    //                            EXTERNALS
    // *************************************************************************
    #[abi(embed_v0)]
    impl DonatorManagerImpl of super::IDonatorManager<ContractState> {
        fn newDonator(ref self: ContractState) {
            let mut calldata = ArrayTrait::<felt252>::new();

            calldata.append(get_caller_address().try_into().unwrap());

            let (address_0, _) = deploy_syscall(
                DONATOR_CLASS_HASH.try_into().unwrap(), 12345, calldata.span(), false
            )
                .unwrap();
            self.donators.write(get_caller_address().try_into().unwrap(), address_0);
        }
        fn getDonatorByAddress(self: @ContractState, owner: ContractAddress) -> ContractAddress {
            return self.donators.read(owner);
        }
    }
}
