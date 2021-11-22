export function upDataFromLocal(setInvoices) {
  const storage = JSON.parse(localStorage.getItem("invoices-app"));
  if (!storage) {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        setInvoices(data);
        localStorage.setItem("invoices-app", JSON.stringify(data));
      });
  } else {
    setInvoices(storage);
  }
}
