Demo of securely sending Ethereum wallet address to server.
This repository is for showing how to sending wallet addresses from clients to a server by proving their owners and preventing front loading.

# Communication flow
0. A client sends its wallet address to the server.
1. The server issues JWT token for the address and return it to the client. The JWT token is signed with secret and it has expiration datetime in it.
2. The client sends the token back with the signature signed with the private key of its Ethereum wallet.
3. The server verifies the returned JWT and makes sure that JWT is valid.
4. The server checks the signature and recover the wallet address.
5. Depending on use cases, the server handles the wallet address. e.g. Stores the address and relate it with a user account.
