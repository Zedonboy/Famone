import { useContext, useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DHome from "./components/dashboard/Home";
import Dashboard from "./pages/Dashboard";
import InsurerPage from "./pages/Insurer";
import { ToastProvider, useToasts } from "react-toast-notifications";
import InvestorPage from "./pages/investor";
import { WalletConnectClient } from "./context";
import { useForceUpdate } from "./hooks";
import { useRecoilState } from "recoil";
import { accountAtom, connectAccountAtom } from "./utils/states";
import CreateAccountPage from "./components/dashboard/CreateAccount"

function App() {
  let connector = useContext(WalletConnectClient)
  let render = useForceUpdate()
  const [_, setConnectAcc] = useRecoilState(connectAccountAtom)
  const [_none, setAccount] = useRecoilState(accountAtom)
  useEffect(() => {
    connector?.on("connect", (err, payload) => {
      if(err) return
      const { accounts } = payload.params[0];
      setConnectAcc(accounts)
      setAccount(null)
      //render()
    })

    connector?.on("session_update", (err, payload) => {
      if(err) return
      // Get updated accounts 
      const { accounts } = payload.params[0];
      setConnectAcc(accounts)
      setAccount(null)
      //render()
    });

    connector?.on("disconnect", (err, payload) => {
      if(err) return
      setConnectAcc(null)
    });
  }, [])
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<DHome />} />
          {/* <Route path="voting" element={<InsurerPage />} /> */}
          <Route path="create_account" element={< CreateAccountPage/>} />
          {/* <Route path="proposals" element={<InvestorPage />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
