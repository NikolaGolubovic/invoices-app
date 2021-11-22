import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import CreateItem from "./CreateItem";
import IconDate from "./svg/IconDate";

import { makeDate } from "../helpers/functions";

const Create = ({ invoices, setInvoices, createOpen, setCreateOpen }) => {
  const [date, changeDate] = useState(new Date());
  const [itemsList, setItemsList] = useState([]);
  const [refsArr, setRefsArr] = useState([]);
  const [terms, setTerms] = useState(1);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const fromAddress = useRef("hello world");
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

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function checkInputs() {
    let valid = true;
    const refsKeys = [];
    for (let key of refsArr) {
      refsKeys.push(...Object.keys(key));
    }
    refsArr.flat().forEach((elem) => {
      const refKey = Object.keys(elem)[0];
      if (elem[refKey].current.value.length === 0) {
        valid = false;
        elem[refKey].current.classList.add("invalid");
      } else {
        elem[refKey].current.classList.remove("invalid");
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
      console.log("item must be added");
    }

    if (!valid) return;

    // create new element for base
    function randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function twoRandomLetters() {
      let str = "";
      for (var i = 0; i < 2; i++) {
        str += String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
      return str;
    }
    let newElement = {
      id: `${twoRandomLetters()}${randomIntFromInterval(1000, 9999)}`,
      createdAt: date
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-"),
      paymentDue: new Date(date.setDate(date.getDate() + Number(terms)))
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("-"),
      description: desc.current.value,
      paymentTerms: terms,
      clientName: toCName.current.value,
      clientEmail: toCEmail.current.value,
      status: "pending",
      senderAddress: {
        street: fromAddress.current.value,
        city: fromCity.current.value,
        postCode: fromPC.current.value,
        country: fromCountry.current.value,
      },
      clientAddress: {
        street: toAddress.current.value,
        city: toCity.current.value,
        postCode: toPC.current.value,
        country: toCountry.current.value,
      },
      items: refsArr.slice(10).map((elemArr) => {
        const elem = elemArr[0];
        console.log(elem);
        return {
          name: elem.itemNameRef.current.value,
          quantity: +elem.qtyRef.current.value,
          price: +elem.priceRef.current.value,
          total: elem.qtyRef.current.value * elem.priceRef.current.value,
        };
      }),
      total: refsArr
        .slice(10)
        .flat()
        .map((elem) => {
          return {
            total: elem.qtyRef.current.value * elem.priceRef.current.value,
          };
        })
        .reduce((prev, next) => prev + next.total, 0),
    };
    const storageArr = JSON.parse(localStorage.getItem("invoices-app"));
    storageArr.unshift(newElement);
    setInvoices([newElement, ...invoices]);
    localStorage.setItem("invoices-app", JSON.stringify(storageArr));
  }
  function removeAfterBlur(e) {
    if (e.target.type === "email") {
      if (validateEmail(e.target.value)) {
        e.target.classList.remove("invalid");
      } else {
        e.target.classList.add("invalid");
      }
    } else {
      if (e.target.value.length > 0) {
        e.target.classList.remove("invalid");
      } else {
        e.target.classList.add("invalid");
      }
    }
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
            <input type="text" ref={fromAddress} onBlur={removeAfterBlur} />
          </label>
          <div className="bill-from-location">
            <label className="bill-from-city">
              City <input type="text" ref={fromCity} onBlur={removeAfterBlur} />
            </label>
            <label className="bill-from-post">
              Post Code{" "}
              <input type="text" ref={fromPC} onBlur={removeAfterBlur} />
            </label>
            <label className="bill-from-country">
              Country{" "}
              <input type="text" ref={fromCountry} onBlur={removeAfterBlur} />
            </label>
          </div>
        </div>
        <div className="bill-to">
          <p className="bill-to-title">Bill To</p>
          <label htmlFor="">
            Client's Name
            <input type="text" ref={toCName} onBlur={removeAfterBlur} />
          </label>
          <label htmlFor="">
            Client's Email
            <input type="email" ref={toCEmail} onBlur={removeAfterBlur} />
          </label>
          <label htmlFor="">
            Street Address{" "}
            <input type="text" ref={toAddress} onBlur={removeAfterBlur} />
          </label>
          <div className="bill-from-location">
            <label htmlFor="">
              City <input type="text" ref={toCity} onBlur={removeAfterBlur} />
            </label>
            <label htmlFor="">
              Post Code{" "}
              <input type="text" ref={toPC} onBlur={removeAfterBlur} />
            </label>
            <label htmlFor="">
              Country{" "}
              <input type="text" ref={toCountry} onBlur={removeAfterBlur} />
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
              <option value="1">Net 1 Day</option>
              <option value="7">Net 7 Day</option>
              <option value="14">Net 14 Day</option>
              <option value="30">Net 30 Day</option>
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
                />
              );
            })}
          </ul>
          <button
            onClick={() => {
              setItemsList([...itemsList, { id: itemsList.length + 1 }]);
            }}
            className="btn-create-item"
          >
            + Add New Item
          </button>
        </div>
        <div className="buttons-controller">
          <div className="btn-discard-cont">
            <button
              className="btn-discard"
              onClick={() => setCreateOpen(false)}
            >
              Discard
            </button>
          </div>
          <div className="draft-save-cont">
            <button className="btn-draft">Save Draft</button>
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
