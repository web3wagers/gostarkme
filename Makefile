build:
	scarb build

declare:
	starkli declare ./target/dev/gostarkme_FundManager.contract_class.json --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv

deploy:
	starkli deploy 0x0062e4e39c99e0a9159c2daefa68eeeba023a48593b2123f68a890c033fd59aa --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv

new-fund:
	starkli invoke 0x0076d98b43b5ed1092dda81f2d52144e26323110ad87bd6fcf65a621409fcef6 --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json newFund 0x0388012BD4385aDf3b7afDE89774249D5179841cBaB06e9E5b4045F27B327CE8 0x5465737446756e64 0x5465737446756e64 200

declare-fund:
	starkli declare ./target/dev/gostarkme_Fund.contract_class.json --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv

deploy-fund:
	starkli deploy 0x014f22ff46a0916c9fb2c591af82abf854fcc6141a9f422dcf2f330416fe7ef8 0 0x0388012BD4385aDf3b7afDE89774249D5179841cBaB06e9E5b4045F27B327CE8 0x5465737446756e64 0x5465737446756e64 200 --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv