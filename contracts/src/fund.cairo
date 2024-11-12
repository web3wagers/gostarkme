use starknet::ContractAddress;

#[starknet::interface]
pub trait IFund<TContractState> {
    fn getId(self: @TContractState) -> u128;
    fn getOwner(self: @TContractState) -> ContractAddress;
    fn setName(ref self: TContractState, name: ByteArray);
    fn getName(self: @TContractState) -> ByteArray;
    fn setReason(ref self: TContractState, reason: ByteArray);
    fn getReason(self: @TContractState) -> ByteArray;
    fn receiveVote(ref self: TContractState);
    fn getUpVotes(self: @TContractState) -> u32;
    fn setGoal(ref self: TContractState, goal: u256);
    fn getGoal(self: @TContractState) -> u256;
    fn receiveDonation(ref self: TContractState, strks: u256);
    fn getCurrentGoalState(self: @TContractState) -> u256;
    fn setState(ref self: TContractState, state: u8);
    fn getState(self: @TContractState) -> u8;
    fn getVoter(self: @TContractState) -> u32;
    fn withdraw(ref self: TContractState);
    fn setEvidenceLink(ref self: TContractState, evidence: ByteArray);
    fn getEvidenceLink(self: @TContractState) -> ByteArray;
    fn setContactHandle(ref self: TContractState, contactHandle: ByteArray);
    fn getContactHandle(self: @TContractState) -> ByteArray;
}

#[starknet::contract]
pub mod Fund {
    // *************************************************************************
    //                            IMPORT
    // *************************************************************************
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use starknet::contract_address_const;
    use starknet::get_contract_address;
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use gostarkme::constants::{funds::{state_constants::FundStates},};
    use gostarkme::constants::{
        funds::{fund_constants::FundConstants, fund_manager_constants::FundManagerConstants},
    };
    use gostarkme::constants::{funds::{starknet_constants::StarknetConstants},};

    // *************************************************************************
    //                            EVENTS
    // *************************************************************************
    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        DonationWithdraw: DonationWithdraw,
        NewVoteReceived: NewVoteReceived,
        DonationReceived: DonationReceived,
    }

    #[derive(Drop, starknet::Event)]
    pub struct DonationWithdraw {
        #[key]
        pub ownerAddress: ContractAddress,
        pub fundContractAddress: ContractAddress,
        pub withdrawnAmount: u256
    }

    #[derive(Drop, starknet::Event)]
    pub struct NewVoteReceived {
        #[key]
        pub voter: ContractAddress,
        pub fund: ContractAddress,
        pub votes: u32
    }

    #[derive(Drop, starknet::Event)]
    pub struct DonationReceived {
        #[key]
        pub donatorAddress: ContractAddress,
        pub currentBalance: u256,
        pub donatedStrks: u256,
        pub fundContractAddress: ContractAddress,
    }
    // *************************************************************************
    //                            STORAGE
    // *************************************************************************
    #[storage]
    struct Storage {
        id: u128,
        owner: ContractAddress,
        name: ByteArray,
        reason: ByteArray,
        upVotes: u32,
        voters: LegacyMap::<ContractAddress, u32>,
        goal: u256,
        state: u8,
        evidenceLink: ByteArray,
        contactHandle: ByteArray
    }

    // *************************************************************************
    //                            CONSTRUCTOR
    // *************************************************************************
    #[constructor]
    fn constructor(
        ref self: ContractState,
        id: u128,
        owner: ContractAddress,
        name: ByteArray,
        goal: u256,
        evidenceLink: ByteArray,
        contactHandle: ByteArray,
        reason: ByteArray
    ) {
        self.id.write(id);
        self.owner.write(owner);
        self.name.write(name);
        self.reason.write(reason);
        self.upVotes.write(FundConstants::INITIAL_UP_VOTES);
        self.goal.write(goal);
        self.state.write(FundStates::RECOLLECTING_VOTES);
        self.evidenceLink.write(evidenceLink);
        self.contactHandle.write(contactHandle);
    }

    // *************************************************************************
    //                            EXTERNALS
    // *************************************************************************
    #[abi(embed_v0)]
    impl FundImpl of super::IFund<ContractState> {
        fn getId(self: @ContractState) -> u128 {
            return self.id.read();
        }
        fn getOwner(self: @ContractState) -> ContractAddress {
            return self.owner.read();
        }
        fn setName(ref self: ContractState, name: ByteArray) {
            let caller = get_caller_address();
            assert!(self.owner.read() == caller, "You are not the owner");
            self.name.write(name);
        }
        fn getName(self: @ContractState) -> ByteArray {
            return self.name.read();
        }
        fn setReason(ref self: ContractState, reason: ByteArray) {
            let caller = get_caller_address();
            assert!(self.owner.read() == caller, "You are not the owner");
            self.reason.write(reason);
        }
        fn getReason(self: @ContractState) -> ByteArray {
            return self.reason.read();
        }
        fn receiveVote(ref self: ContractState) {
            assert(self.voters.read(get_caller_address()) == 0, 'User already voted!');
            assert(
                self.state.read() == FundStates::RECOLLECTING_VOTES, 'Fund not recollecting votes!'
            );
            self.upVotes.write(self.upVotes.read() + 1);
            self.voters.write(get_caller_address(), self.upVotes.read());
            if self.upVotes.read() >= FundConstants::UP_VOTES_NEEDED {
                self.state.write(FundStates::RECOLLECTING_DONATIONS);
            }

            self
                .emit(
                    NewVoteReceived {
                        voter: get_caller_address(),
                        fund: get_contract_address(),
                        votes: self.upVotes.read()
                    }
                );
        }
        fn getUpVotes(self: @ContractState) -> u32 {
            return self.upVotes.read();
        }
        fn setGoal(ref self: ContractState, goal: u256) {
            let caller = get_caller_address();
            let fundManagerAddress = contract_address_const::<
                FundManagerConstants::FUND_MANAGER_ADDRESS
            >();
            assert!(fundManagerAddress == caller, "You are not the fund manager");
            self.goal.write(goal);
        }
        fn getGoal(self: @ContractState) -> u256 {
            return self.goal.read();
        }
        // TODO: implement the logic where user actually donates starks
        fn receiveDonation(ref self: ContractState, strks: u256) {
            assert(
                self.state.read() == FundStates::RECOLLECTING_DONATIONS,
                'Fund not recollecting dons!'
            );
            self
                .token_dispatcher()
                .transfer_from(get_caller_address(), get_contract_address(), strks);
            let currentBalance = self.getCurrentGoalState();
            if currentBalance >= self.goal.read() {
                self.state.write(FundStates::CLOSED);
            }

            // Emit receiveDonation event
            self
                .emit(
                    DonationReceived {
                        currentBalance,
                        donatedStrks: strks,
                        donatorAddress: get_caller_address(),
                        fundContractAddress: get_contract_address(),
                    }
                )
        }
        fn getCurrentGoalState(self: @ContractState) -> u256 {
            self.token_dispatcher().balance_of(get_contract_address())
        }
        fn setState(ref self: ContractState, state: u8) {
            self.state.write(state);
        }
        fn getState(self: @ContractState) -> u8 {
            return self.state.read();
        }
        fn getVoter(self: @ContractState) -> u32 {
            return self.voters.read(get_caller_address());
        }
        fn withdraw(ref self: ContractState) {
            // Verifications
            let caller = get_caller_address();
            assert!(self.owner.read() == caller, "You are not the owner");
            assert(self.state.read() == FundStates::CLOSED, 'Fund not close goal yet.');
            assert(
                self.getCurrentGoalState() >= self.getGoal(), 'Fund hasnt reached its goal yet'
            );
            // Withdraw
            let withdrawnAmount = self.getCurrentGoalState();
            // TODO: Calculate balance to deposit in owner address and in fund manager address (95%
            // and 5%), also transfer the amount to fund manager address.
            self.token_dispatcher().approve(self.getOwner(), withdrawnAmount);
            self.token_dispatcher().transfer(self.getOwner(), withdrawnAmount);
            assert(self.getCurrentGoalState() == 0, 'Pending stks to withdraw');
            self.setState(4);
            self
                .emit(
                    DonationWithdraw {
                        ownerAddress: self.getOwner(),
                        fundContractAddress: get_contract_address(),
                        withdrawnAmount
                    }
                );
        }
        fn setEvidenceLink(ref self: ContractState, evidence: ByteArray) {
            let caller = get_caller_address();
            assert!(self.owner.read() == caller, "You are not the owner");
            self.evidenceLink.write(evidence);
        }
        fn getEvidenceLink(self: @ContractState) -> ByteArray {
            return self.evidenceLink.read();
        }
        fn setContactHandle(ref self: ContractState, contactHandle: ByteArray) {
            let caller = get_caller_address();
            assert!(self.owner.read() == caller, "You are not the owner");
            self.contactHandle.write(contactHandle);
        }
        fn getContactHandle(self: @ContractState) -> ByteArray {
            return self.contactHandle.read();
        }
    }
    // *************************************************************************
    //                            INTERNALS
    // *************************************************************************
    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn token_dispatcher(self: @ContractState) -> IERC20Dispatcher {
            IERC20Dispatcher {
                contract_address: contract_address_const::<StarknetConstants::STRK_TOKEN_ADDRESS>()
            }
        }
    }
}
