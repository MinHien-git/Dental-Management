const sql = require("mssql");

const config = {
  user: "sa",
  password: "123456",
  server: "localhost",
  database: "QLDT_1",
  port: 1433,
  options: {
    trustServerCertificate: true,
  },
};
