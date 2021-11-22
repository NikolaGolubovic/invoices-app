import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./calendar.css";

import ACTIONS from "./reducer/ACTIONS";
import { InvoiceContext } from "./context/invoiceContext";

import { keepTheme } from "./utils/themes";

import Invoices from "./components/Invoices";
import SingleInvoice from "./components/SingleInvoice";
import Nav from "./components/Nav";

function App() {
  const invoiceContext = useContext(InvoiceContext);

  useEffect(() => {
    keepTheme();
  }, []);
  // const { dispatch } = invoiceContext;

  return (
    <>
      <Router>
        <div className="container">
          <Nav />
          <Routes>
            <Route path="/" element={<Invoices />} />
            <Route path="invoice/:id" element={<SingleInvoice />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
