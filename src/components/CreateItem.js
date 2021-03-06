import React, { useRef, useEffect, useState } from "react";

const CreateItem = ({
  setRefsArr,
  refsArr,
  removeAfterBlur,
  id,
  itemIndex,
  itemName,
  itemQuantity,
  itemPrice,
  singleItem,
  setSingleItem,
  setItemsList,
  itemsList,
}) => {
  const [qty, setQtx] = useState();
  const [price, setPrice] = useState();

  const itemNameRef = useRef();
  const qtyRef = useRef();
  const priceRef = useRef();
  useEffect(() => {
    setRefsArr((prevArr) => [...prevArr, [{ itemNameRef, qtyRef, priceRef }]]);
  }, []);

  function removeItem(itemTotal) {
    const storage = JSON.parse(localStorage.getItem("invoices-app"));
    let filteredObj;
    let filteredStorage;
    if (singleItem) {
      filteredObj = {
        ...singleItem,
        items: singleItem.items.filter((elem, index) => index !== itemIndex),
        total: singleItem.total - itemTotal,
      };
      filteredStorage = storage.map((elem) =>
        elem.id === singleItem.id ? filteredObj : elem
      );
      setSingleItem(filteredObj);
      localStorage.setItem("invoices-app", JSON.stringify(filteredStorage));
    }
    setItemsList(itemsList.filter((item) => item.id !== id));
    setRefsArr((prevArr) =>
      prevArr.filter((elem, index) => {
        return index !== itemIndex + 10;
      })
    );
  }

  const itemTotal = qty * price || itemQuantity * itemPrice || 0;
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
        <p className="total-price">{itemTotal}</p>
      </div>
      <div className="trash" onClick={() => removeItem(itemTotal)}>
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
