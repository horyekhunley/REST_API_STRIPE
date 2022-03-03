const express = require("express");
const User = require("../models/user_model");
const crypto = require("crypto-js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

//register new user
exports.registerUser = async (req, res) => {
  let newUser = new User({
    ...req.body,
    password: crypto
      .SHA256(req.body.password, process.env.CRYPTO_SECRET_KEY)
      .toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      savedUser,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error creating user",
      error: e,
    });
  }
};
//login user
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
    if (
      crypto
        .SHA256(req.body.password, process.env.CRYPTO_SECRET_KEY)
        .toString() !== user.password
    ) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: "User logged in successfully",
      userWithoutPassword,
      token,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error logging in user",
      error: e,
    });
  }
};
exports.updateUser = async (req, res) => {
  if (req.body.password) {
    password: crypto
      .SHA256(req.body.password, process.env.CRYPTO_SECRET_KEY)
      .toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
//GET user statistics
exports.getUserStatistics = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(
    date.getFullYear() - 1,
    date.getMonth(),
    date.getDate()
  );
  try {
    const users = await User.find();
    const userCount = users.length;
    const adminCount = users.filter((user) => user.isAdmin).length;
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    const nonAdminCount = userCount - adminCount;
    res.status(200).json({
      data,
      userCount,
      adminCount,
      nonAdminCount,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
