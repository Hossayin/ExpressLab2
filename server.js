const express = require("express");
const cors = require("cors");
const cartItemsRoute = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", cartItemsRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`server started http://localhost:${port}`);
});
