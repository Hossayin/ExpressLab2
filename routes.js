const express = require("express");
const pool = require("./pg-connection-pool");
const cartItemsRoute = express.Router();

// cartItemsRoute.get("/", (req, res) => {
//   let sql = "SELECT * FROM shopping_carts";
//   pool.query(sql).then(result => {
//     res.json(result.rows);
//   });
// });

cartItemsRoute.get("/cart-items", (req, res) => {
  let sql = "SELECT * FROM shopping_cart";
  pool.query(sql).then(result => {
    res.json(result.rows);
    res.status(200);
  });
});

cartItemsRoute.get("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let sql = "SELECT * FROM shopping_cart WHERE id=$1::int";
  let params = [id];
  pool.query(sql, params).then(result => {
    if (result.rows.length !== 0) {
      res.json(result.rows[0]);
      res.status(200);
    } else {
      res.status(404);
      res.send(`ID NOT FOUND ${id}`);
    }
  });
});
cartItemsRoute.post("/cart-items", (req, res) => {
  const shopping_cart = req.body;
  let sql = `INSERT INTO shopping_cart(product, price, quantity)
VALUES ($1::TEXT, $2::MONEY, $3::SMALLINT)RETURNING *`;
  let params = [
    shopping_cart.product,
    shopping_cart.price,
    shopping_cart.quantity
  ];
  pool.query(sql, params).then(result => {
    res.status(201);
    res.json(result.rows[0]);
  });
});

cartItemsRoute.put("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const quantity = req.body.quantity;

  let sql = "UPDATE shopping_cart SET quantity=$1::INT WHERE id=$2::int";
  let params = [quantity, id];
  pool.query(sql, params).then(result => {
    res.status(200);
    res.json(result.rows[0]);
  });
});

cartItemsRoute.delete("/cart-items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let sql = "DELETE FROM shopping_cart WHERE id=$1::int ";
  let params = [id];
  pool.query(sql, params).then(() => {
    res.sendStatus(204);
  });
});

module.exports = cartItemsRoute;
