const express = require("express");
const router = express.Router();

module.exports = (db) => {

    router.get("/sortstudent", (req, res) => {
        const column = req.query.column || "student_number";
        const order = req.query.order === "desc" ? "DESC" : "ASC";
        const studentColumns = ["student_number", "student_name", "year", "course", "section"];
        if (!studentColumns.includes(column)) {
            return res.status(400).json({ error: "Invalid column for sorting." });
        }

        const sort = `SELECT * FROM student ORDER BY ${column} ${order}`;
        db.query(sort, (err, result) => {
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


     router.get("/sortteacher", (req, res) => {
        const column = req.query.column || "teacher_id";
        const order = req.query.order === "desc" ? "DESC" : "ASC";
        const teacherColumns = ["teacher_id", "teacher_name"];
        if (!teacherColumns.includes(column)) {
            return res.status(400).json({ error: "Invalid column for sorting." });
        }

        const sql = `
            SELECT 
                t.teacher_id, 
                t.teacher_name, 
                GROUP_CONCAT(DISTINCT CONCAT(s.subject_code, ' - ', s.subject_name) SEPARATOR '\n') AS subjects
            FROM teacher t
            LEFT JOIN teacher_subject ts ON t.teacher_id = ts.teacher_id
            LEFT JOIN subject s ON ts.subject_code = s.subject_code
            GROUP BY t.teacher_id, t.teacher_name
            ORDER BY ${column} ${order};
        `;
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

   router.get("/sortstudentlog", (req, res) => {
    const column = req.query.column || "log_id";
    const order = req.query.order === "desc" ? "DESC" : "ASC";

   
    const columnMap = {
        log_id: "sl.log_id",
        student_number: "s.student_number", 
        student_name: "s.student_name",    
        subject_code: "sl.subject_code",
        log_timestamp: "sl.log_timestamp",
        unit_num: "sl.unit_num"
    };

 
    const sqlColumn = columnMap[column];
    if (!sqlColumn) {
        return res.status(400).json({ error: "Invalid column for sorting." });
    }

    const sql = `
        SELECT sl.log_id, s.student_number, s.student_name, sl.subject_code, sl.log_timestamp, sl.unit_num 
        FROM student_log sl 
        JOIN student s ON sl.student_num = s.student_number
        ORDER BY ${sqlColumn} ${order};
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Something went wrong on the server." });
        }
        if (result.length === 0) {
            return res.status(400).json({ error: "No students found." });
        }
        res.status(200).json(result);
    });
});

    router.get("/sortteacherlog", (req, res) => {
        const column = req.query.column || "log_id";
        const order = req.query.order === "desc" ? "DESC" : "ASC";
        const teacherlogColumns = ["log_id", "teacher_id", "teacher_name", "subject_code", "log_timestamp"];
        if (!teacherlogColumns.includes(column)) {
            return res.status(400).json({ error: "Invalid column for sorting." });
        }
        const sql = 
        `SELECT tl.log_id, t.teacher_id, t.teacher_name, tl.subject_code, tl.log_timestamp 
        FROM teacher_log tl 
        JOIN teacher t ON tl.teacher_id = t.teacher_id
        ORDER BY ${column} ${order};`

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


    return router;
}



