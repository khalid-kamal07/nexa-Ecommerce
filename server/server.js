require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const dns = require("dns");
dns.setServers(['8.8.8.8', '1.1.1.1']);
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
