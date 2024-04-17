import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
