import { Request, Response } from "express";
import Joi from "joi";
import { todos } from "../../config/database";

const schema = Joi.object({
  todo: Joi.string().required(),
});

export const createTodoController = async (req: Request, res: Response) => {
  try {
    const { error: schemaError, value: query } = schema.validate(req.query);
    if (schemaError) throw new Error(schemaError.message);

    const { todo } = query;
    const { _id } = res.locals.subject;

    const newTodo = await todos.insert({
      todo,
      author: _id,
      createdAt: Date.now(),
      completed: false,
    });

    return res.json({ todo: newTodo });
  } catch (error: any) {
    return res.status(400).json({ error: error?.message || error });
  }
};
