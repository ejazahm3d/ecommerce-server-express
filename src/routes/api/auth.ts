import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import auth from "../../middleware/auth";
import jwt from "jsonwebtoken";
import { prisma } from "../../generated/prisma-client";

const router = express.Router();

router.get("/", auth, async (req: Request, res: Response) => {
  console.log((req as any).user.id);
  const user = await prisma.user({ id: (req as any).user.id });
  delete user.hash;
  res.send(user);
});

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // See if user doesnt exists
    let user = await prisma.user({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }
    // Match email and password

    const isMatch = await bcrypt.compare(password, user.hash);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error);
  }
});

export default router;
