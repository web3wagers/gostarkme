use starknet::ContractAddress;
use starknet::class_hash::ClassHash;

#[starknet::interface]
pub trait IFundManager<TContractState> {
    fn newFund(ref self: TContractState, name: felt252, reason: felt252, goal: u64);
    fn getCurrentId(self: @TContractState) -> u128;
    fn getFund(self: @TContractState, id: u128) -> ContractAddress;
}

#[starknet::contract]
mod FundManager {
    // *************************************************************************
    //                            IMPORT
    // *************************************************************************
    use core::array::ArrayTrait;
    use core::traits::TryInto;
    use starknet::ContractAddress;
    use starknet::syscalls::deploy_syscall;
    use starknet::class_hash::ClassHash;
    use starknet::get_caller_address;

    // This hash will change if fund.cairo file is modified
    const FUND_CLASS_HASH: felt252 =
        0x046d36e107b9131c6c1ad0f4ffd473adcadb92c2fe10752718b8c079f95dbb0b;

    // *************************************************************************
    //                            STORAGE
    // *************************************************************************
    #[storage]
    struct Storage {
        owner: ContractAddress,
        current_id: u128,
        funds: LegacyMap::<u128, ContractAddress>,
    }

    // *************************************************************************
    //                            CONSTRUCTOR
    // *************************************************************************
    #[constructor]
    fn constructor(ref self: ContractState) {
        self.owner.write(get_caller_address());
        self.current_id.write(0);
    }

    // *************************************************************************
    //                            EXTERNALS
    // *************************************************************************
    #[abi(embed_v0)]
    impl FundManagerImpl of super::IFundManager<ContractState> {
        fn newFund(ref self: ContractState, name: felt252, reason: felt252, goal: u64) {
            let mut calldata = ArrayTrait::<felt252>::new();
            calldata.append(self.current_id.read().try_into().unwrap());
            calldata.append(get_caller_address().try_into().unwrap());
            calldata.append(name);
            calldata.append(reason);
            calldata.append(goal.try_into().unwrap());
            let (address_0, _) = deploy_syscall(
                FUND_CLASS_HASH.try_into().unwrap(), 12345, calldata.span(), false
            )
                .unwrap();
            self.funds.write(self.current_id.read(), address_0);
            self.current_id.write(self.current_id.read() + 1);
        }
        fn getCurrentId(self: @ContractState) -> u128 {
            return self.current_id.read();
        }
        fn getFund(self: @ContractState, id: u128) -> ContractAddress {
            return self.funds.read(id);
        }
    }
}
