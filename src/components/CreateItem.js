import React, { useRef, useEffect, useState } from "react";

const CreateItem = ({ setRefsArr, refsArr }) => {
  const [qty, setQtx] = useState();
  const [price, setPrice] = useState();
  const itemNameRef = useRef();
  const qtyRef = useRef();
  const priceRef = useRef();
  useEffect(() => {
    setRefsArr([
      ...refsArr,
      [
        { [`itemNameRef-${refsArr.length}`]: itemNameRef },
        { [`qtyRef-${refsArr.length}`]: qtyRef },
        { [`priceRef-${refsArr.length}`]: priceRef },
      ],
    ]);
  }, []);

  return (
    <li className="create-item">
      <label>
        <p>Item Name</p>
        <input type="text" ref={itemNameRef} />
      </label>
      <label>
        <p>Qty.</p>
        <input
          type="number"
          ref={qtyRef}
          min="0"
          onChange={(e) => setQtx(e.target.value)}
        />
      </label>
      <label>
        <p>Price</p>
        <input
          type="number"
          ref={priceRef}
          min="0"
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <div className="total">
        Total
        {qty * price || 0}
      </div>
      <div className="trash">
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
