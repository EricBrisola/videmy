import { Pool } from "pg";

const pool: Pool = new Pool({
  connectionString: process.env.POSTGRES_DB_URL,
  max: 4,
});

export default pool;
