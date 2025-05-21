const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/studentinfo", (req, res) => {
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

})

router.get("/subjectinfo", (req, res) => {
    const sql = "SELECT * FROM subject";
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Something went wrong on the server." });
        }
        if (result.length === 0) {
            return res.status(400).json({
                error: "No subjects found."
            });
        }
        res.status(200).json(result);
    });

})  

router.get("/teacherinfo", (req, res) => {
   const sql = `
    SELECT 
      t.teacher_id, 
      t.teacher_name, 
      GROUP_CONCAT(DISTINCT CONCAT(s.subject_code, ' - ', s.subject_name) SEPARATOR '\n') AS subjects
    FROM teacher t
    LEFT JOIN teacher_subject ts ON t.teacher_id = ts.teacher_id
    LEFT JOIN subject s ON ts.subject_code = s.subject_code
    GROUP BY t.teacher_id, t.teacher_name;
    `;
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Something went wrong on the server." });
        }
        if (result.length === 0) {
            return res.status(400).json({
                error: "No teacher found."
            });
        }
        res.status(200).json(result);
    });

})
    return router;
}