const express = require("express");
const cartItemsRoute = express.Router();

cartItemsRoute.get("/", (req, res) => {
  res.send("here are all the items");
});

const cartItems = [
  { id: 0, product: "product1", price: 1, quantity: 1 },
  { id: 1, product: "product2", price: 2, quantity: 2 }
];
let nextItem = 2;

cartItemsRoute.get("/cart-items", (req, res) => {
  res.json(cartItems);
  res.status(200);
});

cartItemsRoute.get("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let item = cartItems.find(aItem => aItem.id === id);
  if (item) {
    res.json(item);
    res.status(200);
  } else {
    res.status(404);
    res.send(`ID NOT FOUND ${id}`);
  }
});
cartItemsRoute.post("/cart-items", (req, res) => {
  const item = req.body;
  item.id = nextItem;
  nextItem++;
  cartItems.push(item);
  res.status(201);
  res.json();
});

cartItemsRoute.put("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = req.body;
  item.id = id;
  const index = cartItems.findIndex(i => i.id === id);
  cartItems.splice(index, 1, item);
  res.status(200);
  res.json(item);
});

cartItemsRoute.delete("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cartItems.findIndex(i => i.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  res.sendStatus(204);
});

module.exports = cartItemsRoute;
