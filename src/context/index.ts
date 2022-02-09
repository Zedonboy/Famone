import WalletConnect from "@walletconnect/client"
import { Algodv2 } from "algosdk"
import React from "react"

let _client : Algodv2
export const AlgoClient = React.createContext(_client)

let _walletConnec : WalletConnect
export const WalletConnectClient = React.createContext(_walletConnec)