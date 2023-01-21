
import { User } from './entity/user';
import { CustomForm} from './entity/dashboard/CustomForm.orm';
const { DataSource } = require('typeorm');

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "spanky",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
})