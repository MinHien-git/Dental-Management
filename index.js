const express = require("express");
const sql = require("mssql");
const app = express();
/*-------------------add details of sqlConfig-----------------*/

const config = {
  user: "sa",
  password: "123456",
  server: "localhost",
  database: "QLPK",
  port: 1433,
  options: {
    trustServerCertificate: true,
  },
};
app.use(express.json({ limit: "50mb" }));
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

app.post("/DangNhap", async (req, res) => {
  let { ten, mk } = req.body;

  try {
    await sql.connect(config);
    const request = new sql.Request();
    let kq;
    request.input("ten", ten);
    request.input("mk", mk);
    request.output("kq", kq);
    const result = request
      .execute("PROC_DangNhap")
      .then(function (err, recordsets, returnValue, affected) {
        console.dir(recordsets);
        console.dir(err);
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.get("/XemDsBenhNhan", async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const result = request
      .execute("PROC_XemDSBenhNhan")
      .then(function (err, recordsets, returnValue, affected) {
        console.dir(recordsets);
        console.dir(err);
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log(result);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

app.post("/SuaTTBenhNhan", async (req, res) => {
  let { mbn, ten, phai, sdt, email, diachi, ngsinh } = req.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("mbn", mbn);
    request.input("hoten", ten);
    request.input("phai", phai);
    request.input("sdt", sdt);
    request.input("email", email);
    request.input("diachi", diachi);
    request.input("ngsinh", ngsinh);
    const result = request
      .execute("PROC_SuaTTBenhNhan")
      .then(function (err, recordsets, returnValue, affected) {
        console.dir(recordsets);
        console.dir(err);
      })
      .catch(function (err) {
        console.log(err);
      });
    console.log(result);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`service is running on:: [${port}]`);
});
