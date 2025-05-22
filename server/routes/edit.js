const express = require("express");
const router = express.Router();

module.exports = (db) => {


    //Edit Student Info 
    router.put("/studentedit/:student_number", (req, res) => {
        const original_student_number = req.params.student_number;
        const { student_number, student_name, year, course, section } = req.body;
        if (!original_student_number || !student_name || !year || !course || !section) {
            return res.status(400).json({ error: "Missing required fields for student update." });
        }
        const sql = "UPDATE student SET student_number = ?, student_name = ?, year = ?, course = ?, section = ? WHERE student_number = ?";
        db.query(sql, [student_number, student_name, year, course, section, original_student_number], (err, result) => {
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
        const original_teacher_id = req.params.teacher_id;
        const { teacher_id, teacher_name, subjects } = req.body;
        console.log(req.body);
        console.log(original_teacher_id);

        if (!original_teacher_id || !teacher_id || !teacher_name) {
            return res.status(400).json({ error: "Missing required fields for teacher update." });
        }
        //UPDATE TEACHER LOG

       

        //UPDATE TEACHER 
            const updateName = "UPDATE teacher SET teacher_id = ?, teacher_name = ?  WHERE teacher_id = ?";
                db.query(updateName, [teacher_id, teacher_name,  original_teacher_id], (err, result1) => {
                if (err) {
                    console.error("Error updating teacher_log:", err);
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ error: "New Teacher ID already exists." });
                    }
                    return res.status(500).json({ error: "Failed to update teacher info." });
                }

        //DELETE TEACHER SUBJECT
            const deleteSubjects = "DELETE FROM teacher_subject WHERE teacher_id = ?";

            db.query(deleteSubjects, [teacher_id], (err) => {
                if (err){
                console.error("Error updating teacher_log:", err);
                return res.status(500).json({ error: "Something went wrong on the server." })
                }
             if (Array.isArray(subjects) && subjects.length > 0) {
                const values = subjects.map(code => [teacher_id, code]);
                const insertSubjects = "INSERT INTO teacher_subject (teacher_id, subject_code) VALUES ?";
                db.query(insertSubjects, [values], (err, result2) => {
                    if (err) {
                                return res.status(500).json({ error: "Failed to add new subjects." });
                            }
                            res.status(200).json({ message: "Teacher info and subjects updated successfully." });
                        });
            }else {

                    return res.status(200).json({ message: "Teacher info updated successfully." });
                }
            });
            });
        });

        router.put("/subjectedit/:subject_code", (req,res) => {
            const original_subject_code = req.params.subject_code;
            const {subject_code, subject_name} = req.body;
            const setSub = "UPDATE subject SET subject_code = ?, subject_name = ? WHERE subject_code = ?";
            db.query(setSub, [subject_code, subject_name, original_subject_code], (err, result) => {
                if(err){
                    return res.status(500).json({message: "Failed to update subjects"})
                }
                
                return res.status(200).json({message: "Added Subjects"})

            })
        });
   

   
    return router;
};