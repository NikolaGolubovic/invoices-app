import React, { useEffect, useContext } from "react";
import "./App.css";

import Logo from "./components/svg/Logo";
import Sun from "./components/svg/Sun";

import ACTIONS from "./reducer/ACTIONS";
import { InvoiceContext } from "./context/invoiceContext";

import { keepTheme } from "./utils/themes";

import Toggle from "./components/Toggle";
import Invoices from "./components/Invoices";

function App() {
  const invoiceContext = useContext(InvoiceContext);

  useEffect(() => {
    keepTheme();
  }, []);
  // const { dispatch } = invoiceContext;

  return (
    <div className="container">
      <nav>
        <Logo />
        <Toggle />
      </nav>
      <Invoices />
    </div>
  );
}

export default App;
