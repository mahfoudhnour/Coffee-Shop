//  lire et écrire dans localStorage
// PRODUCTS (hedhi li bch taawedh .json statique twalli t recuperer ml local storage)
export function getProducts() {
  return JSON.parse(localStorage.getItem("products") || "[]");
}

export function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}
// ORDERS
export function getOrders() {
  return JSON.parse(localStorage.getItem("orders") || "[]");
}

export function saveOrders(orders) {
  localStorage.setItem("orders", JSON.stringify(orders));
}
// BARISTAS
export function getBaristas() {
  return JSON.parse(localStorage.getItem("baristas") || "[]");
}

export function saveBaristas(baristas) {
  localStorage.setItem("baristas", JSON.stringify(baristas));
}
// USERS (li bech yaaml login yalkaha hadhra) 
export function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

export function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
//li bech yaaml login ynajm yesthako kn bch yaaml login par session si non yestaaml ken getUsers
export function getLoggedUser() {
  return JSON.parse(localStorage.getItem("loggedUser") || "null");
}

export function setLoggedUser(user) {
  localStorage.setItem("loggedUser", JSON.stringify(user));
}