const mysql = require("mysql2/promise");

const config = {
  host: process.env.NEXT_PUBLIC_MYSQL_HOST,
  port: parseInt(process.env.NEXT_PUBLIC_MYSQL_PORT || "3306"),
  user: process.env.NEXT_PUBLIC_MYSQL_USER,
  database: process.env.NEXT_PUBLIC_MYSQL_DB,
  password: process.env.NEXT_PUBLIC_MYSQL_PW,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: any;

(async () => {
  pool = await mysql.createPool(config);
  await pool.query(
    `CREATE TABLE IF NOT EXISTS diary(
          id INT AUTO_INCREMENT,
          title VARCHAR(100) NOT NULL,
          description TEXT NOT NULL,
          point DATETIME NOT NULl UNIQUE,
          PRIMARY KEY (ID)
      )`
  );
})();

export default async function executeQuery(query: string, values: any[]) {
  try {
    const result = await pool.query(query, values);
    return result;
  } catch (err) {
    console.log(err);
  }
}
