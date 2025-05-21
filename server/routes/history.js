const express = require("express");
const router = express.Router();


module.exports = (db) => {
router.get("/studentlogs", (req, res) => {
    const sql = "SELECT sl.log_id, s.student_number, s.student_name, sl.subject_code, sl.log_timestamp, sl.unit_num FROM student_log sl JOIN student s ON sl.student_num = s.student_number;";
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

router.get("/teacherlogs", (req, res) => {
    const sql = "SELECT tl.log_id, t.teacher_id, t.teacher_name, tl.subject_code, tl.log_timestamp FROM teacher_log tl JOIN teacher t ON tl.teacher_id = t.teacher_id;";
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Something went wrong on the server." });
        }
        if (result.length === 0) {
            return res.status(400).json({
                error: "No teachers found."
            });
        }
        res.status(200).json(result);
    });

})

    return router;
};
