import React from "react";

const SingleButtons = ({
  setCreateOpen,
  status,
  itemId,
  invoice,
  setInvoice,
  setModalOpen,
}) => {
  return (
    <div className="single-buttons">
      <div className="single-buttons-wrapper">
        <button className="edit-button" onClick={() => setCreateOpen(true)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => setModalOpen(true)}>
          Delete
        </button>
        {status !== "paid" && (
          <button
            className="paid-button"
            onClick={() => {
              const storage = JSON.parse(localStorage.getItem("invoices-app"));
              const objWithNewStatus = { ...invoice, status: "paid" };
              setInvoice(objWithNewStatus);
              const newStorage = storage.map((elem) =>
                elem.id === invoice.id ? objWithNewStatus : elem
              );
              localStorage.setItem("invoices-app", JSON.stringify(newStorage));
            }}
          >
            Mark as paid
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleButtons;
