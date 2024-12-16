export const fundManager = [
  {
    "name": "FundManagerImpl",
    "type": "impl",
    "interface_name": "gostarkme::fund_manager::IFundManager"
  },
  {
    "name": "core::byte_array::ByteArray",
    "type": "struct",
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
    "name": "core::integer::u256",
    "type": "struct",
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
    "name": "gostarkme::fund_manager::IFundManager",
    "type": "interface",
    "items": [
      {
        "name": "new_fund",
        "type": "function",
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
          },
          {
            "name": "fund_type",
            "type": "core::integer::u8"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_current_id",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_fund",
        "type": "function",
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
        "name": "get_owner",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_fund_class_hash",
        "type": "function",
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
    "name": "constructor",
    "type": "constructor",
    "inputs": [
      {
        "name": "fund_class_hash",
        "type": "core::felt252"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "gostarkme::fund_manager::FundManager::FundDeployed",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "fund_address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "fund_id",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "gostarkme::fund_manager::FundManager::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "FundDeployed",
        "type": "gostarkme::fund_manager::FundManager::FundDeployed"
      }
    ]
  }
]