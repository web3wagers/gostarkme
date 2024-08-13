use starknet::ContractAddress;
use starknet::class_hash::ClassHash;

#[starknet::interface]
pub trait IFundManager<TContractState> {
    fn newFund(ref self: TContractState, owner: felt252, name: felt252, reason: felt252, goal: u64);
    fn getCurrentId(self: @TContractState) -> u128;
}

#[starknet::contract]
mod FundManager {
    use core::array::ArrayTrait;
    use core::traits::TryInto;
    use starknet::ContractAddress;
    use starknet::syscalls::deploy_syscall;
    use starknet::class_hash::ClassHash;

    const FUND_CLASS_HASH: felt252 =
        0x014f22ff46a0916c9fb2c591af82abf854fcc6141a9f422dcf2f330416fe7ef8;

    #[storage]
    struct Storage {
        currentId: u128,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        self.currentId.write(0);
    }

    #[abi(embed_v0)]
    impl FundManagerImpl of super::IFundManager<ContractState> {
        fn newFund(
            ref self: ContractState, owner: felt252, name: felt252, reason: felt252, goal: u64
        ) {
            let mut calldata = ArrayTrait::<felt252>::new();
            calldata.append(self.currentId.read().try_into().unwrap());
            calldata.append(owner);
            calldata.append(name);
            calldata.append(reason);
            calldata.append(goal.try_into().unwrap());
            let (_address_0, _) = deploy_syscall(
                FUND_CLASS_HASH.try_into().unwrap(), 12345, calldata.span(), false
            )
                .unwrap();
            self.currentId.write(self.currentId.read() + 1);
        }
        fn getCurrentId(self: @ContractState) -> u128 {
            return self.currentId.read();
        }
    }
}
