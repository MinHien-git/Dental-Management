const sql = require("mssql");

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

const get_patient_list = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const result = request.execute("PROC_XemDSBenhNhan", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};

const add_patient_information = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("@mbn", "CCCDA");
    request.input("@hoten", "Luong Minh Hien");
    request.input("@ngsinh", "1991-07-18");
    request.input("@phai", "NU");
    request.input("@sdt", "123456789");
    request.input("@email", "123@gmail456789");
    request.input("@diachi", "123 Street Luong Minh");

    const result = request.execute("PROC_ThemTTBenhNhan", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};
const edit_patient_information = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("@mbn", "CCCDA");
    request.input("@hoten", "Luong Minh Hien");
    request.input("@ngsinh", "1991-07-18");
    request.input("@phai", "NU");
    request.input("@sdt", "123456789");
    request.input("@email", "123@gmail456789");
    request.input("@diachi", "123 Street Luong Minh");

    const result = request.execute("PROC_SuaTTBenhNhan", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};

const edit_patient_health = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("@mbn", "CCCDA");
    request.input("@tq", "Luong Minh Hien");

    const result = request.execute("PROC_ThemTQSucKhoeBN", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};

const add_patient_note = (req, res) => {};
const edit_patient_note = (req, res) => {};

const edit_patient_dental = (req, res) => {};

const get_patient_treatment = (req, res) => {};
const update_patient_treatment = (req, res) => {};
const edit_patient_treatment = (req, res) => {};

const get_patient_payment = (req, res) => {};

const update_patient_medicine = (req, res) => {};
const edit_patient_medicine = (req, res) => {};
const add_patient_medicine = (req, res) => {};

const get_patient_schedule = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const result = request.execute("PROC_GET_SCHEDURE", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};

const create_patient_schedule = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();

    request.input("@EmailBN", "NK123");
    request.input("@DiaChiBN", "NK123456");
    request.input("@HotenBN", "12345");
    request.input("@GioiTinhBN", "NK123456");
    request.input("@Ngay", "NK123456");
    request.input("@Gio", "NK123456");
    request.input("@KhamChinh", "NK123456");
    request.input("@TroKham", "NK123456");
    request.input("@MaPhong", "NK123456");
    request.input("@MaPK", "NK123456");

    const result = request.execute("PROC_CREATE_SCHEDURE", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};

const get_patient_request = (req, res) => {};

const delete_patient_request = (req, res) => {};

const get_doctor_list = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const result = request.execute("PROC_ALL_THE_DOCTOR", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};

const get_all_employee = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const result = request.execute("PROC_ALL_THE_EMPLOYEE", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};

const get_doctor_schedule = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const result = request.execute("PROC_NhaSi_LichLamViec", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};

const get_medicine = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const result = request.execute("PROC_XemThuoc", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};

const get_schedure_from_to = async (req, res) => {
  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input("@start", "1991-12-12");
    request.input("@end", "1991-12-12");
    const result = request.execute("PROC_LichHenDenNgay", (err, result) => {
      console.log(result.output);
    });
    res.send("DB Connected");
  } catch (err) {
    res.send(err);
  }
};
