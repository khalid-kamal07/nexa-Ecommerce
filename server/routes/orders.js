const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    const { items, shipping } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const requiredShipping = ["fullName", "phone", "address", "city", "postalCode"];
    if (!shipping || requiredShipping.some((field) => !String(shipping[field] || "").trim())) {
      return res.status(400).json({ message: "Complete shipping information is required" });
    }

    session.startTransaction();

    const ids = items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: ids } }).session(session);

    if (products.length !== ids.length) {
      throw Object.assign(new Error("One or more products are no longer available"), { status: 400 });
    }

    const productMap = new Map(products.map((product) => [product._id.toString(), product]));
    const orderItems = [];
    let total = 0;

    for (const item of items) {
      const product = productMap.get(String(item.productId));
      const quantity = Math.max(1, Number(item.quantity) || 1);

      if (product.stock < quantity) {
        throw Object.assign(new Error(`${product.name} does not have enough stock`), { status: 400 });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity
      });

      total += product.price * quantity;
      product.stock -= quantity;
      await product.save({ session });
    }

    const [order] = await Order.create([{
      user: req.user._id,
      items: orderItems,
      shipping,
      total,
      paymentMethod: "COD"
    }], { session });

    await session.commitTransaction();
    res.status(201).json(order);
  } catch (error) {
    await session.abortTransaction().catch(() => {});
    next(error);
  } finally {
    session.endSession();
  }
});

router.get("/my", protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/", protect, adminOnly, async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/status", protect, adminOnly, async (req, res, next) => {
  try {
    const allowed = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate("user", "name email");

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
