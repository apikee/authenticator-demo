import { Request, Response } from "express";
import Joi from "joi";
import crypto from "crypto";

import { users } from "../../config/database";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signInController = async (req: Request, res: Response) => {
  try {
    const { error: schemaError, value: query } = schema.validate(req.query);
    if (schemaError) throw new Error(schemaError.message);

    const { email, password } = query;

    const user = (await users.findOne({ email })) as any;

    if (!user) return res.sendStatus(401);

    if (
      crypto
        .pbkdf2Sync(password, "_salt", 1000, 64, `sha512`)
        .toString("hex") !== user.password
    ) {
      return res.sendStatus(401);
    }

    const { password: pwd, ...rest } = user;

    res.locals.subject = user._id;

    return res.json({ user: rest });
  } catch (error: any) {
    return res.status(400).json({ error: error?.message || error });
  }
};
