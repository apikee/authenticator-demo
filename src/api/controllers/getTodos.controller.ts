import { Request, Response } from "express";
import { todos } from "../../config/database";

export const getTodosController = async (req: Request, res: Response) => {
  try {
    const { _id } = res.locals.subject;

    const _todos = await todos.find({
      author: _id,
    });

    return res.json({ todos: _todos });
  } catch (error: any) {
    return res.status(400).json({ error: error?.message || error });
  }
};
