const express = require("express");
const {
    createCart,
    updateCart,
    deleteCart,
    getCart,
    getAllCarts,
} = require("../controllers/cart_controllers");
const {
  verifyToken,
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require("../middleware/verify_token");

const router = express.Router();


//product routes
router.post("/create", verifyToken, createCart);
router.put("/update/:id", verifyTokenAndAuthorize, updateCart);
router.delete("/delete", verifyTokenAndAuthorize, deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorize, getCart);
router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
