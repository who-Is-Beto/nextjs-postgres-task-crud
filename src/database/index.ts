import { Pool, PoolConfig } from "pg";

let connection: any;

if (!connection) {
  connection = new Pool({
    user: process.env.DATABASE_USER || "",
    password: process.env.DATABASE_PASSWORD || "",
    host: "localhost",
    port: 5432,
    database: "taskdb"
  });
}

export { connection };
