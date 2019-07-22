import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { prisma } from "./generated/prisma-client";

const app = express();
// Init Middleware

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.users({});
  res.json(users);
});

app.post("/api/user", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await prisma.createUser({ name, email, password });
  res.json(user);
});
