const express = require("express");
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
} = require("../controllers/product_controllers");
const {
  verifyToken,
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require("../middleware/verify_token");

const router = express.Router();


//product routes
router.post("/create", verifyTokenAndAdmin, createProduct);
router.put("/update/:id", verifyTokenAndAdmin, updateProduct);
router.delete("/delete", verifyTokenAndAdmin, deleteProduct);
router.get("/find/:id", getProduct);
router.get("/", getAllProducts);

module.exports = router;
