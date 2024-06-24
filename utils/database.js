const { Pool } = require("pg");
// require("dotenv").config();

let pool;
export const connectToDB = async () => {
  if (pool) return pool;
  pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGUDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });

  try {
    await pool.query("SELECT NOW()");
    console.log("postgres is connected!");
    return pool;
  } catch (error) {
    console.log("error connecting to postgres", error.message);
    return null;
  }
};
