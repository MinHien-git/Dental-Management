const express = require("express");
const sql = require("mssql");
const app = express();
const authenticationRouter = require("./routes/authentication.routes");
/*-------------------add details of sqlConfig-----------------*/

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

/******************************************************************/
app.get("/", async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input();
    const result = await request.execute();
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
});

app.use(authenticationRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`service is running on:: [${port}]`);
});
