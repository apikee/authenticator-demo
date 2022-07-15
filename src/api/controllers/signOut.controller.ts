import { Request, Response } from "express";

export const signOutController = async (req: Request, res: Response) => {
  try {
    return res.json({
      message:
        "Access revoked for user " + res.locals.subject?.email ||
        res.locals.subject,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error?.message || error });
  }
};
