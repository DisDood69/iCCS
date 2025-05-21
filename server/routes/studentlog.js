const express = require("express");
const router = express.Router();

//Need to add validation for student_num
//Need to add validation for subject_code
//Need to add validation for unit_num

module.exports = (db) => {
  router.post("/student_log", (req, res) => {
    
    console.log(req.body);
    const { student_num, subject_code, unit_num } = req.body;
//catch unit num error

      if (unit_num > 40 || unit_num < 0){
                return res.status(400).json({
                    error: "Invalid unit number."
                });
            }

    const sql = "SELECT * FROM student WHERE student_number = ?";
    db.query(sql, [student_num], async (err, result) => {
        if (err){
            return res.status(500).json({ error: "Something went wrong on the server." });
        }
        if (result.length === 0) {
            return res.status(400).json({
                error: "Student number does not exist. Please try again."
            });
        }

        const sql2 = "INSERT INTO student_log (student_num, subject_code, unit_num) VALUES (?, ?, ?)";
        db.query(sql2, [student_num, subject_code, unit_num], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Something went wrong on the server." });
            }

          
            res.status(200).json({ message: "Student Found" });
        });




    });
  });

  return router;
};
