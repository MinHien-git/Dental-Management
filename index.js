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
app.post("/ThemKeHoachDieuTriBenhNhan  ", async (req, res) => {
  let { MaKHDT, MoTa, NgayDieuTri, TrangThai, MaBN, KhamChinh, TroKham } =
    res.body;

  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("MaKHDT", MaKHDT);
    request.input("MoTa", MoTa);
    request.input("NgayDieuTri", NgayDieuTri);
    request.input("TrangThai", TrangThai);
    request.input("MaBN", MaBN);
    request.input("KhamChinh", KhamChinh);
    request.input("TroKham", TroKham);
    const result = request
      .execute("PROC_ThemKeHoachDieuTriBenhNhan")
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

app.post("/CapNhatKeHoachDieuTriBenhNhan  ", async (req, res) => {
  let { MaKHDT, MoTa, NgayDieuTri, TrangThai, MaBN, KhamChinh, TroKham } =
    res.body;

  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("MaKHDT", MaKHDT);
    request.input("MoTa", MoTa);
    request.input("NgayDieuTri", NgayDieuTri);
    request.input("TrangThai", TrangThai);
    request.input("MaBN", MaBN);
    request.input("KhamChinh", KhamChinh);
    request.input("TroKham", TroKham);
    const result = request
      .execute("PROC_CapNhatKeHoachDieuTriBenhNhan")
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

app.post("/ThemChiTietKeHoachDieuTri ", async (req, res) => {
  let { MaKHDT, MaDT, MaRang, MaBeMat } = res.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("MaKHDT", MaKHDT);
    request.input("MaDT", MaDT);
    request.input("MaRang", MaRang);
    request.input("MaBeMat", MaBeMat);
    const result = request
      .execute("PROC_ThemChiTietKeHoachDieuTri ")
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

app.post("/XoaChiTietKeHoachDieuTri", async (req, res) => {
  let { MaKHDT, MaDT, MaRang, MaBeMat } = res.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("MaKHDT", MaKHDT);
    request.input("MaDT", MaDT);
    request.input("MaRang", MaRang);
    request.input("MaBeMat", MaBeMat);
    const result = request
      .execute("PROC_XoaChiTietKeHoachDieuTri")
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

app.post("/ThemDonThuoc", async (req, res) => {
  let { NgayLap, MaBN, NguoiLap } = res.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("NgayLap", NgayLap);
    request.input("MaBN", MaBN);
    request.input("NguoiLap", NguoiLap);
    const result = request
      .execute("PROC_ThemDonThuoc")
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

app.post("/XoaDonThuoc/:MaDonThuoc", async (req, res) => {
  let { MaDonThuoc } = res.params;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("MaDonThuoc", MaDonThuoc);
    const result = request
      .execute("PROC_XoaDonThuoc")
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

app.post("/SuaDonThuoc", async (req, res) => {
  let { MaDonThuoc, NgayLap, MaBN, NguoiLap } = res.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("MaDonThuoc", MaDonThuoc);
    request.input("NgayLap", NgayLap);
    request.input("MaBN", MaBN);
    request.input("NguoiLap", NguoiLap);
    const result = request
      .execute("PROC_SuaDonThuoc")
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

app.post("/ThemChiTietDonThuoc", async (req, res) => {
  let { MaDonThuoc, MaThuoc, LieuLuong } = res.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("MaDonThuoc", MaDonThuoc);
    request.input("MaThuoc", MaThuoc);
    request.input("LieuLuong", LieuLuong);
    const result = request
      .execute("PROC_ThemChiTietDonThuoc")
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

app.post("/XoaChiTietDonThuoc", async (req, res) => {
  let { MaDonThuoc, MaThuoc } = res.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("MaDonThuoc", MaDonThuoc);
    request.input("MaThuoc", MaThuoc);
    const result = request
      .execute("PROC_XoaChiTietDonThuoc")
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

app.post("/SuaChiTietDonThuoc", async (req, res) => {
  let { MaDonThuoc, MaThuoc, LieuLuong } = res.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("MaDonThuoc", MaDonThuoc);
    request.input("MaThuoc", MaThuoc);
    request.input("LieuLuong", LieuLuong);
    const result = request
      .execute("PROC_SuaChiTietDonThuoc")
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

app.get("/XemDanhSachThanhToanCuaBenhNhan/:MaBenhNhan", async (req, res) => {
  let { MaBenhNhan } = res.params;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("MaBenhNhan", MaBenhNhan);
    const result = request
      .execute("PROC_XemDanhSachThanhToanCuaBenhNhan")
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

app.get("/LocCuocHenTheoTungNgay", async (req, res) => {
  let { ngay } = res.query;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("Ngay", ngay);
    const result = request
      .execute("PROC_LocCuocHenTheoTungNgay")
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

app.get("/LocCuocHenTheoPhong/:mapk/:maPhong", async (req, res) => {
  let { mapk, maPhong } = req.params;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("MaPk", mapk);
    request.input("MaPhong", maPhong);
    const result = request
      .execute("PROC_LocCuocHenTheoNhaSi")
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

app.get("/LocCuocHenTheoNhaSi/:id", async (req, res) => {
  let { mans } = req.params;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("MaNhaSi", mans);
    const result = request
      .execute("PROC_LocCuocHenTheoNhaSi")
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

app.get("/LocCuocHenTrongNgay", async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const result = request
      .execute("PROC_LocCuocHenTrongNgay")
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
