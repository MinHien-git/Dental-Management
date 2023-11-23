const express = require("express");
const db = require("./data/database");
const app = express();
const PORT = 5000 | process.env.PORT;
const mssql = require("mssql");

app.get("/", function (req, res) {
  // Config your database credential
  const config = {
    user: `SA`,
    server: "localhost",
    database: "QLDT_1",
  };

  // Connect to your database
  mssql.connect(config, function (err) {
    // Create Request object to perform
    // query operation
    let request = new mssql.Request();

    // Query to the database and get the records
    request.query("select * from GIAOVIEN", function (err, records) {
      if (err) console.log(err);

      // Send records as a response
      // to browser
      res.send(records);
    });
  });
});
app.listen(PORT, () => {
  console.log("listen to ", PORT);
});
