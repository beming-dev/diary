const mysql = require("mysql2/promise");

const config = {
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DB,
  password: process.env.MYSQL_PW,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export default async function executeQuery(query: string, values: any[]) {
  const pool = await mysql.createPool(config);
  try {
    const result = await pool.query(query, values);
    return result;
  } catch (err) {
    console.log(err);
  }
}
