const express = require("express");
const Cart = require("../models/cart_model");
const crypto = require("crypto-js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

// Create a new product cart
exports.createCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(201).json({
      message: "Product cart created successfully",
      savedCart,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

exports.updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id, {
        $set: req.body,
      }, {
        new: true
      }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Product cart deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.params.userId
    });

    res.status(200).json({
      cart,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json({
      carts,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};