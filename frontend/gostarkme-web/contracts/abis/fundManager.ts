export const fundManager = [
  {
    "type": "impl",
    "name": "FundManagerImpl",
    "interface_name": "gostarkme::fundManager::IFundManager"
  },
  {
    "type": "struct",
    "name": "core::byte_array::ByteArray",
    "members": [
      {
        "name": "data",
        "type": "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        "name": "pending_word",
        "type": "core::felt252"
      },
      {
        "name": "pending_word_len",
        "type": "core::integer::u32"
      }
    ]
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
            "type": "core::byte_array::ByteArray"
          },
          {
            "name": "goal",
            "type": "core::integer::u256"
          },
          {
            "name": "evidence_link",
            "type": "core::byte_array::ByteArray"
          },
          {
            "name": "contact_handle",
            "type": "core::byte_array::ByteArray"
          },
          {
            "name": "reason",
            "type": "core::byte_array::ByteArray"
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
    "name": "gostarkme::fundManager::FundManager::FundDeployed",
    "kind": "struct",
    "members": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "fund_address",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "fund_id",
        "type": "core::integer::u128",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "gostarkme::fundManager::FundManager::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "FundDeployed",
        "type": "gostarkme::fundManager::FundManager::FundDeployed",
        "kind": "nested"
      }
    ]
  }
]