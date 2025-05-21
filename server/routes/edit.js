const express = require("express");
const router = express.Router();

module.exports = (db) => {


    //Edit Student Info 
    router.put("/studentedit/:student_number", (req, res) => {
        const student_number = req.params.student_number;
        const { student_name, year, course, section } = req.body;
        const sql = "UPDATE student SET student_name = ?, year = ?, course = ?, section = ? WHERE student_number = ?";
        db.query(sql, [student_name, year, course, section, student_number], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Something went wrong on the server." });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Student not found." });
            }
            res.status(200).json({message: "Student info updated successfully."});
        });
    })

    //Edit Teacher Info
    router.put("/teacheredit/:teacher_id", (req, res) => {
        const teacher_id = req.params.teacher_id;
        const { teacher_name, subjects } = req.body;
        const updateName = "UPDATE teacher SET teacher_name = ?  WHERE teacher_id = ?";
        db.query(updateName, [teacher_name, teacher_id ], (err, result) => {
            if (err)return res.status(500).json({ error: "Something went wrong on the server." });
            const deleteSubjects = "DELETE FROM teacher_subject WHERE teacher_id = ?";

            db.query(deleteSubjects, [teacher_id], (err) => {
                if (err) return res.status(500).json({ error: "Something went wrong on the server." })

             if (Array.isArray(subjects) && subjects.length > 0) {
                const values = subjects.map(code => [teacher_id, code]);
                const insertSubjects = "INSERT INTO teacher_subject (teacher_id, subject_code) VALUES ?";
                db.query(insertSubjects, [values], (err) => {
                    if (err) return res.status(500).json({ error: "Failed to add new subjects." });
                    res.status(200).json({ message: "Teacher info updated successfully." });
                });
            }else {

                    return res.status(200).json({ message: "Teacher info updated successfully." });
                }
            });
        });
    });

    return router;
};