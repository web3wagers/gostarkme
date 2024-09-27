# Go Stark Me - Backend Setup 💻

## Steps to Run the Backend 🥳

1. **Navigate to the Contracts Directory 🔍**

   Ensure you are in the correct directory where the Cairo contracts are stored.

   ```bash
   cd gostarkme/contracts

   ```

2. **Setup your environment**

To install scarb, follow the installation script provided in the scarb documentation to install the required version [here](https://docs.swmansion.com/scarb/download.html#install-via-asdf).

For this project, you're required to `install scarb v2.6.4`

By operating system:

- Linux/MacOS

  1. Install [asdf](https://docs.swmansion.com/scarb/download.html#install-via-asdf)
  2. Install [scarb](https://docs.swmansion.com/scarb/download#install-via-asdf)
  3. Verify installation by running `scarb --version`

- For Windows
  1. Install [scarb](https://docs.swmansion.com/scarb/download.html#windows)
  2. Verify installation by running `scarb --version`

3. **Compile Go Stark Me Backend 🛠️**

To build the contracts, run the command:

```bash
scarb build

```

This ensures all contracts and modules are built.

4. **Run Go Stark Me Unit Tests ✅**

To run the unit tests for the contracts, run the following command:

```bash
snforge test

```

5. **Run Code Formatter 📝**

To maintain consistency across the codebase, we use the in-built formatter that comes with Scarb.
To format your contracts, simply run the command:

```bash
scarb fmt
```

6. **Integrating a New Contract**

To add a new contract to the Go Stark Me project:

- Create the Contract:
  Add a new .cairo file under the gostarkme/contracts directory.
- Update the Manifest:
  Modify the Scarb.toml file to include the new contract:

```bash
[contracts]
new_contract = { path = "./contracts/new_contract.cairo" }
```

- Compile:

Run the compile command to ensure the new contract is included:

```bash
scarb build
```

7. **Integrating Tests for a Contract**

To add unit tests for a new contract:

- Create Test Files:

Add the test file under gostarkme/tests/. For example:

```bash
touch tests/test_new_contract.cairo
```

- Write Tests:

Include test cases relevant to the new contract.

- Run the Tests:

Run tests to ensure functionality:

```bash
snforge test

```

## UML Diagram

![UML Class Diagram](https://github.com/user-attachments/assets/479c9296-e3ac-4ad3-bf79-5f458c456a45)

9. **Code Formatting Standards**

To maintain clean and readable code:

- `Comments`: Use /// for function and logic explanations.
- `Function and Variable Names`: Use descriptive names, such as initialize_user or get_balance.
- `Indentation`: Use 4 spaces per indentation level.
- `Modular Code`: Break down complex functions into smaller parts when possible.
