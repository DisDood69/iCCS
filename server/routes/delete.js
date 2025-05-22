
const express = require("express");
const router = express.Router();

module.exports = (db) => {
    router.delete("/studentdelete/:student_number", (req, res) => {
        const student_number = req.params.student_number;
        const sql = "DELETE FROM student WHERE student_number = ?";
        db.query(sql, [student_number], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Something went wrong on the server." });
            }
            if (result.affectedRows === 0) {
                return res.status(400).json({ error: "No student found with that number." });
            }
            res.status(200).json({ message: "Student deleted successfully." });
        });


    })

    router.delete("/teacherdelete/:teacher_id", (req, res) => {
        const teacher_id = req.params.teacher_id;
        const deleteTeacherSubject = "DELETE FROM teacher_subject WHERE teacher_id = ?";
        db.query(deleteTeacherSubject, [teacher_id], (err, result) => {
            if (err) {
                console.error("Error deleting from teacher_subject:", err);
                return res.status(500).json({ error: "Something went wrong on the server." });
            }

            const deleteTeacher = "DELETE FROM teacher WHERE teacher_id = ?";
            db.query(deleteTeacher, [teacher_id], (err) => {

            if (err) {
                return res.status(500).json({ error: "Something went wrong on the server." });
            }
            if (result.affectedRows === 0) {
                return res.status(400).json({ error: "No teacher found with that ID." });
            }
            res.status(200).json({ message: "Teacher deleted successfully." });
            });
        });
    })

    router.delete("/subjectdelete/:subject_code", (req,res) => {
        const subject_code = req.params.subject_code;
        const delete_sub = "DELETE FROM subject WHERE subject_code = ?";
        db.query(delete_sub, [subject_code], (err, result) =>{
        if (err) {
                return res.status(500).json({ error: "Something went wrong on the server." });
            }
            if (result.affectedRows === 0) {
                return res.status(400).json({ error: "No Subject found with that ID." });
            }
            res.status(200).json({ message: "Subject deleted successfully." });

        })
    })
    return router;
}