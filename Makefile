build:
	scarb build

declare:
	starkli declare ./target/dev/gostarkme_Fund.contract_class.json --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv

# To deploy your contract: 
deploy:
	starkli deploy 0x063f7dfbada11099b747a37415e03dec23df3b0beea82ac272930c94e08c47a8 0 0xc3798d303a3d0Cbff6f78015c20cf06221c6FF36 0x5465737446756e64 0x5465737446756e64 80 --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv

# 0x5465737446756e64
