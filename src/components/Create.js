import React, { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import CreateItem from "./CreateItem";

const Create = () => {
  const [value, onChange] = useState(new Date());
  const [itemsList, setItemsList] = useState([]);
  const [refsArr, setRefsArr] = useState([]);
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
      fromAddress,
      fromCity,
      fromPC,
      fromCountry,
      toCName,
      toAddress,
      toCity,
      toPC,
      toCountry,
      desc,
    ]);
  }, []);

  function checkInputs() {
    refsArr.forEach((elem) => {
      if (elem.current.value.length === 0) {
        elem.current.classList.add("invalid");
      } else {
        elem.current.classList.remove("invalid");
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
      toCEmail.current.classList.add("invalid");
    } else {
      toCEmail.current.classList.remove("invalid");
    }
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
          <Calendar onChange={onChange} value={value} calendarType="Hebrew" />
        </div>
        <div className="create-terms">
          <select name="" id="">
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
            return (
              <CreateItem
                item={item}
                itemIndex={itemIndex}
                itemsList={itemsList}
                setItemsList={setItemsList}
                setRefsArr={setRefsArr}
                refsArr={refsArr}
                key={itemIndex}
              />
            );
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
