const bcrypt = require("bcrypt");

const plainPassword = "admin123"; // Replace with your actual password

bcrypt.hash(plainPassword, 10).then(hash => {
  console.log("Hashed password:", hash);
});
