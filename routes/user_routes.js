const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStatistics,
} = require("../controllers/user_controllers");
const {
  verifyToken,
  verifyTokenAndAuthorize,
  verifyTokenAndAdmin,
} = require("../middleware/verify_token");

const router = express.Router();

//registration route
router.post("/register", registerUser);
//login route
router.post("/login", loginUser);
router.put("/:id", verifyTokenAndAuthorize, updateUser);
router.put("/:id", verifyTokenAndAuthorize, deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getAllUsers);
router.get("/stats", verifyTokenAndAdmin, getUserStatistics);

module.exports = router;
