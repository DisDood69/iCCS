const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const session = require("express-session");
// USERNAME IS ccsadmin1



module.exports = (db) => {
  router.post("/admin_login", (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Invalid input" });
    }
    
    const sql = "SELECT * FROM admin WHERE username = ?";
    db.query(sql, [username], async (err, result) => {

        if (err) {
        console.error(err);
 
        return res.status(400).json({
            error: "Invalid username or password. Please try again."
        });
        }

        if (result.length === 0) {
            return res.status(400).json({
            error: "Invalid username or password. Please try again."
            });
        }

        const user = result[0];
        try{
        const match = await bcrypt.compare(password, user.password_hash);
    
        if (!match) {
            return res.status(400).json({
            error: "Invalid username or password. Please try again."
            });
        }
        
        req.session.admin = { username: user.username };
        res.status(200).json({ message: "Login successful" });
        console.log("Login successful");
        return;

        }catch (error) {
            console.error("Error comparing passwords:", error);
            return res.status(500).json({ error: "Internal server error" });
        }

        
    });
  });

  router.get("/admin_username", (req, res) => {

    if (!req.session.admin || !req.session.admin.username) {
        return res.status(401).json({ error: "Not logged in" });
    }

    const username = req.session.admin.username;
    res.status(200).json({ username });
});

  return router;
};
 