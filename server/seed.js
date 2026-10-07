require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Product = require("./models/Product");
const User = require("./models/User");

const products = [
  {
    name: "AeroSound Pro Headphones",
    description: "Wireless over-ear headphones with rich sound, active noise cancellation and a comfortable travel-ready design.",
    price: 18999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    stock: 18,
    featured: true
  },
  {
    name: "Minimal Leather Backpack",
    description: "Clean everyday backpack with a padded laptop compartment and durable full-grain leather finish.",
    price: 8499,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    stock: 24,
    featured: true
  },
  {
    name: "Ceramic Coffee Set",
    description: "Elegant four-piece ceramic coffee set designed for slow mornings and polished dining tables.",
    price: 4299,
    category: "Home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85",
    stock: 30,
    featured: true
  },
  {
    name: "Performance Running Shoes",
    description: "Lightweight cushioned runners with breathable mesh and responsive foam for everyday training.",
    price: 11999,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    stock: 15,
    featured: true
  },
  {
    name: "Glow Skincare Essentials",
    description: "A simple daily skincare set with cleanser, moisturizer and serum for a fresh routine.",
    price: 5499,
    category: "Beauty",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85",
    stock: 20,
    featured: false
  },
  {
    name: "Smart Desk Lamp",
    description: "Adjustable LED desk lamp with warm and cool modes for focused work and relaxed evenings.",
    price: 3799,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    stock: 35,
    featured: false
  },
  {
    name: "Classic Chronograph Watch",
    description: "Timeless stainless-steel chronograph with a clean dial and everyday water resistance.",
    price: 15999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",
    stock: 12,
    featured: false
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Compact speaker with room-filling audio, deep bass and a battery built for weekend trips.",
    price: 6999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",
    stock: 27,
    featured: false
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Product.deleteMany({});
  await User.deleteMany({});

  await Product.insertMany(products);

  const password = await bcrypt.hash("Admin@12345", 12);
  await User.create({
    name: "Nexa Admin",
    email: "admin@nexacommerce.dev",
    password,
    role: "admin"
  });

  console.log("Seed complete.");
  console.log("Admin: admin@nexacommerce.dev / Admin@12345");
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
