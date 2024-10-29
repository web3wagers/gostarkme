export const fundManager = [
    {
      "type": "impl",
      "name": "FundManagerImpl",
      "interface_name": "gostarkme::fundManager::IFundManager"
    },
    {
      "type": "struct",
      "name": "core::integer::u256",
      "members": [
        {
          "name": "low",
          "type": "core::integer::u128"
        },
        {
          "name": "high",
          "type": "core::integer::u128"
        }
      ]
    },
    {
      "type": "interface",
      "name": "gostarkme::fundManager::IFundManager",
      "items": [
        {
          "type": "function",
          "name": "newFund",
          "inputs": [
            {
              "name": "name",
              "type": "core::felt252"
            },
            {
              "name": "goal",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "getCurrentId",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u128"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "getFund",
          "inputs": [
            {
              "name": "id",
              "type": "core::integer::u128"
            }
          ],
          "outputs": [
            {
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "getOwner",
          "inputs": [],
          "outputs": [
            {
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "getFundClassHash",
          "inputs": [],
          "outputs": [
            {
              "type": "core::starknet::class_hash::ClassHash"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "type": "constructor",
      "name": "constructor",
      "inputs": [
        {
          "name": "fund_class_hash",
          "type": "core::felt252"
        }
      ]
    },
    {
      "type": "event",
      "name": "gostarkme::fundManager::FundManager::Event",
      "kind": "enum",
      "variants": []
    }
  ]