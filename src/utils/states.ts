import { atom } from "recoil";

export const accountAtom = atom({
  default: null,
  key: "algo_account",
});

export const connectAccountAtom = atom({
  default: null,
  key: "connected_algo_account"
})

export const walletAddrAtom = atom({
  default: null,
  key: "wallet_address"
})