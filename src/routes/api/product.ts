import express, { Request, Response } from "express";
import { prisma } from "../../generated/prisma-client";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await prisma.products({}).$fragment(`
          fragment ProductWithImage on Product {
              id
              name
              desc
              price
              image {
                id
                src
                alt
              }
            }
          `);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await prisma.product({ id }).$fragment(`
        fragment ProductWithImage on Product {
          id
          name
          desc
          price
          image {
            id
            src
            alt
          }
        }
  `);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
});

export default router;
