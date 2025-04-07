require("dotenv").config();

module.exports = {
   development: {
      username: process.env.DB_USER || "postgres",
      password: process.env.DB_PASS || "Th1s1spostgres",
      database: process.env.DB_NAME || "nextgen_website",
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      dialect: "postgres",
      logging: false,
   },
   test: {
      username: process.env.DB_USER || "postgres",
      password: process.env.DB_PASS || "Th1s1spostgres",
      database: process.env.DB_NAME || "nextgen_website_test",
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      dialect: "postgres",
      logging: false,
   },
   production: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
      logging: false,
      ssl: process.env.DB_SSL === "true",
   },
};
