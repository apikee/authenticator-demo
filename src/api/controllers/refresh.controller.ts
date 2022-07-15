import { Request, Response } from "express";

export const refreshController = async (req: Request, res: Response) => {
  try {
    return res.json({
      message: `Access for user ${res.locals.subject.email} was refreshed`,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error?.message || error });
  }
};
