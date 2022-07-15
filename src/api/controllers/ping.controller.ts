import { Request, Response } from "express";

export const pingController = (req: Request, res: Response) => {
  return res.json("PONG");
};
