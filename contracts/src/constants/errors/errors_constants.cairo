// *************************************************************************
//                            ERRORS
// *************************************************************************
pub mod Errors {
    pub const INVALID_OWNER: felt252 = 'GoStarkMe: Caller is not owner!';
    pub const ALREADY_VOTED: felt252 = 'GoStarkMe: User already voted!';
    pub const FUND_CLOSE_VOTES: felt252 = 'GoStarkMe: Fund not recollecting votes!';
    pub const FUND_CLOSE_DONS: felt252 = 'GoStarkMe: Fund not recollecting dons!';
}
