import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { AlgoClient, WalletConnectClient } from "./context";
//import WalletConnect from "@walletconnect/browser";
import { HashRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import algosdk from "algosdk";
//import QRCodeModal from "algorand-walletconnect-qrcode-modal";
// import AlgodClient from "algosdk/dist/types/src/client/v2/algod/algod";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <AlgoClient.Provider value={
        new algosdk.Algodv2({
          'X-API-Key': 'OGKyWzuveD7K0pEzegBu12PMwLe7SfV154aBTF8o'
       }, "https://testnet-algorand.api.purestake.io/ps2")
      }>
        <WalletConnectClient.Provider
          value={
           null
          }
        >
          <HashRouter>
            <ToastProvider>
              <App />
            </ToastProvider>
          </HashRouter>
        </WalletConnectClient.Provider>
      </AlgoClient.Provider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
