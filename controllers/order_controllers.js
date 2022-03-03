const express = require("express");
const Order = require("../models/order_model");
const crypto = require("crypto-js");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

// Create a new product cart
exports.createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: "Order created successfully",
      savedOrder,
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, {
        $set: req.body,
      }, {
        new: true
      }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getOrder = async (req, res) => {
  try {
    const orders = await Order.findOne({
      userId: req.params.userId
    });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
// GET MONTHLY SALES
exports.getMonthlySales = async (req, res) => {
    try {
        const monthlySales = await Order.aggregate([
        {
            $group: {
            _id: {
                $month: "$createdAt",
            },
            totalAmount: {
                $sum: "$totalAmount",
            },
            },
        },
        ]);
        res.status(200).json({
        monthlySales,
        });
    } catch (error) {
        res.status(500).json(error);
    }
}