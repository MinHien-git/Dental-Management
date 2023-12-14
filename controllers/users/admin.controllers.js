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

const add_doctor = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();

    request.input("@MaND", "NK123");
    request.input("@TenND", "NK123456");
    request.input("@NgaySinhND", "12345");
    request.input("@GioiTinhND", "NK123456");
    request.input("@MatKhau", "NK123456");
    request.input("@LoaiNguoiDung", "NK123456");
    request.input("@PhongKham", "NK123456");

    const result = request.execute("PROC_ADD_THE_DOCTOR", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};
const edit_doctor = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();

    request.input("@MaND", "NK123");
    request.input("@TenND", "NK123456");
    request.input("@NgaySinhND", "12345");
    request.input("@GioiTinhND", "NK123456");
    request.input("@MatKhau", "NK123456");
    request.input("@LoaiNguoiDung", "NK123456");
    request.input("@PhongKham", "NK123456");

    const result = request.execute("PROC_UPDATE_THE_DOCTOR", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};

const add_employee = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();

    request.input("@MaND", "NK123");
    request.input("@TenND", "NK123456");
    request.input("@NgaySinhND", "12345");
    request.input("@GioiTinhND", "NK123456");
    request.input("@MatKhau", "NK123456");
    request.input("@LoaiNguoiDung", "NK123456");
    request.input("@PhongKham", "NK123456");

    const result = request.execute("PROC_ADD_THE_EMPLOYEE", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};

const edit_employee = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();

    request.input("@MaND", "NK123");
    request.input("@TenND", "NK123456");
    request.input("@NgaySinhND", "12345");
    request.input("@GioiTinhND", "NK123456");
    request.input("@MatKhau", "NK123456");
    request.input("@LoaiNguoiDung", "NK123456");
    request.input("@PhongKham", "NK123456");

    const result = request.execute(
      "PROC_UPDATE_THE_EMPLOYEE",
      (err, result) => {
        console.log(result.output);
      }
    );
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};

const add_schedule_to_doctor = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    // @MaLichLamViec char(5),
    // @GioBatDau time(7),
    // @GioKetThuc time(7),
    // @NhaSi char(5),
    // @NgayLamViec char(5)
    request.input("@MaLichLamViec", "NK123");
    request.input("@GioBatDau", "NK123456");
    request.input("@GioKetThuc", "12345");
    request.input("@NhaSi", "NK123456");
    request.input("@NgayLamViec", "NK123456");

    const result = request.execute("ADD_WORK_SCHEDURE", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};

const add_medicine = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("@mathuoc", "NK123");
    request.input("@tenthuoc", "NK123456");
    request.input("@gia", "12345");
    request.input("@donvi", "NK123456");
    const result = request.execute("PROC_ThemThuoc", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};
const delete_medicine = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("@mathuoc", "NK123");
    const result = request.execute("PROC_XoaThuoc", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};
const update_medicine = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("@mathuoc", "NK123");
    request.input("@tenthuoc", "NK123456");
    request.input("@gia", "12345");
    request.input("@donvi", "NK123456");
    const result = request.execute("PROC_SuaThuoc", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};

const get_report_one_day = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("@ngay", "1991-12-12");
    const result = request.execute("PROC_KHDTtrongNgay", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};
