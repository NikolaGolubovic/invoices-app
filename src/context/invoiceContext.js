import React, { createContext, useReducer } from "react";

import { reducer } from "../reducer/mainReducer";

export const InvoiceContext = createContext();

const InvoiceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});
  const value = {
    test: "hello world",
    dispatch,
  };
  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};

export default InvoiceProvider;
