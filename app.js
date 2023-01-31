const express = require("express");
const app = express();
const port = 8500;

const goodsRouter = require("./src/router/good");
const cartsRouter = require("./src/router/cart");
const connect = require("./src/schemas");
connect();

app.use(express.json());
app.use("/api", [goodsRouter, cartsRouter]);

app.get("/", (req, res) => {
  res.send("기본 페이지");
});

app.get("/goods", (req, res) => {
  res.send("상품 페이지");
});

app.listen(port, () => {
  console.log(port, "서버 실행");
});
