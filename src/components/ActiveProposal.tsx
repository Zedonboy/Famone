import { memo, useContext, useEffect, useRef, useState } from "react";
import algosdk, { OnApplicationComplete, waitForConfirmation } from "algosdk";

import { AlgoClient, WalletConnectClient } from "../context";
import { APP_ID } from "../../config/config";
import { useRecoilState } from "recoil";
import {
  accountAtom,
  connectAccountAtom,
  walletAddrAtom,
} from "../utils/states";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { IProposal } from "./Proposal";
import { useToasts } from "react-toast-notifications";

function ActiveProposal(props: { data: IProposal; activeUI?: boolean }) {
  const client = useContext(AlgoClient);
  const [fundAmt, setFundAmt] = useState(0);
  const connector = useContext(WalletConnectClient);
  const [processing, setProcessing] = useState(false);
  const [connectedAcc] = useRecoilState(connectAccountAtom);
  const [account] = useRecoilState<algosdk.Account>(accountAtom);
  const [investAmt, setInvestAmt] = useState("");
  const [addr] = useRecoilState(walletAddrAtom);
  const barRef = useRef();
  let { addToast } = useToasts();
  useEffect(() => {
    let asyncFunc = async function () {
      if (!client) return;
      let info = await client.accountInformation(props.data.algo_address).do();
      let amt = parseInt(info.amount);
      setFundAmt(amt / 1000000);
      let percent = (fundAmt / props.data.fund) * 100;

      if (barRef.current) {
        //@ts-ignore
        barRef.current.style.width = `${percent}%`;
      }
    };
    asyncFunc();
  }, [processing]);
  return (
    <div className="flex flex-col rounded-lg shadow-lg relative overflow-hidden">
      <span className="rounded-full mt-3 ml-4 p-1 bg-green-200 absolute top-0 left-0 flex items-center text-xs space-x-2">
        <div className="h-2 w-2 bg-green-600 rounded-full"></div>
        <p className="text-green-600">Active</p>
      </span>
      <div className="flex-shrink-0">
        <img
          className="h-48 w-full object-cover"
          src={props?.data?.cover?.url}
          alt=""
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <a href={props?.data?.website} className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">
              {props?.data?.title}
            </p>
            <p className="mt-3 text-base text-gray-500">{props?.data?.desc}</p>
          </a>
        </div>
        <div className="w-full block">
          <p className="text-sm text-indigo-600 text-right">
            {fundAmt}/{props.data.fund}
          </p>
          <div className="rounded-full h-2 w-full bg-indigo-100 overflow-hidden">
            <div
              ref={barRef}
              className="h-full rounded-full bg-indigo-600 w-1"
            ></div>
          </div>
        </div>

        <div className="mt-6">
          <div>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* <span className="text-gray-500 sm:text-sm">$</span> */}
              </div>
              <input
                type="text"
                name="price"
                id="price"
                onChange={(e) => {
                  setInvestAmt(e.target.value);
                  //setPrice(e.target.value)
                }}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="Invest Amount"
                aria-describedby="price-currency"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  $Algos
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              setProcessing(true);
              const txnFunc = async function () {
                let enc = new TextEncoder();
                const params = await client.getTransactionParams().do();
                let txn = algosdk.makeApplicationCallTxnFromObject({
                  from: addr,
                  appIndex: APP_ID,
                  appArgs: [
                    enc.encode("invest"),
                    enc.encode(investAmt),
                    enc.encode(props.data.asset_id.toString()),
                  ],
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
                      message: `We will take ${investAmt} to invest into this condo`,
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

              txnFunc()
                .finally(() => {
                  setProcessing(false);
                })
                .catch((e) => {
                  addToast("Error Transaction was not successful", {
                    appearance: "error",
                    autoDismiss: true,
                  });
                })
                .then((r) => {
                  addToast("Success", {
                    appearance: "success",
                    autoDismiss: true,
                  });
                });
            }}
            disabled={
              processing || investAmt === "" || !connectedAcc || !account
            }
            type="button"
            className="block w-full text-center mt-4 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white disabled:bg-gray-100 disabled:text-gray-500 disabled:focus:ring-0 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Invest
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ActiveProposal);
