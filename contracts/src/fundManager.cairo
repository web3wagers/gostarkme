use starknet::ContractAddress;
use starknet::class_hash::ClassHash;

#[starknet::interface]
pub trait IFundManager<TContractState> {
    fn newFund(ref self: TContractState, name: felt252, goal: u256);
    fn getCurrentId(self: @TContractState) -> u128;
    fn getFund(self: @TContractState, id: u128) -> ContractAddress;
    fn getOwner(self: @TContractState) -> ContractAddress;
    fn getFundClassHash(self: @TContractState) -> ClassHash;
}

#[starknet::contract]
mod FundManager {
    // ***************************************************************************************
    //                            IMPORT
    // ***************************************************************************************
    use core::array::ArrayTrait;
    use core::traits::TryInto;
    use starknet::ContractAddress;
    use starknet::syscalls::deploy_syscall;
    use starknet::class_hash::ClassHash;
    use starknet::get_caller_address;
    use openzeppelin::utils::serde::SerializedAppend;


    // ***************************************************************************************
    //                            STORAGE
    // ***************************************************************************************
    #[storage]
    struct Storage {
        owner: ContractAddress,
        current_id: u128,
        funds: LegacyMap::<u128, ContractAddress>,
        fund_class_hash: ClassHash,
    }

    // ***************************************************************************************
    //                            CONSTRUCTOR
    // ***************************************************************************************
    #[constructor]
    fn constructor(ref self: ContractState, fund_class_hash: felt252) {
        self.owner.write(get_caller_address());
        self.fund_class_hash.write(fund_class_hash.try_into().unwrap());
        self.current_id.write(1);
    }


    // ***************************************************************************************
    //                            EVENTS
    // ***************************************************************************************
    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        FundDeployed: FundDeployed,
    }

    #[derive(Drop, starknet::Event)]
    pub struct FundDeployed {
        #[key]
        pub owner: ContractAddress,
        pub fund_address: ContractAddress,
        pub fund_id: u128,
    }


    // ***************************************************************************************
    //                            EXTERNALS
    // ***************************************************************************************

    //new constant
const MINIMUM_GOAL: u256 = 500_u256;


    #[abi(embed_v0)]
    impl FundManagerImpl of super::IFundManager<ContractState> {
        fn newFund(ref self: ContractState, name: felt252, goal: u256) {

            assert(goal >= MINIMUM_GOAL, "Goal must be at least 500");

            let mut call_data: Array<felt252> = array![];
            Serde::serialize(@self.current_id.read(), ref call_data);
            Serde::serialize(@get_caller_address(), ref call_data);
            Serde::serialize(@name, ref call_data);
            Serde::serialize(@goal, ref call_data);
            let (new_fund_address, _) = deploy_syscall(
                self.fund_class_hash.read(), 12345, call_data.span(), false
            )
                .unwrap();

            self.funds.write(self.current_id.read(), new_fund_address);
            self
                .emit(
                    FundDeployed {
                        owner: get_caller_address(),
                        fund_address: new_fund_address,
                        fund_id: self.current_id.read()
                    }
                );

            self.current_id.write(self.current_id.read() + 1);
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
