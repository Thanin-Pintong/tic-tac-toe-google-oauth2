import { resolve, sep } from 'node:path';
import { DataSource } from 'typeorm';

const configDir = resolve(__dirname, '.');
const parentDir = resolve(configDir, '..');

const dataSource = new DataSource({
    type: "sqlite",
    database: `${parentDir}${sep}db${sep}game.db`,
    synchronize: true,
    //logging: ['query', 'error', 'schema'],
    logging: ['error'],
    maxQueryExecutionTime: 3000,
    cache: true,
    entities: [`${parentDir}${sep}entity${sep}**.entity{.ts,.js}`],
    migrations: [],
    subscribers: []
});

export default dataSource;