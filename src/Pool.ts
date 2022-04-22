import { Pool } from 'pg';

export default new Pool ({
    max: 50,
    connectionString: process.env.DATABASE,
    idleTimeoutMillis: 30000
});