import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import CreateItem from "./CreateItem";
import IconDate from "./svg/IconDate";

import {
  makeDate,
  validateEmail,
  removeAfterBlur,
  createInvoice,
} from "../helpers/functions";

const Create = ({
  invoices,
  setInvoices,
  createOpen,
  setCreateOpen,
  singleItem,
  setSingleItem,
  itemId,
  itemStatus,
  edit,
}) => {
  const [date, changeDate] = useState(new Date());
  const [itemsList, setItemsList] = useState([]);
  const [refsArr, setRefsArr] = useState([]);
  const [terms, setTerms] = useState(1);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [itemError, setItemError] = useState(false);

  const fromAddress = useRef();
  const fromCity = useRef();
  const fromPC = useRef();
  const fromCountry = useRef();
  const toCName = useRef();
  const toCEmail = useRef();
  const toAddress = useRef();
  const toCity = useRef();
  const toPC = useRef();
  const toCountry = useRef();
  const desc = useRef();

  useEffect(() => {
    setRefsArr([
      { fromAddress },
      { fromCity },
      { fromPC },
      { fromCountry },
      { toCName },
      { toAddress },
      { toCity },
      { toPC },
      { toCountry },
      { desc },
    ]);
  }, []);

  useEffect(() => {
    document.addEventListener("click", function (event) {
      if (
        !event.target.matches(".react-calendar") &&
        !event.target.matches(".btn-date p") &&
        !event.target.matches(".btn-date") &&
        !event.target.matches(".calendar-icon") &&
        !event.target.matches(".calendar-path")
      ) {
        setCalendarOpen(false);
      }
      if (event.target.matches(".wrapper-create")) {
        setCreateOpen(false);
      }
    });
  }, []);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("invoices-app"));
    // console.log( storage.filter((elem) => singleItem.id === elem.id)[0].items);
    if (singleItem?.items?.length > 0) {
      console.log(
        "update items list",
        singleItem.items.map((elem, index) => {
          return { ...elem, id: index + 1 };
        })
      );
      setItemsList(
        singleItem.items.map((elem, index) => {
          return { ...elem, id: index + 1 };
        })
      );
    }
    if (singleItem?.createdAt) {
      changeDate(new Date(singleItem.createdAt));
    }
    if (singleItem?.paymentTerms) {
      setTerms(singleItem.paymentTerms);
    }
  }, [singleItem]);

  function checkInputs() {
    let valid = true;
    if (itemsList.length > 0) {
      setItemError(false);
    }
    const refsKeys = [];
    for (let key of refsArr) {
      refsKeys.push(...Object.keys(key));
    }
    refsArr.flat().forEach((elem) => {
      const refKey = Object.keys(elem); // ["toCity"], ["desc"], ["itemNameRef", "qtyRef", "priceRef"], ["itemNameRef", "qtyRef", "priceRef"]
      console.log("refsArr REFSARR", refsArr);
      for (let key of refKey) {
        console.log("TEST", key, refKey, elem);
        console.log("elem[key]", elem[key]);
        console.log("elem[key].current", elem[key].current);
        console.log("elem[key].current.value", elem[key].current.value);
        // key je toCity, desc, qtyRef, priceRef
        // refKey je ["toCity"], ["desc"], ["itemNameRef", "qtyRef", "priceRef"], ["itemNameRef", "qtyRef", "priceRef"]
        // elem je {toCity: {...}}, {desc: {...}}, {itemNameRef: {...}, qtyRef: {...}, priceRef: {...}}, {itemNameRef: {...}, qtyRef: {...}, priceRef: {...}},

        if (
          elem[key].current.value.length === 0 ||
          elem[key].current.value === 0
        ) {
          console.log(elem[key].current);
          valid = false;
          elem[key].current.classList.add("invalid");
        } else {
          if (elem[key].current.classList.contains("invalid")) {
            elem[key].current.classList.remove("invalid");
          }
        }
      }
    });
    if (
      !validateEmail(toCEmail.current.value) ||
      toCEmail.current.value.length === 0
    ) {
      valid = false;
      toCEmail.current.classList.add("invalid");
    } else {
      toCEmail.current.classList.remove("invalid");
    }

    if (refsArr.length <= 10) {
      setItemError(true);
      return;
    }

    if (!valid) return;

    createInvoice(
      setSingleItem,
      date,
      terms,
      desc,
      toCName,
      toCEmail,
      fromAddress,
      fromCity,
      fromPC,
      fromCountry,
      toAddress,
      toCity,
      toPC,
      toCountry,
      refsArr,
      setInvoices,
      invoices,
      "pending",
      itemId
    );
    setCreateOpen(false);
  }
  return (
    <div className={createOpen ? "wrapper-create active" : "wrapper-create"}>
      <div className={createOpen ? "create active" : "create"}>
        <div className="create-title">
          <h1>Create Invoice</h1>
        </div>
        <div className="bill-from">
          <p className="bill-from-title">Bill From</p>
          <label className="bill-from-street">
            Street Address
            <input
              type="text"
              ref={fromAddress}
              onBlur={removeAfterBlur}
              defaultValue={singleItem?.senderAddress?.street || ""}
            />
          </label>
          <div className="bill-from-location">
            <label className="bill-from-city">
              City{" "}
              <input
                type="text"
                ref={fromCity}
                onBlur={removeAfterBlur}
                defaultValue={singleItem?.senderAddress?.city || ""}
              />
            </label>
            <label className="bill-from-post">
              Post Code{" "}
              <input
                type="text"
                ref={fromPC}
                onBlur={removeAfterBlur}
                defaultValue={singleItem?.senderAddress?.postCode || ""}
              />
            </label>
            <label className="bill-from-country">
              Country{" "}
              <input
                type="text"
                ref={fromCountry}
                onBlur={removeAfterBlur}
                defaultValue={singleItem?.senderAddress?.country || ""}
              />
            </label>
          </div>
        </div>
        <div className="bill-to">
          <p className="bill-to-title">Bill To</p>
          <label htmlFor="">
            Client's Name
            <input
              type="text"
              ref={toCName}
              onBlur={removeAfterBlur}
              defaultValue={singleItem?.clientName || ""}
            />
          </label>
          <label htmlFor="">
            Client's Email
            <input
              type="email"
              ref={toCEmail}
              onBlur={removeAfterBlur}
              defaultValue={singleItem?.clientEmail || ""}
            />
          </label>
          <label htmlFor="">
            Street Address{" "}
            <input
              type="text"
              ref={toAddress}
              onBlur={removeAfterBlur}
              defaultValue={singleItem?.clientAddress?.street || ""}
            />
          </label>
          <div className="bill-from-location">
            <label htmlFor="">
              City{" "}
              <input
                type="text"
                ref={toCity}
                onBlur={removeAfterBlur}
                defaultValue={singleItem?.clientAddress?.city || ""}
              />
            </label>
            <label htmlFor="">
              Post Code{" "}
              <input
                type="text"
                ref={toPC}
                onBlur={removeAfterBlur}
                defaultValue={singleItem?.clientAddress?.postCode || ""}
              />
            </label>
            <label htmlFor="">
              Country{" "}
              <input
                type="text"
                ref={toCountry}
                onBlur={removeAfterBlur}
                defaultValue={singleItem?.clientAddress?.country || ""}
              />
            </label>
          </div>
          <div className="loner-date">
            <p>Invoice Date</p>
          </div>
          <div className="calendar-terms">
            <div
              className="calendar-container"
              onClick={() => setCalendarOpen(!calendarOpen)}
            >
              <button className="btn-date">
                <p>{makeDate(date)}</p> <IconDate />
              </button>
              <div
                className="calendar-wrapper"
                onClick={(e) => {
                  if (e.currentTarget === e.target) {
                    setCalendarOpen(false);
                  }
                }}
                style={{ display: calendarOpen ? "block" : "none" }}
              >
                <Calendar
                  onChange={changeDate}
                  value={date}
                  calendarType="Hebrew"
                />
              </div>
            </div>

            <select
              className="select-term"
              name=""
              id=""
              onChange={(e) => setTerms(e.target.value)}
            >
              <option value="1" selected={terms === "1" && "selected"}>
                Net 1 Day
              </option>
              <option value="7" selected={terms === 7 && "selected"}>
                Net 7 Day
              </option>
              <option value="14" selected={terms === "14" && "selected"}>
                Net 14 Day
              </option>
              <option value="30" selected={terms === "30" && "selected"}>
                Net 30 Day
              </option>
            </select>
          </div>
          <div className="create-descrption">
            <label>
              <p>Description</p>
              <input
                type="text"
                placeholder="e.g. Graphic Design Service"
                ref={desc}
                onBlur={removeAfterBlur}
                defaultValue={singleItem?.description || ""}
              />
            </label>
          </div>
        </div>

        <div className="item-list">
          <h3>ItemList</h3>
          <ul>
            {itemsList.map((item, itemIndex) => {
              return (
                <CreateItem
                  key={item.id}
                  setRefsArr={setRefsArr}
                  refsArr={refsArr}
                  removeAfterBlur={removeAfterBlur}
                  itemsList={itemsList}
                  setItemsList={setItemsList}
                  id={item.id}
                  itemIndex={itemIndex}
                  itemName={item.name}
                  itemQuantity={item.quantity}
                  itemPrice={item.price}
                  itemTotal={item.total}
                  singleItem={singleItem}
                  setSingleItem={setSingleItem}
                />
              );
            })}
          </ul>
          <button
            onClick={() => {
              console.log("from button", { id: itemsList.length + 1 });
              setItemsList([...itemsList, { id: itemsList.length + 1 }]);
            }}
            className="btn-create-item"
          >
            + Add New Item
          </button>
          <p
            className="error-msg"
            style={{ display: itemError ? "block" : "none" }}
          >
            An Item must be added
          </p>
        </div>
        <div
          className="buttons-controller"
          style={{ justifyContent: edit && "flex-end" }}
        >
          <div className="btn-discard-cont" style={{ display: edit && "none" }}>
            <button
              className="btn-discard"
              onClick={() => setCreateOpen(false)}
            >
              Discard
            </button>
          </div>
          <div className="draft-save-cont">
            <button
              style={{ display: edit && "none" }}
              className="btn-draft"
              onClick={() => {
                createInvoice(
                  setSingleItem,
                  date,
                  terms,
                  desc,
                  toCName,
                  toCEmail,
                  fromAddress,
                  fromCity,
                  fromPC,
                  fromCountry,
                  toAddress,
                  toCity,
                  toPC,
                  toCountry,
                  refsArr,
                  setInvoices,
                  invoices,
                  "draft"
                );
                setCreateOpen(false);
              }}
            >
              Save Draft
            </button>
            <button
              className="delete-button"
              style={{ display: !edit && "none" }}
              onClick={() => setCreateOpen(false)}
            >
              Cancel
            </button>
            <button className="btn-save" onClick={() => checkInputs()}>
              Save & Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
