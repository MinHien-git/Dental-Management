const sql = require("mssql");
const sqlConfig = {
  user: process.env.DB_USER | "BRIGHT/hienb",
  password: process.env.DB_PWD,
  database: process.env.DB_NAME | "QLDT_1",
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};

const connect_to_database = async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(sqlConfig);
    const result = await sql.query`select * from giaovien where id = ${1}`;
    console.dir(result);
  } catch (err) {
    // ... error checks
  }
};

module.exports = { connect_to_database };
