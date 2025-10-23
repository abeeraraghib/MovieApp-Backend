import { DataSource, DataSourceOptions } from 'typeorm';
 import * as dotenv from 'dotenv';
 
 dotenv.config();
 
 export const dataSourceOptions: DataSourceOptions = {
   type: 'postgres',
   host: process.env.DB_HOST,
   port: Number(process.env.DB_PORT),
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   entities: ['dist/**/*.entity{.js,.ts}'],
   synchronize: true,
 };
 console.log(process.env.DB_HOST,process.env.DB_NAME, process.env.DB_PORT, process.env.DB_PASSWORD )
 
 const dataSource = new DataSource(dataSourceOptions);
 export default dataSource;