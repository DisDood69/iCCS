const express = require("express");
const router = express.Router();

module.exports = (db) => {

    router.post("/dashboard", (req, res) => {
        const sql = "SELECT * FROM student";
        db.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Something went wrong on the server." });
            }
            if (result.length === 0) {
                return res.status(400).json({
                    error: "No students found."
                });
            }
            res.status(200).json(result);
        });
    });




}