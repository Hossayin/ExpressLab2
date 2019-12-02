const express = require("express");
const cors = require("cors");
const app = express();
const cartItemsRoute = require("./routes");

app.use(cors());
app.use(express.json());
app.use("/", cartItemsRoute);

const port = 4200;
app.listen(port, () => {
  console.log(`server started http://localhost:${port}`);
});
