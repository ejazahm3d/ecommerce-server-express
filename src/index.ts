import express, { Request, Response } from "express";

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello World");
});
