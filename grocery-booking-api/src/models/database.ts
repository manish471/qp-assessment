import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'grocery_booking',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
