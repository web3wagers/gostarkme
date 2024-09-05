// *************************************************************************
//                              DONATOR TEST
// *************************************************************************

use starknet::{ContractAddress, contract_address_const};

use snforge_std::{declare, ContractClassTrait};
use openzeppelin::utils::serde::SerializedAppend;

use gostarkme::fundManager::IFundManagerDispatcher;
use gostarkme::fundManager::IFundManagerDispatcherTrait;


fn _setup_() -> ContractAddress {
    let contract = declare("FundManager");
    contract.deploy(@ArrayTrait::new()).unwrap()
}

// *************************************************************************
//                              TEST
// *************************************************************************

#[test]
fn test_get_current_id(){
    let contract_address = _setup_();
    let dispatcher = IFundManagerDispatcher { contract_address };
    let current_id = dispatcher.getCurrentId();
    assert(current_id == 0, 'Not the current ID');
}