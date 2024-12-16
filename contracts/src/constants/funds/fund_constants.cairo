// *************************************************************************
//                              FUND CONSTANTS
// *************************************************************************
pub mod FundConstants {
    pub const UP_VOTES_NEEDED: u32 = 50;
    pub const INITIAL_UP_VOTES: u32 = 0;
    pub const INITIAL_GOAL: u256 = 0;
    pub const MINIMUM_GOAL: u256 = 500;
}
// *************************************************************************
//                              FUND TYPES CONSTANTS
// *************************************************************************
pub mod FundTypeConstants {
    pub const PROJECT: u8 = 1;
    pub const CHARITY: u8 = 2;
}
// *************************************************************************
//                            FUND STATES CONSTANTS
// *************************************************************************
pub mod FundStates {
    pub const INNACTIVE: u8 = 0;
    pub const RECOLLECTING_VOTES: u8 = 1;
    pub const RECOLLECTING_DONATIONS: u8 = 2;
    pub const CLOSED: u8 = 3;
    pub const WITHDRAW: u8 = 4;
}
