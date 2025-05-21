const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const session = require("express-session");

const port = 5000;

const app = express();
app.use(cors({origin: "http://localhost:3000",
  credentials: true}));
app.use(express.json());

app.use(session({
  secret: "!8$C~WBU$B#%7Vi", 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

function requireLogin(req, res, next) {
  if (req.session && req.session.admin) {
    next(); 
  } else {
    res.status(401).json({ error: "Unauthorized. Please log in." });
  }
}

//CONENCTION WITH DATABASE
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

const adminLogoutRoutes = require("./routes/admin_logout");
app.use("/", adminLogoutRoutes);

const teacherlogRoutes = require("./routes/teacherlog");
app.use("/", teacherlogRoutes(db));

const editRoutes = require("./routes/edit");
app.use("/", editRoutes(db));

const addRoutes = require("./routes/add");
app.use("/", addRoutes(db));

const deleteRoutes = require("./routes/delete");
app.use("/", deleteRoutes(db));

const sortRoutes = require("./routes/sort");
app.use("/", sortRoutes(db));

const dashboardRoutes = require("./routes/dashboard");
app.use('/dashboard',dashboardRoutes(db));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/dashboard", requireLogin, (req, res) => {
  res.status(200).json({ message: "Authenticated" });
});