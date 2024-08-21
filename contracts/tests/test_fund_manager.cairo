use starknet::ContractAddress;
use starknet::class_hash::ClassHash;
use gostarkme::fundManager::{ IFundManagerDispatcher, IFundManagerDispatcherTrait };
use snforge_std::{ declare, ContractClassTrait};

fn deploy_contract(name: felt252) -> ContractAddress {
    let contract = declare(name);
    contract.deploy(@ArrayTrait::new()).unwrap()
}

#[test]
fn test_deploy_fund_manager() {    
    let contract_address = deploy_contract('FundManager');
    let dispatcher = IFundManagerDispatcher { contract_address };    

    assert_eq!(dispatcher.getCurrentId(), 0);
}