import React, { useState, useEffect } from "react";
import Create from "../components/Create";
import ArrowRight from "./svg/ArrowRight";
import ArrowDown from "./svg/ArrowDown";

import { upDataFromLocal } from "../utils/storageFunctions";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [pano, setPano] = useState(false);
  useEffect(() => {
    upDataFromLocal(setInvoices);
  }, []);
  return (
    <div className="invoices-container">
      <aside>
        <Create />
      </aside>
      <main className="invoices-controller">
        <div className="invoices-controller-desc">
          <h2>Invoices</h2>
          <p>There are {invoices.length} total invoices.</p>
        </div>
        <div className="filter">
          <div className="filter-status" onClick={() => setPano(!pano)}>
            <p>Filter By Status</p>

            <span>
              <ArrowDown pano={pano} />
            </span>
          </div>
          <div
            className={pano ? "filter-checkboxes.active" : "filter-checkboxes"}
          >
            <label htmlFor="">
              <input type="checkbox" />
              Paid
            </label>
            <label htmlFor="">
              <input type="checkbox" />
              Pending
            </label>
            <label htmlFor="">
              <input type="checkbox" />
              Draft
            </label>
          </div>
        </div>
        <div className="invoices-controller-add">
          <button>New Invoice</button>
        </div>
      </main>
      <hr />
      <div className="invoice-card">
        {invoices.map((invoice) => {
          return (
            <div key={invoice.id}>
              <div className="invoice-id">
                <p>#{invoice.id}</p>
              </div>
              <div className="invoice-due">
                <p>{invoice.paymentDue}</p>
              </div>
              <div className="invoice-name">
                <p>{invoice.clientName}</p>
              </div>
              <div className="invoice-total">
                <p>{invoice.total}</p>
              </div>
              <div className="invoice-status">{invoice.status}</div>
              <ArrowRight />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Invoices;
