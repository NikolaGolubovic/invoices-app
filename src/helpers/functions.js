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
