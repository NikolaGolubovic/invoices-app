import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import CreateItem from "./CreateItem";

const Create = () => {
  const [date, changeDate] = useState(new Date());
  const [itemsList, setItemsList] = useState([]);
  const [refsArr, setRefsArr] = useState([]);
  const [terms, setTerms] = useState(1);
  // const [valid, setValid] = useState(true);
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

  function checkInputs() {
    let valid = true;
    // check validation
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
    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
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

    // if (!valid) return;
    console.log("valid", valid);
    // create new element for base
    function randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function fourRandomLetters() {
      let str = "";
      for (var i = 0; i < 4; i++) {
        str += String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
      return str;
    }
    let newElement = {
      id: `${randomIntFromInterval(1000, 9999)}${fourRandomLetters()}`,
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
    };
    console.log(newElement);
  }
  return (
    <div className="create">
      <div className="bill-from">
        <p>Bill From</p>
        <div className="bill-from">
          <label htmlFor="">
            Street Address
            <input type="text" ref={fromAddress} />
          </label>
          <label htmlFor="">
            City <input type="text" ref={fromCity} />
          </label>
          <label htmlFor="">
            Post Code <input type="text" ref={fromPC} />
          </label>
          <label htmlFor="">
            Country <input type="text" ref={fromCountry} />
          </label>
        </div>
      </div>
      <div className="bill-to">
        <p>Bill To</p>
        <label htmlFor="">
          Client's Name
          <input type="text" ref={toCName} />
        </label>
        <label htmlFor="">
          Client's Email
          <input type="email" ref={toCEmail} />
        </label>
        <label htmlFor="">
          Street Address <input type="text" ref={toAddress} />
        </label>

        <label htmlFor="">
          City <input type="text" ref={toCity} />
        </label>
        <label htmlFor="">
          Post Code <input type="text" ref={toPC} />
        </label>
        <label htmlFor="">
          Country <input type="text" ref={toCountry} />
        </label>
        <div className="calendar">
          <p>Invoice Date</p>
          <Calendar onChange={changeDate} value={date} calendarType="Hebrew" />
        </div>
        <div className="create-terms">
          <select name="" id="" onChange={(e) => setTerms(e.target.value)}>
            <option value="1">Net 1 Day</option>
            <option value="7">Net 7 Day</option>
            <option value="14">Net 14 Day</option>
            <option value="30">Net 30 Day</option>
          </select>
        </div>
        <div className="create-descrption">
          <label htmlFor="">
            <p>Description</p>
            <input
              type="text"
              placeholder="e.g. Graphic Design Service"
              ref={desc}
            />
          </label>
        </div>
      </div>

      <div className="item-list">
        <h2>Item List</h2>
        <ul>
          {itemsList.map((item, itemIndex) => {
            return <CreateItem setRefsArr={setRefsArr} refsArr={refsArr} />;
          })}
        </ul>
        <button
          onClick={() => {
            setItemsList([...itemsList, {}]);
          }}
        >
          + Add New Item
        </button>
      </div>
      <div className="buttons">
        <button>Discord</button>
        <button>Save Draft</button>
        <button onClick={() => checkInputs()}>Save & Send</button>
      </div>
    </div>
  );
};

export default Create;
