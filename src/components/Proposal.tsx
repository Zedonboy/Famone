import { memo, useContext, useEffect, useState } from "react";
import algosdk, { OnApplicationComplete, waitForConfirmation } from "algosdk";
import { AlgoClient, WalletConnectClient } from "../context";
import { APP_ID, CHOICE_ASSET_ID } from "../../config/config";
import { useRecoilState } from "recoil";
import { accountAtom, connectAccountAtom, walletAddrAtom } from "../utils/states";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import {useToasts} from "react-toast-notifications"
export interface IProposal {
  cover: any;
  website: string;
  title: string;
  desc: string;
  fund: number;
  algo_address: string;
  asset_id: number
}

function Proposal(props: { data: IProposal }) {
  const client = useContext(AlgoClient);
  const [voteAmt, setVote] = useState("")
  const [connectedAcc] = useRecoilState(connectAccountAtom);
  const [account] = useRecoilState<algosdk.Account>(accountAtom);
  const [addr] = useRecoilState(walletAddrAtom)
  const connector = useContext(WalletConnectClient);
  const [processing, setProcessing] = useState(false);
  const {addToast} = useToasts()

  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0">
        <img
          className="h-48 w-full object-cover"
          src={props?.data?.cover?.url}
          alt=""
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            ${props?.data?.fund}
          </p>
          <a href={props?.data?.website} className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">
              {props?.data?.title}
            </p>
            <p className="mt-3 text-base text-gray-500">{props?.data?.desc}</p>
          </a>
        </div>
        <div className="mt-6">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Choice Vote Amount
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* <span className="text-gray-500 sm:text-sm">$</span> */}
              </div>
              <input
                type="text"
                name="price"
                id="price"
                value={"100"}
                onChange={(e) => {
                  setVote(e.target.value)
                }}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                aria-describedby="price-currency"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  $Choice
                </span>
              </div>
            </div>
          </div>

          <button
           onClick={e => {
             setProcessing(true)
            const txnFunc = async function () {
              let enc = new TextEncoder();
              const params = await client.getTransactionParams().do();
              let txn = algosdk.makeApplicationCallTxnFromObject({
                from: addr,
                appIndex: APP_ID,
                appArgs: [enc.encode("vote"), enc.encode(voteAmt), enc.encode(CHOICE_ASSET_ID.toString())],
                onComplete: OnApplicationComplete.NoOpOC,
                suggestedParams: params,
                accounts: [props.data.algo_address],
              });
              if (connectedAcc && connector.connected) {
                let txns = [txn];
                let txnsToSign = txns.map((txn) => {
                  const encodedTxn = Buffer.from(
                    algosdk.encodeUnsignedTransaction(txn)
                  ).toString("base64");

                  return {
                    txn: encodedTxn,
                    message: "Vote"
                    // Note: if the transaction does not need to be signed (because it's part of an atomic group
                    // that will be signed by another party), specify an empty singers array like so:
                    // signers: [],
                  };
                });

                const requestParams = [txnsToSign];
                const request = formatJsonRpcRequest(
                  "algo_signTxn",
                  requestParams
                );
                const result: Array<string | null> =
                  await this.connector.sendCustomRequest(request);
              }

              if (account) {
                let signedTxn = txn.signTxn(account.sk);
                let { txId } = await client
                  .sendRawTransaction(signedTxn)
                  .do();
                await waitForConfirmation(client, txId, 4);
              }
            };

            txnFunc().finally(() => {
              setProcessing(false)
            }).catch(e => {
              addToast("Error Transaction was not successful", {
                appearance: "error",
                autoDismiss: true
              })
            }).then(r => {
              addToast("Success", {
                appearance: "success",
                autoDismiss: true
              })
            })
           }}
           disabled={processing || voteAmt === "" || (!connectedAcc || !account)}
            type="button"
            className="block w-full text-center mt-4 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white disabled:bg-gray-200 disabled:text-gray-600 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(Proposal);