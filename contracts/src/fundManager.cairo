use starknet::ContractAddress;
use starknet::class_hash::ClassHash;

#[starknet::interface]
pub trait IFundManager<TContractState> {
    fn newFund(ref self: TContractState, name: felt252, goal: u64);
    fn getCurrentId(self: @TContractState) -> u128;
    fn getFund(self: @TContractState, id: u128) -> ContractAddress;
    fn getOwner(self: @TContractState) -> ContractAddress;
    fn getFundClassHash(self: @TContractState) -> ClassHash;
}

#[starknet::contract]
mod FundManager {
    // *************************
    //                            IMPORT
    // *************************
    use core::array::ArrayTrait;
    use core::traits::TryInto;
    use starknet::ContractAddress;
    use starknet::syscalls::deploy_syscall;
    use starknet::class_hash::ClassHash;
    use starknet::get_caller_address;

    // *************************
    //                            STORAGE
    // *************************
    #[storage]
    struct Storage {
        owner: ContractAddress,
        current_id: u128,
        funds: LegacyMap::<u128, ContractAddress>,
        fund_class_hash: ClassHash,
    }

    // *************************
    //                            CONSTRUCTOR
    // *************************
    #[constructor]
    fn constructor(ref self: ContractState, fund_class_hash: felt252) {
        self.owner.write(get_caller_address());
        self.fund_class_hash.write(fund_class_hash.try_into().unwrap());
        self.current_id.write(0);
    }

    // *************************
    //                            EXTERNALS
    // *************************
    #[abi(embed_v0)]
    impl FundManagerImpl of super::IFundManager<ContractState> {
        fn newFund(ref self: ContractState, name: felt252, goal: u64) {
            let mut calldata = ArrayTrait::<felt252>::new();
            calldata.append(self.current_id.read().try_into().unwrap());
            calldata.append(get_caller_address().try_into().unwrap());
            calldata.append(name);
            calldata.append(goal.try_into().unwrap());
            let (address_0, _) = deploy_syscall(
                self.fund_class_hash.read(), 12345, calldata.span(), false
            )
                .unwrap();
            self.current_id.write(self.current_id.read() + 1);
            self.funds.write(self.current_id.read(), address_0);
        }
        fn getCurrentId(self: @ContractState) -> u128 {
            return self.current_id.read();
        }
        fn getFund(self: @ContractState, id: u128) -> ContractAddress {
            return self.funds.read(id);
        }
        fn getOwner(self: @ContractState) -> ContractAddress {
            return self.owner.read();
        }
        fn getFundClassHash(self: @ContractState) -> ClassHash {
            return self.fund_class_hash.read();
        }
    }
}