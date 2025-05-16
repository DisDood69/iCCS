const express = require("express");
const router = express.Router();


module.exports = (db) => {
  router.post("/teacher_log", (req, res) => {
    
    console.log(req.body);
    const { teacher_id, subject_code} = req.body;

    const sql = "SELECT * FROM teacher WHERE teacher_id = ?";
    db.query(sql, [teacher_id], async (err, result) => {
        if (err){
            return res.status(500).json({ error: "Something went wrong on the server." });
        }
        if (result.length === 0) {
            return res.status(400).json({
                error: "Teacher ID does not exist. Please try again."
            });
        }

        const sql2 = "INSERT INTO teacher_log (teacher_id, subject_code) VALUES (?, ?)";
        db.query(sql2, [teacher_id, subject_code], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Something went wrong on the server." });
            }

          
            res.status(200).json({ message: "Data inserted successfully" });
        });




    });
  });

  return router;
};
