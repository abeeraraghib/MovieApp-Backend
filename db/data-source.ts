import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL, // ✅ Use single connection string
  entities: ['dist/**/*.entity{.js,.ts}'],
  synchronize: true, // ✅ For development only
  ssl: true
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
