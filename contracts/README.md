# Go Stark Me - Backend Setup 💻

## Steps to Run the Backend 🥳

1. **Navigate to the Contracts Directory 🔍**

   Ensure you are in the correct directory where the Cairo contracts are stored.

   ```bash
   cd gostarkme/contracts
   ```

2. **Setup your environment**

  - Scarb v2.6.5 : [here](https://docs.swmansion.com/scarb/download.html#install-via-asdf).
    ```bash
    asdf install scarb 2.6.5
    ```
    ```bash
    asdf global scarb 2.6.5
    ```
  - Starknet Foundry v0.27.0: [here](https://foundry-rs.github.io/starknet-foundry/getting-started/installation.html).
    ```bash
     asdf install starknet-foundry 0.27.0   
    ```
    ```bash
     asdf global starknet-foundry 0.27.0   
    ```
     **Setup your environment(Different option for macOS)**

    - Scarb v2.6.5 : [here](https://docs.swmansion.com/scarb/download.html#install-via-asdf).
      ```bash
      curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh -s -- -v 2.6.5
      ```
      Place it in the path:
      ```bash
      export PATH="$HOME/.local/bin:$PATH"
      ```
      It is recommended to restart the terminal.
    - Starknet Foundry v0.27.0: [here](https://foundry-rs.github.io/starknet-foundry/getting-started/installation.html).
      ```bash
      curl -L https://raw.githubusercontent.com/foundry-rs/starknet-foundry/master/scripts/install.sh | sh -s -- -v 0.27.0
      ```
      Place it in the path:
      ```bash
      echo 'export PATH="$HOME/.asdf/shims:$HOME/.asdf/bin:$PATH"' >> ~/.zshrc
      ```
      ```bash
      echo 'export PATH="$HOME/.foundry/bin:$PATH"' >> ~/.zshrc
3. **Compile Go Stark Me Backend 🛠️**

    To build the contracts, run the command:

    ```bash
    scarb build
    ```

4. **Run Go Stark Me Unit Tests ✅**

    To run the unit tests for the contracts, run the following command:

    ```bash
    scarb run test
    ```
    or
    ```bash
    snforge test
    ```

5. **Run Code Formatter 📝**

    To format your contracts, simply run the command:

    ```bash
    scarb fmt
    ```

## UML Diagram

![UML Class Diagram](https://github.com/user-attachments/assets/479c9296-e3ac-4ad3-bf79-5f458c456a45)