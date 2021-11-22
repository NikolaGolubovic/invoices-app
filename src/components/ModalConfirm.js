import React, { useState } from "react";
import ReactDOM from "react-dom";
import Loading from "./svg/Loading";
import { useNavigate } from "react-router-dom";

const ModalConfirm = ({ modalOpen, setModalOpen, invoiceId }) => {
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();
  if (!modalOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="loader" style={{ display: loader ? "block" : "none" }}>
        <Loading />
      </div>
      <div className="modal" style={{ display: !loader ? "block" : "none" }}>
        <h1>Confirm Deletion</h1>
        <p>
          Are you sure you want to delete invoice {invoiceId}? This action can
          not be undone.
        </p>
        <div className="modal-buttons">
          <button className="modal-cancel" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
          <button
            className="modal-delete"
            onClick={() => {
              const storage = JSON.parse(localStorage.getItem("invoices-app"));
              const newStorage = storage.filter(
                (elem) => elem.id !== invoiceId
              );
              localStorage.setItem("invoices-app", JSON.stringify(newStorage));
              setLoader(true);
              setTimeout(() => {
                setModalOpen(false);
                setLoader(false);
                navigate("/");
              }, 400);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default ModalConfirm;
