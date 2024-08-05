build:
	scarb build

declare-fund:
	starkli declare ./target/dev/gostarkme_Fund.contract_class.json --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv

# To deploy your contract: 
deploy-fund:
	starkli deploy 0x0578465019014d28c47efa047f966c04901dd4e37a6ffad1c2710228b18d9e0c 0xc3798d303a3d0Cbff6f78015c20cf06221c6FF36 0x5465737446756e64 0x5465737446756e64 80 --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv

declare-manage:
	starkli declare ./target/dev/gostarkme_FundManager.contract_class.json --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv

deploy-manage:
	starkli deploy 0x0688947acb9c29f3dbb6fdb426215b7bd8c263f8ce5bd9ec051242d708f4a827 --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv
