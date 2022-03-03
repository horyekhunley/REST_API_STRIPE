const express = require("express");
const {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    getAllOrders,
    getMonthlySales
} = require("../controllers/order_controllers");
const {
    verifyToken,
    verifyTokenAndAuthorize,
    verifyTokenAndAdmin,
} = require("../middleware/verify_token");

const router = express.Router();


//product routes
router.post("/create", verifyToken, createOrder);
router.put("/update/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/delete/:id", verifyTokenAndAdmin, deleteOrder);
router.get("/find/:userId", verifyTokenAndAuthorize, getOrder);

router.get("/", verifyTokenAndAdmin, getAllOrders);
router.get("/stats", verifyTokenAndAdmin, getMonthlySales);


module.exports = router;