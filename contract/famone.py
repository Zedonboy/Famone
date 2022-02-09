from pyteal import *
from algosdk.v2client import algod
def approval_program():

    on_create = Seq(
        Approve()
    )

    on_call_method = Txn.application_args[0]
    invest_amt = Btoi(Txn.application_args[1])
    asset_id = Btoi(Txn.application_args[2])
    max_asset = App.localGet(Txn.accounts[1], Bytes("max_asset_fund"))
    ## isOpen = App.localGet(Txn.account[1], Bytes("is_open"))

    on_invest = Seq([
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields(
            {
                TxnField.sender: Txn.sender(),
                TxnField.receiver: Txn.accounts[1],
                TxnField.amount: invest_amt,
                TxnField.type_enum: TxnType.Payment
            }
        ),
        InnerTxnBuilder.Submit(),

        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields({
            TxnField.type_enum : TxnType.AssetTransfer,
            TxnField.xfer_asset: asset_id,
            TxnField.asset_amount: invest_amt,
            TxnField.asset_receiver: Txn.sender()
        }),
        InnerTxnBuilder.Submit(),
        Approve()
    ])

    vote_amt = Btoi(Txn.application_args[1])
    choice_asset_id = Btoi(Txn.application_args[2])
    voteCount = App.localGet(Txn.accounts[1], Bytes("vote_count"))
    on_vote = Seq([
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields({
            TxnField.type_enum: TxnType.AssetTransfer,
            TxnField.xfer_asset: choice_asset_id,
            TxnField.amount: vote_amt,
            TxnField.asset_receiver: Txn.accounts[1]
        }),

        InnerTxnBuilder.Submit(),
        App.localPut(Txn.accounts[1], Bytes("vote_count"), voteCount + Int(1)),
        Approve()
    ])

    on_register = Seq([
        App.localPut(Txn.accounts[1], Bytes("max_asset_fund"), Btoi(Txn.application_args[1])),
        ## App.localPut(Txn.sender(), Bytes("is_open"), Int(1))
        Approve()
    ])
    on_call = Cond(
        [on_call_method == Bytes("invest"), on_invest],
        [on_call_method == Bytes("vote"), on_vote],
        [on_call_method == Bytes("register"), on_register]
    )
    program = Cond(
        [Txn.application_id() == Int(0), on_create],
        [Txn.on_completion() == OnComplete.NoOp, on_call],
        [Txn.on_completion() == OnComplete.OptIn, Approve()],
        [ Txn.on_completion() == OnComplete.DeleteApplication, Approve()],
        [
            Or(
                Txn.on_completion() == OnComplete.CloseOut,
                Txn.on_completion() == OnComplete.UpdateApplication,
            ),
            Reject(),
        ],
    )

    return program

def clear_state_program():
    return Approve()

if __name__ == "__main__":
    with open("teal/famone_app_approval.teal", "w") as f:
        compiled = compileTeal(approval_program(), mode=Mode.Application, version=5)
        f.write(compiled)
    with open("teal/clear_state.teal", "w") as f:
        compiled = compileTeal(clear_state_program(), mode=Mode.Application, version=5)
        f.write(compiled)