const post_login = async (req, res) => {
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
};

const post_register = async (req, res) => {
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
};

module.exports = {
  post_register,
  post_login,
};
