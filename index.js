const express = require("express");
const app = express();
const PORT = 5000 | process.env.PORT;
const db = require("./data/database");
const { pool } = require("mssql");

app.get("/", async (req, res) => {
  let gv = await db.conn;
  let query = "SELECT * FROM GIAOVIEN";
  return await pool.request().query(query, function (err, data) {
    console.log("err ", data);
    res.send({ result: data.recordset });
  });
});
app.listen(PORT, () => {
  console.log("listen to ", PORT);
});
