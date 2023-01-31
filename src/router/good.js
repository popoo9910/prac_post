const express = require("express");
const router = express.Router();

const Goods = require("../schemas/goods");

router.post("/goods", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  console.log(req.body);

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 있는 데이터입니다" });
  }

  const createdGoods = await Goods.create({
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  });
  res.json({ good: createdGoods });
});

router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 장바구니에 존재하는 상품입니다.",
    });
  }

  await Cart.create({ goodsId: Number(goodsId), quantity: quantity });

  res.json({ result: "success" });
});

router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId });
  // 첫번째는 해당 값을 찾는 것이고 두번째는 수정하는 것
  if (existsCarts.length) {
    await Cart.updateOne(
      { goodsId: goodsId },
      { $set: { quantity: quantity } }
    );
  }
  res.status(200).json({ success: true });
});

router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    await Cart.deleteOne({ goodsId });
  }

  res.json({ result: "success" });
});

module.exports = Goods;
