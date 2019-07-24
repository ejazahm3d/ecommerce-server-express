import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import { prisma } from "../../generated/prisma-client";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // See if user exists

  const userExists = await prisma.$exists.user({ email });
  if (userExists) {
    res.status(400).json({ errors: [{ msg: "User Already Exists" }] });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create User
  const user = await prisma.createUser({ name, email, hash });

  // send back jwt token
  const payload = {
    user: {
      id: user.id
    }
  };

  jwt.sign(payload, "secret", { expiresIn: 36000 }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
});

export default router;
