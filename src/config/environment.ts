import dotenv from "dotenv";

dotenv.config();

export const environment = {
  port: process.env.PORT!,
  accessSecretKey: process.env.ACCESS_SECRET_KEY!,
  refreshSecretKey: process.env.REFRESH_SECRET_KEY!,
  mongoConnect: process.env.MONGO_CONNECTION!,
};
