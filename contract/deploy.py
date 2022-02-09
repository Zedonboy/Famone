from algosdk.v2client import algod
from algosdk.future import transaction
from algosdk import mnemonic
from algosdk import account
import base64
phrase = "pear devote another profit figure call devote misery extend whip fame bounce buzz bar lucky install dial improve public earn pistol snow frog about snap"

algod_token = 'OGKyWzuveD7K0pEzegBu12PMwLe7SfV154aBTF8o'
algod_address = 'https://testnet-algorand.api.purestake.io/ps2'
purestake_token = {'X-Api-key': algod_token}

if __name__ == "__main__":
    private_key = mnemonic.to_private_key(phrase)
    sender = account.address_from_private_key(private_key)
    client = algod.AlgodClient(algod_token, algod_address, headers=purestake_token)
    data = open("teal/famone_app_approval.teal", 'r').read()
    clearData = open("teal/clear_state.teal", 'r').read()
    response = client.compile(data)
    clearAppResp = client.compile(clearData)

    approval_program = base64.b64decode(response['result'])
    clear_program = base64.b64decode(clearAppResp['result'])
    params = client.suggested_params()

    local_schema = transaction.StateSchema(1,1)
    global_schema = transaction.StateSchema(0, 0)
    txn = transaction.ApplicationCreateTxn(sender, params, transaction.OnComplete.NoOpOC.real, approval_program, clear_program, global_schema, local_schema)
    signedTxn = txn.sign(private_key)
    tx_id = signedTxn.transaction.get_txid()
    client.send_transactions([signedTxn])
    transaction.wait_for_confirmation(client, tx_id)
    tx_response = client.pending_transaction_info(tx_id)
    app_id = tx_response['application-index']

    print("Created new app-id: ",app_id)