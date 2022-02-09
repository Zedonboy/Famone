//@ts-nocheck
import { useState } from "react";
import {useToasts} from "react-toast-notifications"
import algosdk, { OnApplicationComplete, waitForConfirmation } from "algosdk/dist/esm/index"
import { useRecoilState } from "recoil";
import { accountAtom } from "../utils/states";
import AlgodClient from "algosdk/dist/types/src/client/v2/algod/algod";
import { APP_ID } from "../../config/config";
export default function InsurerPage() {
  const {addToast} = useToasts()
  const [price, setPrice] = useState("")
  const [account, _] = useRecoilState<algosdk.Account>(accountAtom)
  
  return (
    <section className="flex justify-center py-6 px-2 md:px-6">
      <div className="md:w-1/2 w-full flex flex-col space-y-8 items-center bg-white shadow p-8">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="price"
              id="price"
              value={price}
              onChange={e => {
                setPrice(e.target.value)
              }}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
              aria-describedby="price-currency"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm" id="price-currency">
                USD
              </span>
            </div>
          </div>
        </div>

        <button
        onClick={async e => {
          let client : AlgodClient
          const param = await client.getTransactionParams().do()
          const enc = new TextEncoder()
          let txn = algosdk.makeApplicationCallTxnFromObject({
            from: account.addr,
            onComplete: OnApplicationComplete.NoOpOC,
            appIndex: APP_ID,
            appArgs: [enc.encode("insurer"), enc.encode(price)],
            suggestedParams:param
          })
          let signedTxn = txn.signTxn(account.sk)
          const {txId} = await client.sendRawTransaction(signedTxn).do()
          waitForConfirmation(client, "", 4).then(e => {
            addToast('Succesfully An Insurer', { appearance: 'success' });
          })
        }}
        type="button"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Stake
      </button>
      </div>
    </section>
  );
}
