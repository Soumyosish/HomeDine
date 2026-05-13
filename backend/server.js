const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const path = require("path");

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config(); // Fallback to default

console.log("Environment Debug:");
console.log("- NODE_ENV:", process.env.NODE_ENV);
console.log("- MONGO_URI present:", !!process.env.MONGO_URI);
console.log("- FRONTEND_URL present:", !!process.env.FRONTEND_URL);
console.log("- PORT:", process.env.PORT);

// Connect to Database
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://3.27.9.146",
]
  .filter(Boolean)
  .map((o) => o.replace(/\/$/, ""));

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server and tools like Postman
      if (!origin) return callback(null, true);

      const normalized = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(normalized)) return callback(null, true);

      return callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Basic Route
app.get("/", (req, res) => {
  res.send("HomeDine API is running...");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ ok: true, db: mongoose.connection.readyState });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Backend Error:", err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Important for Vercel serverless:
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  // Listen on 0.0.0.0 for AWS/Docker compatibility
  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
    );
  });
}

module.exports = app;
