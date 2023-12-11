const express = require("express");
const sql = require("mssql");
const app = express();

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

app.get("/login", async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("@ten", "Luong Minh Hien");
    request.input("@mk", "NK123456");
    request.output("@kq", sql.NVarChar);
    const result = await request.execute("PROC_DangNhap", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("@ten", "Luong Minh Hien");
    request.input("@mk", "NK123456");
    request.output("@kq", sql.NVarChar);
    const result = await request.execute("PROC_DangNhap", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
});

app.post("/register", async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("@ten", "Luong Minh Hien");
    request.input("@mk", "NK123456");
    request.output("@kq", sql.NVarChar);
    const result = await request.execute("PROC_DangNhap", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
})

app.post('/')

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`service is running on:: [${port}]`);
});
