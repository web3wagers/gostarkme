export const fund = [
    {
      "type": "impl",
      "name": "FundImpl",
      "interface_name": "gostarkme::fund::IFund"
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
      "name": "gostarkme::fund::IFund",
      "items": [
        {
          "type": "function",
          "name": "getId",
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
          "name": "setName",
          "inputs": [
            {
              "name": "name",
              "type": "core::felt252"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "getName",
          "inputs": [],
          "outputs": [
            {
              "type": "core::felt252"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "setReason",
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
          "type": "function",
          "name": "getReason",
          "inputs": [],
          "outputs": [
            {
              "type": "core::byte_array::ByteArray"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "receiveVote",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "getUpVotes",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u32"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "setGoal",
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
          "type": "function",
          "name": "getGoal",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "receiveDonation",
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
          "type": "function",
          "name": "getCurrentGoalState",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "setState",
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
          "type": "function",
          "name": "getState",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u8"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "getVoter",
          "inputs": [],
          "outputs": [
            {
              "type": "core::integer::u32"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "withdraw",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "type": "constructor",
      "name": "constructor",
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
          "type": "core::felt252"
        },
        {
          "name": "goal",
          "type": "core::integer::u256"
        }
      ]
    },
    {
      "type": "event",
      "name": "gostarkme::fund::Fund::DonationWithdraw",
      "kind": "struct",
      "members": [
        {
          "name": "owner_address",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "fund_contract_address",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        },
        {
          "name": "withdrawn_amount",
          "type": "core::integer::u256",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "gostarkme::fund::Fund::NewVoteReceived",
      "kind": "struct",
      "members": [
        {
          "name": "voter",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "fund",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        },
        {
          "name": "votes",
          "type": "core::integer::u32",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "gostarkme::fund::Fund::Event",
      "kind": "enum",
      "variants": [
        {
          "name": "DonationWithdraw",
          "type": "gostarkme::fund::Fund::DonationWithdraw",
          "kind": "nested"
        },
        {
          "name": "NewVoteReceived",
          "type": "gostarkme::fund::Fund::NewVoteReceived",
          "kind": "nested"
        }
      ]
    }
  ]