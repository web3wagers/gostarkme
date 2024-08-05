#[starknet::interface]
pub trait IFundManager<TContractState> {
    fn newFund(ref self: TContractState);
    fn getCurrentId(self: @TContractState) -> u128;
}

#[starknet::contract]
mod FundManager {
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
        fn newFund(ref self: ContractState) {
            self.currentId.write(self.currentId.read() + 1);
        }
        fn getCurrentId(self: @ContractState) -> u128 {
            return self.currentId.read();
        }
    }
}
