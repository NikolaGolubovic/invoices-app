import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Create from "../components/Create";
import ArrowRight from "./svg/ArrowRight";
import ArrowDown from "./svg/ArrowDown";

import { upDataFromLocal } from "../utils/storageFunctions";
import {
  makeDate,
  numberWithCommas,
  setStatusBackground,
  setStatusColor,
} from "../helpers/functions";
import Plus from "./svg/Plus";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [pano, setPano] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [check, setCheck] = useState("");
  useEffect(() => {
    upDataFromLocal(setInvoices);
  }, []);
  useEffect(() => {
    if (!check) {
      upDataFromLocal(setInvoices);
    } else {
      const storage = JSON.parse(localStorage.getItem("invoices-app"));
      setInvoices(storage.filter((invoice) => invoice.status === check));
    }
  }, [check]);
  useEffect(() => {});
  function checkStatus(e) {
    return check === e.target.value ? setCheck("") : setCheck(e.target.value);
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
              <p className="filter-title">
                Filter <span>by status</span>
              </p>
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
                  onChange={checkStatus}
                  value="paid"
                  checked={check === "paid"}
                />
                Paid
              </label>
              <label htmlFor="">
                <input
                  type="checkbox"
                  onChange={checkStatus}
                  value="pending"
                  checked={check === "pending"}
                />
                Pending
              </label>
              <label htmlFor="">
                <input
                  type="checkbox"
                  onChange={checkStatus}
                  value="draft"
                  checked={check === "draft"}
                />
                Draft
              </label>
            </div>
          </div>
          <div className="invoices-controller-add">
            <button
              className="btn-new-invoice"
              onClick={() => setCreateOpen(true)}
            >
              <span>
                <Plus />
              </span>
              New <div className="btn-span">Invoice</div>
            </button>
          </div>
        </div>

        <div className="cards">
          {invoices.map((invoice, index) => {
            return (
              <Link
                to={`/invoice/${invoice.id}`}
                className="invoice-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                key={invoice.id}
              >
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
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Invoices;
