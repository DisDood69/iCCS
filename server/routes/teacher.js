const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/teacher_log", (req, res) => {
    console.log(req.body);
    const { teacher_id, subject_code } = req.body;
    const sql = "INSERT INTO teacher_log (teacher_id, subject_code) VALUES (?, ?)";
    db.query(sql, [teacher_id, subject_code], (err, result) => {
      if (err) {
        console.error(err);
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({
          error: "Invalid student number or subject code. Please select from the provided list."
        });
      }
      return res.status(500).json({ error: "Something went wrong on the server." });
      
    }res.status(200).json({ message: "Data inserted successfully" });
  });
  });

  return router;
};
