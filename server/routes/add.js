const express = require("express");
const router = express.Router();


module.exports = (db) => {
  router.post("/add_student", (req, res) => {
    
    console.log(req.body);
    const {student_number, student_name, year, course, section} = req.body;
    const sql = "INSERT INTO student (student_number, student_name, year, course, section) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [student_number, student_name, year, course, section], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Something went wrong on the server." });
        }
        if (result.length === 0) {
            return res.status(400).json({ error: "Invalid input" });
        }
        res.status(200).json({ message: "Teacher Found" });
    });

    });

    router.post("/add_teacher", (req, res) => {

        console.log(req.body);
        const { teacher_id, teacher_name, subjects_code } = req.body;
        const sql = "INSERT INTO teacher (teacher_id, teacher_name) VALUES (?, ?)";
        db.query(sql, [teacher_id, teacher_name], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Something went wrong on the server." });
            }
            if (result.length === 0) {
                return res.status(400).json({ error: "Invalid input" });
            }
            const values = subjects_code.map(code => [teacher_id, code]);
            const insertSubjects = "INSERT INTO teacher_subject (teacher_id, subject_code) VALUES ?";
            db.query(insertSubjects, [values], (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Failed to add new subjects." });
                }
                res.status(200).json({ message: "Teacher Found" });
            });
        });    
    });

      return router;
  };

