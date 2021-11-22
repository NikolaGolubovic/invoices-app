import React, { useRef, useEffect, useState } from "react";

const CreateItem = ({
  setRefsArr,
  refsArr,
  removeAfterBlur,
  itemsList,
  setItemsList,
  id,
  itemIndex,
  itemName,
  itemQuantity,
  itemPrice,
  singleItem,
  setSingleItem,
}) => {
  const [qty, setQtx] = useState();
  const [price, setPrice] = useState();
  const itemNameRef = useRef();
  const qtyRef = useRef();
  const priceRef = useRef();
  useEffect(() => {
    console.log("items List", itemsList, "single Item", singleItem);
    setRefsArr([...refsArr, [{ itemNameRef, qtyRef, priceRef }]]);
  }, []);

  function removeItem() {
    const storage = JSON.parse(localStorage.getItem("invoices-app"));
    var filteredObj = {
      ...singleItem,
      items: singleItem.items.filter((elem, index) => index !== itemIndex),
    };
    let filteredStorage = storage.map((elem) =>
      elem.id === singleItem.id ? filteredObj : elem
    );
    setItemsList(itemsList.filter((item) => item.id !== id));
    setRefsArr(refsArr.filter((elem, index) => index !== itemIndex + 10));
    setSingleItem(filteredObj);
    localStorage.setItem("invoices-app", JSON.stringify(filteredStorage));
  }

  return (
    <li className="create-item">
      <label className="create-item-name">
        <p>Item Name</p>
        <input
          type="text"
          ref={itemNameRef}
          onBlur={removeAfterBlur}
          defaultValue={itemName}
        />
      </label>
      <label className="create-item-qty">
        <p>Qty.</p>
        <input
          type="number"
          ref={qtyRef}
          min="0"
          onChange={(e) => setQtx(e.target.value)}
          onBlur={removeAfterBlur}
          defaultValue={itemQuantity}
          required
        />
      </label>
      <label className="create-item-price">
        <p>Price</p>
        <input
          type="number"
          ref={priceRef}
          min="0"
          onChange={(e) => setPrice(e.target.value)}
          onBlur={removeAfterBlur}
          defaultValue={itemPrice}
          required
        />
      </label>
      <div className="total">
        <p className="total-title">Total</p>
        <p className="total-price">
          {qty * price || itemQuantity * itemPrice || 0}
        </p>
      </div>
      <div className="trash" onClick={removeItem}>
        <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
            fill="#888EB0"
            fillRule="nonzero"
          />
        </svg>
      </div>
    </li>
  );
};

export default CreateItem;
