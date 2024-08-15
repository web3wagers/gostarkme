use starknet::ContractAddress;
use starknet::class_hash::ClassHash;

#[starknet::interface]
pub trait IDonatorManager<TContractState> {
    fn newDonator(ref self: TContractState, owner: ContractAddress);
    fn getDonatorByAddress(ref self: TContractState, owner: ContractAddress) -> ContractAddress;
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
        0x00490122dc655dede662de63e2a507f218bcd1f0ce72cf6578396b2bba3c1835;

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
        fn newDonator(ref self: TContractState, owner: ContractAddress) {
            let mut calldata = ArrayTrait::<felt252>::new();

            calldata.append(get_caller_address().try_into().unwrap());

            let (address_0, _) = deploy_syscall(
                DONATOR_CLASS_HASH.try_into().unwrap(), 12345, calldata.span(), false
            )
                .unwrap();
            self.donators.write(get_caller_address().try_into().unwrap(), address_0);
        }
        fn getDonatorByAddress(
            ref self: TContractState, owner: ContractAddress
        ) -> ContractAddress {
            return self.donators.read(owner);
        }
    }
}
