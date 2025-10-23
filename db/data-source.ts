import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
};
