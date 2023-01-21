import { ConnectionOptions } from 'typeorm';
const dotenv = require("dotenv");

dotenv.config({path: ".env"})

// ormconfig.ts

export default {
    type: "mysql",
    host: process.env.ORM_HOST,
    port: parseInt(process.env.ORM_PORT),
    username: process.env.ORM_USERNAME,
    password: process.env.ORM_PASSWORD,
    database: process.env.ORM_DATABASE,
    entities: [process.env.ORM_ENTITIES],
    synchronize: true,
    logging: ["error"],
    migrations: [
        "src/migration/**/*.ts"
    ],
    cli: {
        migrationsDir: "src/migration"
    }
} as ConnectionOptions;
// console.log(ConnectionSettings)