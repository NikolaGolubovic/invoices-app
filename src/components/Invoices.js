import React, { useState, useEffect } from "react";
import Create from "../components/Create";
import ArrowRight from "./svg/ArrowRight";
import ArrowDown from "./svg/ArrowDown";

import { upDataFromLocal } from "../utils/storageFunctions";
import { makeDate } from "../helpers/functions";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [pano, setPano] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  useEffect(() => {
    upDataFromLocal(setInvoices);
  }, []);
  useEffect(() => {});
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function setStatusBackground(invoice, opacity = false) {
    const backOpacity = {
      background:
        invoice.status === "paid"
          ? "var(--green-light)"
          : invoice.status === "pending"
          ? "var(--yellow-light)"
          : "var(--color-draft-light)",
    };
    const back = {
      background:
        invoice.status === "paid"
          ? "var(--green)"
          : invoice.status === "pending"
          ? "var(--yellow)"
          : "var(--color-draft)",
    };
    return opacity ? back : backOpacity;
  }
  function setStatusColor(invoice) {
    const text = {
      color:
        invoice.status === "paid"
          ? "var(--green)"
          : invoice.status === "pending"
          ? "var(--yellow)"
          : "var(--color-text)",
    };
    return text;
  }
  return (
    <div className="invoices-container">
      <aside>
        <Create
          invoices={invoices}
          setInvoices={setInvoices}
          createOpen={createOpen}
          setCreateOpen={setCreateOpen}
        />
      </aside>
      <main
        className="invoices-table"
        style={{ overflowY: createOpen && "hidden" }}
      >
        <div className="invoices-controller">
          <div className="invoices-controller-desc">
            <h2>Invoices</h2>
            <p>There are {invoices.length} total invoices.</p>
          </div>
          <div className="filter">
            <div className="filter-status" onClick={() => setPano(!pano)}>
              <p>Filter by status</p>
              <span>
                <ArrowDown pano={pano} />
              </span>
            </div>
            <div
              className={
                pano ? "filter-checkboxes active" : "filter-checkboxes"
              }
            >
              <label htmlFor="">
                <input
                  type="checkbox"
                  onChange={(e) => console.log(e.target)}
                />
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
            <button
              className="btn-new-invoice"
              onClick={() => setCreateOpen(true)}
            >
              <span>+</span>New Invoice
            </button>
          </div>
        </div>

        <div className="cards">
          {invoices.map((invoice) => {
            return (
              <div className="invoice-card" key={invoice.id}>
                <div className="invoice-id">
                  <p>#{invoice.id}</p>
                </div>
                <div className="invoice-due">
                  <p>Due {makeDate(invoice.paymentDue)}</p>
                </div>
                <div className="invoice-name">
                  <p>{invoice.clientName}</p>
                </div>
                <div className="invoice-total">
                  <p>£{numberWithCommas(invoice.total)}</p>
                </div>
                <div className="invoice-status">
                  <div
                    className="status-button"
                    style={setStatusBackground(invoice)}
                  >
                    <div
                      className="status-circle"
                      style={setStatusBackground(invoice, true)}
                    ></div>
                    <p style={setStatusColor(invoice)}>{invoice.status}</p>
                  </div>
                </div>
                <div className="invoice-right-icon">
                  <ArrowRight />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Invoices;
