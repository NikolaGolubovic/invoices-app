import React, { useRef } from "react";

const CreateItem = ({ item, setItemsList, itemsList, itemIndex }) => {
  const hello = useRef();
  return (
    <li className="create-item">
      <label>
        <p>Item Name</p>
        <input
          type="text"
          value={item.itemName}
          onChange={(e) =>
            setItemsList(
              itemsList.map((elem, elemIndex) => {
                return elemIndex === itemIndex
                  ? { ...elem, itemName: e.target.value }
                  : elem;
              })
            )
          }
        />
      </label>
      <label>
        <p>Qty.</p>
        <input type="text" />
      </label>
      <label>
        <p>Price</p>
        <input
          type="text"
          value={item.price}
          onChange={(e) =>
            setItemsList(
              itemsList.map((elem, elemIndex) => {
                return elemIndex === itemIndex
                  ? { ...elem, price: e.target.value }
                  : elem;
              })
            )
          }
        />
      </label>
      <div className="total">
        Total
        {item.total}
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
