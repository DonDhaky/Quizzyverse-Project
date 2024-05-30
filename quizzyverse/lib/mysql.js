import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export const query = async (query, values) => {
  const [results] = await connection.execute(query, values);
  return results;
};
