//collection에 들어가는 문서에 어떤 종류의 값이 들어가는지 정의
//데이터를 모델링할 때 사용

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  goodsId: {
    type: Number,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
