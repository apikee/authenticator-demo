import { Request, Response } from "express";
import Joi from "joi";
import { todos } from "../../config/database";

const schema = Joi.object({
  id: Joi.string().required(),
  todo: Joi.string().optional(),
  completed: Joi.string()
    .pattern(/^(true|false)$/)
    .optional(),
});

export const updateTodoController = async (req: Request, res: Response) => {
  try {
    const { error: schemaError, value: query } = schema.validate(req.query);
    if (schemaError) throw new Error(schemaError.message);

    const { id, todo, completed } = query;
    const { _id } = res.locals.subject;

    const updatedTodo = await todos.update(
      { author: _id, _id: id },
      {
        $set: {
          ...(todo && { todo }),
          ...(completed && { completed: Boolean(completed) }),
        },
      }
    );

    return res.json({ updated: updatedTodo });
  } catch (error: any) {
    return res.status(400).json({ error: error?.message || error });
  }
};
