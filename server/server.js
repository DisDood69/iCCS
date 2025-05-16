const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");


const port = 5000;

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user:  "root",
    password: "",
    database: "iccs",
    port: 3306
});

const studentlogRoutes = require("./routes/studentlog");
app.use("/", studentlogRoutes(db));

const adminRoutes = require("./routes/admin");
app.use("/", adminRoutes(db));

const teacherlogRoutes = require("./routes/teacherlog");
app.use("/", teacherlogRoutes(db));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
