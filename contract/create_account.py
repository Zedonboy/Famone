from algosdk import account
from algosdk import mnemonic
if __name__ == "__main__":
    private_key, public_address = account.generate_account()
    print("Base64 Private Key: {}\nPublic Algorand Address: {}\n".format(private_key, public_address))
    print("Mnemonic: ", mnemonic.from_private_key(private_key))