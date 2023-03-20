import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./database/db.js";
import router from "./router/route.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // Less Hackers know about my stack

dotenv.config();
const PORT = process.env.PORT || 5000;

// HTTP Request
app.get("/", (req, res) => {
  res.status(200).json("Home page.");
});

// api routes
app.use("/api", router);

app.use((err, res) => {
  const errorStatus = err.status || 500;
  const errorMsg = err.message || "Something went wrong.";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMsg,
    stack: err.stack,
  });
});

// Start server only when db is connected.
connectDB()
  .then(() => {
    try {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
      console.log("Can not connect to server.");
    }
  })
  .catch((error) => {
    console.log("Invalid db connection...!");
  });
