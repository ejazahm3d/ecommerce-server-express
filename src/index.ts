import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";

// Routes
import usersRoutes from "./routes/api/users";
import authRoutes from "./routes/api/auth";
import productRoutes from "./routes/api/product";
const app = express();
// Init Middleware

app.use(bodyParser.json());
app.use(cors());

// Define Routes
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
