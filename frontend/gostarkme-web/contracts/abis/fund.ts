export const fundAbi = [
  {
    "name": "FundImpl",
    "type": "impl",
    "interface_name": "gostarkme::fund::IFund"
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
    "name": "gostarkme::fund::IFund",
    "type": "interface",
    "items": [
      {
        "name": "get_id",
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
        "name": "set_name",
        "type": "function",
        "inputs": [
          {
            "name": "name",
            "type": "core::byte_array::ByteArray"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_name",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "set_reason",
        "type": "function",
        "inputs": [
          {
            "name": "reason",
            "type": "core::byte_array::ByteArray"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_reason",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "receive_vote",
        "type": "function",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_up_votes",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u32"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "set_goal",
        "type": "function",
        "inputs": [
          {
            "name": "goal",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_goal",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "update_receive_donation",
        "type": "function",
        "inputs": [
          {
            "name": "strks",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_current_goal_state",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "set_state",
        "type": "function",
        "inputs": [
          {
            "name": "state",
            "type": "core::integer::u8"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_state",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u8"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_voter",
        "type": "function",
        "inputs": [
          {
            "name": "user",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u32"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "withdraw",
        "type": "function",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "set_evidence_link",
        "type": "function",
        "inputs": [
          {
            "name": "evidence",
            "type": "core::byte_array::ByteArray"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_evidence_link",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "set_contact_handle",
        "type": "function",
        "inputs": [
          {
            "name": "contact_handle",
            "type": "core::byte_array::ByteArray"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_contact_handle",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "set_type",
        "type": "function",
        "inputs": [
          {
            "name": "fund_type",
            "type": "core::integer::u8"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_type",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u8"
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
        "name": "id",
        "type": "core::integer::u128"
      },
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
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
    ]
  },
  {
    "kind": "struct",
    "name": "gostarkme::fund::Fund::DonationWithdraw",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "owner_address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "fund_contract_address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "withdrawn_amount",
        "type": "core::integer::u256"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "gostarkme::fund::Fund::NewVoteReceived",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "voter",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "fund",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "votes",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "gostarkme::fund::Fund::DonationReceived",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "donator_address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "data",
        "name": "current_balance",
        "type": "core::integer::u256"
      },
      {
        "kind": "data",
        "name": "donated_strks",
        "type": "core::integer::u256"
      },
      {
        "kind": "data",
        "name": "fund_contract_address",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "gostarkme::fund::Fund::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "DonationWithdraw",
        "type": "gostarkme::fund::Fund::DonationWithdraw"
      },
      {
        "kind": "nested",
        "name": "NewVoteReceived",
        "type": "gostarkme::fund::Fund::NewVoteReceived"
      },
      {
        "kind": "nested",
        "name": "DonationReceived",
        "type": "gostarkme::fund::Fund::DonationReceived"
      }
    ]
  }
]