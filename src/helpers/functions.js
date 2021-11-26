export function makeDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function setStatusBackground(invoice, opacity = false) {
  const backOpacity = {
    background:
      invoice.status === "paid"
        ? "var(--green-light)"
        : invoice.status === "pending"
        ? "var(--yellow-light)"
        : "var(--color-draft-light)",
  };
  const back = {
    background:
      invoice.status === "paid"
        ? "var(--green)"
        : invoice.status === "pending"
        ? "var(--yellow)"
        : "var(--color-draft)",
  };
  return opacity ? back : backOpacity;
}
export function setStatusColor(invoice) {
  const text = {
    color:
      invoice.status === "paid"
        ? "var(--green)"
        : invoice.status === "pending"
        ? "var(--yellow)"
        : "var(--color-text)",
  };
  return text;
}

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function twoRandomLetters() {
  let str = "";
  for (var i = 0; i < 2; i++) {
    str += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }
  return str;
}

export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function removeAfterBlur(e) {
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

export function createInvoice(
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
  paidStatus = "pending",
  id = ""
) {
  let newElement = {
    id: id || `${twoRandomLetters()}${randomIntFromInterval(1000, 9999)}`,
    createdAt: date.toLocaleDateString("en-GB").split("/").reverse().join("-"),
    paymentDue: new Date(date.setDate(date.getDate() + Number(terms)))
      .toLocaleDateString("en-GB")
      .split("/")
      .reverse()
      .join("-"),
    description: desc.current.value,
    paymentTerms: terms,
    clientName: toCName.current.value,
    clientEmail: toCEmail.current.value,
    status: paidStatus,
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
      console.log("refsArr from function", refsArr);
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
  if (invoices && invoices.length > 0) {
    storageArr.unshift(newElement);
    setInvoices([newElement, ...invoices]);
    localStorage.setItem("invoices-app", JSON.stringify(storageArr));
  } else {
    const newStorage = storageArr.map((elem) =>
      elem.id === newElement.id ? newElement : elem
    );
    setSingleItem(newElement);
    localStorage.setItem("invoices-app", JSON.stringify(newStorage));
  }
}
