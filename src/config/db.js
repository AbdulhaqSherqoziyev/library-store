import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'library_system',
  password: '1532', 
  port: 5432
});

// Optionally test the connection
pool
  .connect()
  .then((client) => {
    console.log("Database connected successfully");
    client.release();
  })
  .catch((err) => console.error("Database connection error", err.stack));

export default pool;
