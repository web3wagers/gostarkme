// *************************************************************************
//                            STATES
// *************************************************************************
pub mod FundStates {
    pub const INNACTIVE: u8 = 0;
    pub const RECOLLECTING_VOTES: u8 = 1;
    pub const RECOLLECTING_DONATIONS: u8 = 2;
    pub const CLOSED: u8 = 3;
    pub const WITHDRAW: u8 = 4;
}
