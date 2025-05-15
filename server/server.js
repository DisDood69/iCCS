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

const studentRoutes = require("./routes/studentlog");
app.use("/", studentRoutes(db));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
