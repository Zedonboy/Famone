import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { AlgoClient, WalletConnectClient } from "./context";
import WalletConnect from "@walletconnect/client";
import { HashRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <AlgoClient.Provider value={null}>
        <WalletConnectClient.Provider
          value={
            new WalletConnect({
              bridge: "https://bridge.walletconnect.org", // Required
              qrcodeModal: QRCodeModal,
            })
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
