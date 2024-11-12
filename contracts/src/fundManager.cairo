use starknet::ContractAddress;
use starknet::class_hash::ClassHash;

#[starknet::interface]
pub trait IFundManager<TContractState> {
    fn newFund(
        ref self: TContractState,
        name: ByteArray,
        goal: u256,
        evidence_link: ByteArray,
        contact_handle: ByteArray,
        reason: ByteArray
    );
    fn getCurrentId(self: @TContractState) -> u128;
    fn getFund(self: @TContractState, id: u128) -> ContractAddress;
    fn getOwner(self: @TContractState) -> ContractAddress;
    fn getFundClassHash(self: @TContractState) -> ClassHash;
}

#[starknet::contract]
pub mod FundManager {
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
    use gostarkme::constants::{funds::{fund_constants::FundConstants},};


    // ***************************************************************************************
    //                            STORAGE
    // ***************************************************************************************
    #[storage]
    struct Storage {
        owner: ContractAddress,
        currentId: u128,
        funds: LegacyMap::<u128, ContractAddress>,
        fundClassHash: ClassHash,
    }

    // ***************************************************************************************
    //                            CONSTRUCTOR
    // ***************************************************************************************
    #[constructor]
    fn constructor(ref self: ContractState, fundClassHash: felt252) {
        self.owner.write(get_caller_address());
        self.fundClassHash.write(fundClassHash.try_into().unwrap());
        self.currentId.write(1);
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

    #[abi(embed_v0)]
    impl FundManagerImpl of super::IFundManager<ContractState> {
        fn newFund(
            ref self: ContractState,
            name: ByteArray,
            goal: u256,
            evidence_link: ByteArray,
            contact_handle: ByteArray,
            reason: ByteArray,
        ) {
            assert(goal >= FundConstants::MINIMUM_GOAL, 'Goal must be at least 500');
            let mut callData: Array<felt252> = array![];
            Serde::serialize(@self.currentId.read(), ref callData);
            Serde::serialize(@get_caller_address(), ref callData);
            Serde::serialize(@name, ref callData);
            Serde::serialize(@goal, ref callData);
            Serde::serialize(@evidence_link, ref callData);
            Serde::serialize(@contact_handle, ref callData);
            Serde::serialize(@reason, ref callData);
            let (new_fund_address, _) = deploy_syscall(
                self.fundClassHash.read(), 12345, callData.span(), false
            )
                .unwrap();

            self.funds.write(self.currentId.read(), new_fund_address);
            self
                .emit(
                    FundDeployed {
                        owner: get_caller_address(),
                        fund_address: new_fund_address,
                        fund_id: self.currentId.read()
                    }
                );

            self.currentId.write(self.currentId.read() + 1);
        }
        fn getCurrentId(self: @ContractState) -> u128 {
            return self.currentId.read();
        }
        fn getFund(self: @ContractState, id: u128) -> ContractAddress {
            return self.funds.read(id);
        }
        fn getOwner(self: @ContractState) -> ContractAddress {
            return self.owner.read();
        }
        fn getFundClassHash(self: @ContractState) -> ClassHash {
            return self.fundClassHash.read();
        }
    }
}
