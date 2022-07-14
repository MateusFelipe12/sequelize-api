import { Sequelize } from "sequelize";
import 'dotenv/config';

export const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTEGRES_USERNAME,
  process.env.POSTEGRES_PASSWORD,
  {
    host: process.env.POSTEGRES_HOST,
    dialect: 'postgres'
  }
);
