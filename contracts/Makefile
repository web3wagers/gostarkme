build:
	scarb build

declare:
	starkli declare ./target/dev/gostarkme_FundManager.contract_class.json --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv

deploy:
	starkli deploy 0x00a154538458a3aa00c13ff94e30cacf715ee1d43075d74add171d7abcb38d0a --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv

new-fund:
	starkli invoke 0x0076d98b43b5ed1092dda81f2d52144e26323110ad87bd6fcf65a621409fcef6 --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json newFund 0x0388012BD4385aDf3b7afDE89774249D5179841cBaB06e9E5b4045F27B327CE8 0x5465737446756e64 0x5465737446756e64 200

declare-fund:
	starkli declare ./target/dev/gostarkme_Fund.contract_class.json --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv

deploy-fund:
	starkli deploy 0x0208e3f31ba670ba9e81826e1166844c6a476a857e0bf2e404e2c1aa41736807 0 0x0388012BD4385aDf3b7afDE89774249D5179841cBaB06e9E5b4045F27B327CE8 0x5465737446756e64 0x5465737446756e64 200 --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv\

## This hash will change if fund.cairo file is modified
## Contract address: 0x06c8a4e17165c804c4886ac679189f67273497ce31c3330bf6aae8eb28d664be