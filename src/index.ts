import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";

// Routes
import usersRoutes from "./routes/api/users";
import authRoutes from "./routes/api/auth";

const app = express();
// Init Middleware

app.use(bodyParser.json());

// Define Routes
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
