import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { SeederOptions } from "typeorm-extension";

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
    type: "postgres",
    schema: "public",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: ['error', 'warn'],
    entities: ["src/**/*.entity{.ts,.js}"],
    seeds: ["src/db/seeds/*{.ts,.js}"],
};

export const AppDataSource = new DataSource(options);
