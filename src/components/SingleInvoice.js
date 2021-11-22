import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SingleButtons from "./SingleButtons";
import ArrowLeft from "./svg/ArrowLeft";
import ModalConfirm from "./ModalConfirm";

import { makeDate } from "../helpers/functions";
import Create from "./Create";

const SingleInvoice = () => {
  const [invoice, setInvoice] = useState({});
  const params = useParams();
  const [createOpen, setCreateOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const storage = JSON.parse(localStorage.getItem("invoices-app"));
  const itemsTitles = ["Item Name", "QTY.", "Price", "Total"];
  useEffect(() => {
    setInvoice(storage.filter((elem) => elem.id === params.id)[0]);
  }, []);
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
    <div style={{ color: "white" }} className="single-container">
      <aside>
        <Create
          createOpen={createOpen}
          setCreateOpen={setCreateOpen}
          singleItem={invoice}
          setSingleItem={setInvoice}
          itemId={invoice.id}
          itemStatus={invoice.status}
          edit={true}
        />
      </aside>
      <div className="single-invoice">
        <div className="go-back">
          <ArrowLeft /> <Link to="/">Go back</Link>
        </div>
        <div className="single-status">
          <p>Status</p>
          <div
            className="status-button single"
            style={setStatusBackground(invoice)}
          >
            <div
              className="status-circle"
              style={setStatusBackground(invoice, true)}
            ></div>
            <p style={setStatusColor(invoice)}>{invoice.status}</p>
          </div>
          <div className="single-buttons-top">
            <SingleButtons
              setCreateOpen={setCreateOpen}
              status={invoice.status}
              itemId={invoice.id}
              invoice={invoice}
              setInvoice={setInvoice}
              setModalOpen={setModalOpen}
            />
          </div>
        </div>
        <div className="single-card">
          <div className="single-id-container">
            <p className="single-id">#{invoice.id}</p>
            <p>{invoice.clientName}</p>
          </div>
          <div className="sender-address">
            <p>{invoice.senderAddress?.street}</p>
            <p>{invoice.senderAddress?.city}</p>
            <p>{invoice.senderAddress?.postCode}</p>
            <p>{invoice.senderAddress?.country}</p>
          </div>
          <div className="date-due-container">
            <div className="date-to">
              <p>Invoice Date</p>
              <h4>{makeDate(invoice.createdAt)}</h4>
            </div>
            <div className="date-to">
              <p>Payment Due</p>
              <h4>{makeDate(invoice.paymentDue)}</h4>
            </div>
          </div>
          <div className="client-location">
            <p>Bill To</p>
            <h2>{invoice.clientName}</h2>
            <p>{invoice.clientAddress?.street}</p>
            <p>{invoice.clientAddress?.city}</p>
            <p>{invoice.clientAddress?.postCode}</p>
            <p>{invoice.clientAddress?.country}</p>
          </div>

          <div className="recepient-mail">
            <p className="rm-desc">Sent to</p>
            <p className="rm-email">{invoice.clientEmail}</p>
          </div>
          <div className="items-sum">
            <div className="item-info item-title">
              <div className="item-info-name">
                <p>{itemsTitles[0]}</p>
              </div>
              <div className="item-info-quantity">
                <p>{itemsTitles[1]}</p>
              </div>
              <div>
                <p>{itemsTitles[2]}</p>
              </div>
              <div className="item-info-total">
                <p>{itemsTitles[3]}</p>
              </div>
            </div>

            <div className="items-infos-all">
              {invoice.items?.map((item, index) => {
                return (
                  <div className="item-info item-properties" key={index}>
                    <div className="item-info-name">
                      <p>{item.name}</p>
                    </div>
                    <div className="item-info-quantity">
                      <p>{item.quantity}</p>
                    </div>
                    <div className="item-info-price">
                      <p>£{item.price}</p>
                    </div>
                    <div className="item-info-total">
                      <p>£{item.total}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="amount-due">
              <p>Amount Due</p>
              <p>£{invoice.total}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="single-buttons-footer">
        <SingleButtons
          setCreateOpen={setCreateOpen}
          status={invoice.status}
          itemId={invoice.id}
          invoice={invoice}
          setInvoice={setInvoice}
          setModalOpen={setModalOpen}
        />
      </div>
      <ModalConfirm
        modalOpen={modalOpen}
        invoiceId={invoice.id}
        setModalOpen={setModalOpen}
      />
    </div>
  );
};

export default SingleInvoice;
