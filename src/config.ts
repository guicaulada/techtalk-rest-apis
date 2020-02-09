export default {
  mysql: {
    connectionLimit: process.env.MYSQL_LIMIT
      ? Number(process.env.MYSQL_LIMIT)
      : 10,
    host: process.env.MYSQL_HOST || "",
    user: process.env.MYSQL_USER || "",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || ""
  }
};
