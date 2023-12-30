const express = require("express");
const sql = require("mssql");
const app = express();
const moment = require("moment");

var cors = require("cors");

/*-------------------add details of sqlConfig-----------------*/

const config = {
    user: "admin",
    password: "admin",
    server: "localhost",
    database: "QLPK",
    port: 1433,
    options: {
        trustServerCertificate: true
    }
};
app.use(express.json({ limit: "50mb" }));
app.use(cors());

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
    let { ma, pw } = req.body;
    console.log(req.body);
    try {
        await sql.connect(config);
        const request = new sql.Request();
        let kq;
        let id;
        let name;
        request.input("ma", ma);
        request.input("mk", pw);
        request.output("kq", kq);
        request.output("name", name);
        request.output("id", id);
        const result = await request.execute("PROC_DangNhap");

        console.log(result);
        res.send(
            JSON.stringify({
                type: result.output.kq,
                id: result.output.id,
                name: result.output.name
            })
        );
    } catch (err) {
        console.log(err);
    }
});

app.get("/XemDsBenhNhan", async (req, res) => {
    console.log("Xem ds bệnh nhân");
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.execute("PROC_XemDSBenhNhan");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/ThemTTBenhNhan", async (req, res) => {
    let { MaBN, HotenBN, NgaySinhBN, GioiTinhBN, SDTBN, EmailBN, DiachiBN } = req.body;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("mbn", MaBN);
        request.input("hoten", HotenBN);
        request.input("phai", GioiTinhBN);
        request.input("sdt", SDTBN);
        request.input("email", EmailBN);
        request.input("diachi", DiachiBN);
        request.input("ngsinh", NgaySinhBN);
        const result = await request.execute("PROC_ThemTTBenhNhan");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/SuaTTBenhNhan/:MaBN", async (req, res) => {
    let { HotenBN, NgaySinhBN, GioiTinhBN, SDTBN, EmailBN, DiachiBN } = req.body;
    let { MaBN } = req.params;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("mbn", MaBN);
        request.input("hoten", HotenBN);
        request.input("phai", GioiTinhBN);
        request.input("sdt", SDTBN);
        request.input("email", EmailBN);
        request.input("diachi", DiachiBN);
        request.input("ngsinh", NgaySinhBN);
        const result = await request.execute("PROC_SuaTTBenhNhan");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.get("/XemThuoc", async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.execute("PROC_XemThuoc");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/ThemThuoc", async (req, res) => {
    let { mathuoc, tenthuoc, gia, donvi } = req.body;
    console.log(req.body);
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("mathuoc", mathuoc);
        request.input("tenthuoc", tenthuoc);
        request.input("gia", gia);
        request.input("donvi", donvi);
        const result = await request.execute("PROC_ThemThuoc");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/SuaThuoc", async (req, res) => {
    let { mathuoc, tenthuoc, gia, donvi } = req.body;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("mathuoc", mathuoc);
        request.input("tenthuoc", tenthuoc);
        request.input("gia", gia);
        request.input("donvi", donvi);
        const result = await request.execute("PROC_SuaThuoc");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/XoaThuoc/:mathuoc", async (req, res) => {
    let { mathuoc } = req.params;

    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("mathuoc", mathuoc);
        const result = await request.execute("PROC_XoaThuoc");

        console.log(result);
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.get("/KHDTtrongNgay", async (req, res) => {
    let { ngay } = req.body;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("ngay", sql.Date, ngay);
        const result = await request.execute("PROC_KHDTtrongNgay");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.get("/LichHenDenNgay", async (req, res) => {
    let { start, end, name } = req.query;
    console.log(moment(start).format("YYYY-MM-DD"), moment(end).format("YYYY-MM-DD"), name);

    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("start", sql.DateTime, start === "null" ? null : moment(start).format("YYYY-MM-DD"));
        request.input("TenNS", name.trim() ? name.trim() : null);
        request.input("end", sql.DateTime, end === "null" ? null : moment(end).format("YYYY-MM-DD"));
        const result = await request.execute("PROC_LichHenDenNgay");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.get("/ALL_THE_EMPLOYEE", async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();

        const result = await request.execute("PROC_ALL_THE_EMPLOYEE");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.get("/GET_SCHEDURE", async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();

        const result = await request.execute("PROC_GET_SCHEDURE");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/CREATE_SCHEDURE", async (req, res) => {
    let { EmailBN, DiaChiBN, HotenBN, NgaySinhBN, GioiTinhBN, Ngay, Gio, KhamChinh, TroKham, MaPhong, MaPK } = req.body;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("EmailBN", EmailBN);
        request.input("DiaChiBN", DiaChiBN);
        request.input("HotenBN", HotenBN);
        request.input("NgaySinhBN", NgaySinhBN);
        request.input("GioiTinhBN", GioiTinhBN);
        request.input("Ngay", Ngay);
        request.input("Gio", Gio);
        request.input("KhamChinh", KhamChinh);
        request.input("TroKham", TroKham);
        request.input("MaPhong", MaPhong);
        request.input("MaPK", MaPK);

        const result = await request.execute("PROC_CREATE_SCHEDURE");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.get("/ALL_THE_DOCTOR", async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();
        const result = await request.execute("PROC_ALL_THE_DOCTOR");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/ADD_THE_DOCTOR", async (req, res) => {
    let { MaND, TenND, NgaySinhND, GioiTinhND, MatKhau, PhongKham } = req.body;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaND", MaND);
        request.input("TenND", TenND);
        request.input("NgaySinhND", NgaySinhND);
        request.input("GioiTinhND", GioiTinhND);
        request.input("MatKhau", MatKhau);
        request.input("PhongKham", PhongKham);

        const result = await request.execute("PROC_ADD_THE_DOCTOR");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/UPDATE_THE_DOCTOR/:MaND", async (req, res) => {
    let { TenND, NgaySinhND, GioiTinhND, MatKhau, PhongKham } = req.body;
    let { MaND } = req.params;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaND", MaND);
        request.input("TenND", TenND);
        request.input("NgaySinhND", NgaySinhND);
        request.input("GioiTinhND", GioiTinhND);
        request.input("MatKhau", MatKhau);
        request.input("PhongKham", PhongKham);

        const result = await request.execute("PROC_UPDATE_THE_DOCTOR");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
    console.log(req.body);
});

app.post("/ADD_THE_EMPLOYEE", async (req, res) => {
    let { MaND, TenND, NgaySinhND, GioiTinhND, MatKhau, PhongKham } = req.body;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaND", MaND);
        request.input("TenND", TenND);
        request.input("NgaySinhND", NgaySinhND);
        request.input("GioiTinhND", GioiTinhND);
        request.input("MatKhau", MatKhau);
        request.input("PhongKham", PhongKham);

        const result = await request.execute("PROC_ADD_THE_EMPLOYEE");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/UPDATE_THE_EMPLOYEE/:MaND", async (req, res) => {
    let { TenND, NgaySinhND, GioiTinhND, MatKhau, PhongKham } = req.body;
    let { MaND } = req.params;

    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaND", MaND);
        request.input("TenND", TenND);
        request.input("NgaySinhND", NgaySinhND);
        request.input("GioiTinhND", GioiTinhND);
        request.input("MatKhau", MatKhau);
        request.input("PhongKham", PhongKham);

        const result = await request.execute("PROC_UPDATE_THE_EMPLOYEE");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
    console.log(req.body);
});

app.post("/ADD_WORK_SCHEDURE", async (req, res) => {
    let { MaLichLamViec, GioBatDau, GioKetThuc, NhaSi, NgayLamViec } = req.body;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaLichLamViec", MaLichLamViec);
        request.input("GioBatDau", GioBatDau);
        request.input("GioKetThuc", GioKetThuc);
        request.input("NhaSi", NhaSi);
        request.input("NgayLamViec", NgayLamViec);
        const result = await request.execute("ADD_WORK_SCHEDURE");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/ThemChongChiDinh/:MaBN/:MaThuoc", async (req, res) => {
    let { MaBN, MaThuoc } = req.params;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaBN", MaBN);
        request.input("MaThuoc", MaThuoc);
        const result = await request.execute("PROC_ThemChongChiDinh");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/SuaTinhTrangSucKhoeCuaBenhNhan/:MaBN", async (req, res) => {
    let { MaBN } = req.params;
    let { TongQuan } = req.body;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaBN", MaBN);
        request.input("TongQuan", TongQuan);
        const result = await request.execute("PROC_SuaTinhTrangSucKhoeCuaBenhNhan");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/SuaChongChiDinh/:MaBN", async (req, res) => {
    let { MaBN } = req.params;
    let { MaThuocCu, MaThuocMoi } = req.body;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaBN", MaBN);
        request.input("MaThuocCu", MaThuocCu);
        request.input("MaThuocMoi", MaThuocMoi);
        const result = await request.execute("PROC_SuaChongChiDinh");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

app.get("/XemChongChiDinh/:MaBN", async (req, res) => {
    let { MaBN } = req.params;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaBN", MaBN);
        const result = await request.execute("PROC_DSChongChiDinh");
        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/XoaChongChiDinh/:MaBN/:MaThuoc", async (req, res) => {
    let { MaBN, MaThuoc } = req.params;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaBN", MaBN);
        request.input("MaThuoc", MaThuoc);
        const result = await request.execute("PROC_XoaChongChiDinh");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.get("/XemKeHoachDieuTriBenhNhan/:MaBN", async (req, res) => {
    let { MaBN } = req.params;

    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaBN", MaBN);
        const result = await request.execute("PROC_XemKeHoachDieuTriBenhNhan");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/ThemKeHoachDieuTriBenhNhan", async (req, res) => {
    let { MaKHDT, MoTa, NgayDieuTri, GhiChu, TrangThai, MaBN, KhamChinh, TroKham } = req.body;

    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaKHDT", MaKHDT);
        request.input("MoTa", MoTa);
        request.input("NgayDieuTri", NgayDieuTri);
        request.input("GhiChu", GhiChu);
        request.input("TrangThai", TrangThai);
        request.input("MaBN", MaBN);
        request.input("KhamChinh", KhamChinh);
        request.input("TroKham", TroKham);
        const result = await request.execute("PROC_ThemKeHoachDieuTriBenhNhan");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/CapNhatKeHoachDieuTriBenhNhan", async (req, res) => {
    let { MaKHDT, MoTa, NgayDieuTri, GhiChu, TrangThai, MaBN, KhamChinh, TroKham } = req.body;

    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaKHDT", MaKHDT);
        request.input("MoTa", MoTa);
        request.input("NgayDieuTri", NgayDieuTri);
        request.input("GhiChu", GhiChu);
        request.input("TrangThai", TrangThai);
        request.input("MaBN", MaBN);
        request.input("KhamChinh", KhamChinh);
        request.input("TroKham", TroKham);
        const result = await request.execute("PROC_CapNhatKeHoachDieuTriBenhNhan");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/ThemChiTietKeHoachDieuTri", async (req, res) => {
    let { MaKHDT, MaDT, MaRang, MaBeMat } = req.body;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaKHDT", MaKHDT);
        request.input("MaDT", MaDT);
        request.input("MaRang", MaRang);
        request.input("MaBeMat", MaBeMat);
        const result = await request.execute("PROC_ThemChiTietKeHoachDieuTri ");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/XoaChiTietKeHoachDieuTri/:MaKHDT", async (req, res) => {
    let { MaKHDT } = req.params;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaKHDT", MaKHDT);
        const result = await request.execute("PROC_XoaChiTietKeHoachDieuTri");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.get("/DonThuoc/:MaBN", async (req, res) => {
    let { MaBN } = req.params;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaBN", MaBN);
        const result = await request.execute("PROC_XEMDANHSACHDONTHUOC");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/ThemDonThuoc", async (req, res) => {
    let { NgayLap, MaBN, NguoiLap, MaDonThuoc, MaThuoc, LieuLuong } = req.body;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaDonThuoc", MaDonThuoc);
        request.input("MaThuoc", MaThuoc);
        request.input("NgayLap", NgayLap);
        request.input("LieuLuong", LieuLuong);
        request.input("MaBN", MaBN);
        request.input("NguoiLap", NguoiLap);
        const result = await request.execute("PROC_ThemDonThuoc");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/XoaDonThuoc/:MaDonThuoc", async (req, res) => {
    let { MaDonThuoc } = req.params;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaDonThuoc", MaDonThuoc);
        const result = await request.execute("PROC_XoaDonThuoc");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.post("/SuaDonThuoc", async (req, res) => {
    let { MaDonThuoc, MaThuoc, NgayLap, LieuLuong, MaBN, NguoiLap } = req.body;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaDonThuoc", MaDonThuoc);
        request.input("MaThuoc", MaThuoc);
        request.input("NgayLap", NgayLap);
        request.input("LieuLuong", LieuLuong);
        request.input("MaBN", MaBN);
        request.input("NguoiLap", NguoiLap);
        const result = await request.execute("PROC_SuaDonThuoc");
        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.get("/XemDanhSachThanhToanCuaBenhNhan/:MaBenhNhan", async (req, res) => {
    let { MaBenhNhan } = req.params;
    try {
        await sql.connect(config);
        const request = new sql.Request();
        request.input("MaBenhNhan", MaBenhNhan);
        const result = await request.execute("PROC_XemDanhSachThanhToanCuaBenhNhan");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
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
        const result = await request.execute("PROC_LocCuocHenTheoTungNgay");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
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
        const result = await request.execute("PROC_LocCuocHenTheoNhaSi");
        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
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
        const result = await request.execute("PROC_LocCuocHenTheoNhaSi");
        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

app.get("/LocCuocHenTrongNgay", async (req, res) => {
    try {
        await sql.connect(config);
        const request = new sql.Request();

        const result = await request.execute("PROC_LocCuocHenTrongNgay");

        console.log(JSON.stringify(result.recordset));
        res.send(JSON.stringify(result.recordset));
    } catch (err) {
        res.send(err);
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`service is running on:: [${port}]`);
});
