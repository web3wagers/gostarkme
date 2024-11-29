build:
	scarb build

declare:
	starkli declare ./target/dev/gostarkme_FundManager.contract_class.json --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv

deploy:
	starkli deploy 0x04652dc5b0d79659cfb92c13d3b3bbdbcbd8f480afedbed7d90834e3e14c4260 --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv 0x034773a6a6d5f9ee24c44aa99455e9e8a95d2ff13362e4038f2577c00a7c7ed5

new-fund:
	starkli invoke 0x0076d98b43b5ed1092dda81f2d52144e26323110ad87bd6fcf65a621409fcef6 --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json newFund 0x0388012BD4385aDf3b7afDE89774249D5179841cBaB06e9E5b4045F27B327CE8 0x5465737446756e64 0x5465737446756e64 200

declare-fund:
	starkli declare ./target/dev/gostarkme_Fund.contract_class.json --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv

deploy-fund:
	starkli deploy 0x0208e3f31ba670ba9e81826e1166844c6a476a857e0bf2e404e2c1aa41736807 0 0x0388012BD4385aDf3b7afDE89774249D5179841cBaB06e9E5b4045F27B327CE8 0x5465737446756e64 0x5465737446756e64 200 --keystore ~/.starkli-wallets/deployer/keystore_2.json --account ~/.starkli-wallets/accounts/account_2.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/2qi3kpZwfw6DlnjQmzL8vUh5PlqZ0Dpv\

## This hash will change if fund.cairo file is modified
## Contract address: 0x06c8a4e17165c804c4886ac679189f67273497ce31c3330bf6aae8eb28d664be
declare-donator-manager:
	starkli declare ./target/dev/gostarkme_DonatorManager.contract_class.json --keystore ~/.starkli-wallets/deployer/my_keystore.json --account ~/.starkli-wallets/accounts/my_account.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/GG9Q64Cz4Bn1P5OY2ZIspDMSsdf_Pdl5
deploy-donator-manager:
	starkli deploy 0x062f476523071a4562e769981b7c3919cd980a5bf4305a42d6825706550910d9 --keystore ~/.starkli-wallets/deployer/my_keystore.json --account ~/.starkli-wallets/accounts/my_account.json --rpc https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/GG9Q64Cz4Bn1P5OY2ZIspDMSsdf_Pdl5
