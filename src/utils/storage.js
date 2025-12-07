//  lire et écrire dans localStorage
// All products
const products = [
  { 
    "id": 1,
     "name": "Espresso", 
     "price": 2.5,
      "image": "Espresso.png", 
      "category": "café" 
    },
  {
     "id": 2,
      "name": "Cappuccino", 
      "price": 3, 
      "image": "Cappuccino.png", 
      "category": "café" 
    },
  { 
    "id": 3,
     "name": "Hot Mocha", 
     "price": 4.2, 
     "image": "Hot Mocha.png",
      "category": "café"
     },
  { 
    "id": 4,
     "name": "Iced Caramel",
      "price": 4.9,
       "image": "Iced Caramel.png",
        "category": "café" 
    },
  { 
    "id": 5,
     "name": "Brown Sugar Cinnamon Iced Latte",
      "price": 4.5,
       "image": "Brown Sugar Cinnamon Iced Latte.png",
        "category": "café" 
    },
  { 
    "id": 6,
     "name": "Americano", 
     "price": 4, 
     "image": "Americano.png", 
     "category": "café"
     },
  { 
    "id": 7,
     "name": "Black Coffee", 
     "price": 3.5, 
     "image": "Black Coffee.png", 
     "category": "café"
     },
  { 
    "id": 8,
     "name": "Latte Macchiato", 
     "price": 4, 
     "image": "Latte Macchiato.png", 
     "category": "café" 
    },
  { 
    "id": 9,
     "name": "Boba Tea",
      "price": 4, 
      "image": "Boba Tea.png",
       "category": "jus"
     },
  { 
    "id": 10, 
    "name": "Classic Mojito",
     "price": 4, 
     "image": "Classic Mojito.png", 
     "category": "jus" 
    },
  { 
    "id": 11,
     "name": "Frozen Mixed Berry Smoothie", 
     "price": 4,
      "image": "Frozen Mixed Berry Smoothie.png", 
      "category": "jus"
     },
  { 
    "id": 12,
     "name": "Oats & Banana Smoothie", 
     "price": 5.2,
      "image": "Oats & Banana Smoothie.png", 
      "category": "jus" 
    },
  { 
    "id": 13,
     "name": "Acai Smoothie", 
     "price": 5.5, 
     "image": "Acai Smoothie.png",
      "category": "jus" 
    },
  { 
    "id": 14,
     "name": "Berry Bliss Smoothie Bowl", 
     "price": 4, 
     "image": "Berry Bliss Smoothie Bow.png",
      "category": "jus"
     },
  { 
    "id": 15, 
    "name": "Orange",
    "price": 2.5, 
    "image": "Orange.png", 
    "category": "jus" 
},
  { 
    "id": 16,
     "name": "Vanilla Strawberry", 
     "price": 3, 
     "image": "Vanilla Strawberry.png", 
     "category": "jus" 
    },
  { 
    "id": 17,
     "name": "Italian Croissant", 
     "price": 1.5, 
     "image": "Italian croissants.png", 
     "category": "pâtisserie" 
    },
  { 
    "id": 18,
     "name": "Croissant Sandwiches", 
     "price": 3.5, 
     "image": "Croissant Sandwiches.png", 
     "category": "pâtisserie" 
    },
  { 
    "id": 19,
     "name": "Cream-Filled Croissant", 
     "price": 4.2, 
     "image": "Cream-Filled Croissant.png",
      "category": "pâtisserie" 
    },
  { 
    "id": 20,
     "name": "Pain Au Chocolat",
      "price": 2.5, 
      "image": "Pain Au Chocolat.png", 
      "category": "pâtisserie" 
    },
  { 
    "id": 21,
     "name": "Red Velvet Strawberry Cheesecake",
      "price": 7, 
      "image": "Red Velvet Strawberry Cheesecake.png", 
      "category": "pâtisserie" 
    },
  { 
    "id": 22,
     "name": "Pecan caramel rum cake",
      "price": 5.8, 
      "image": "Pecan caramel rum cake.png", 
      "category": "pâtisserie" 
    },
  { 
    "id": 23,
    "name": "Opera cake",
     "price": 5.9,
      "image": "Opera Cake.png", 
      "category": "pâtisserie"
     },
  { 
    "id": 24,
    "name": "Chocolat cake",
     "price": 6.1, 
     "image": "Chocolat Cake.png", 
     "category": "pâtisserie"
     },
  { 
    "id": 25,
     "name": "Caramel Brownie Cheesecake", 
     "price": 7.2,
      "image": "Caramel Brownie Cheesecake.png", 
      "category": "pâtisserie"
     },
  { 
    "id": 26,
     "name": "Peanut Butter Cheesecake", 
     "price": 7.1, 
     "image": "Peanut Butter Cheesecake.png", 
     "category": "pâtisserie"
     },
  { 
    "id": 27,
     "name": "Tiramisu Caramel Brownies", 
     "price": 7, 
     "image": "Tiramisu Caramel Brownies .png",
      "category": "pâtisserie" 
    },
  { 
    "id": 28,
     "name": "Stracciatella Ice-Cream",
      "price": 5, 
      "image": "Glace Stracciatella .png",
       "category": "pâtisserie" 
    },
  { 
    "id": 29,
     "name": "Chocolat Ice-Cream",
      "price": 5.2, 
      "image": "Chocolat Ice-Cream.png", 
      "category": "pâtisserie" 
    },
  { 
    "id": 30,
     "name": "Oreo Ice-Cream", 
     "price": 5.2, 
     "image": "Oreo Ice-Cream.png", 
     "category": "pâtisserie" 
    }
]
// Products Initilization function
export function initProducts(){
  localStorage.setItem("products",JSON.stringify(products));
}
// PRODUCTS
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
