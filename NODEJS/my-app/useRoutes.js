const express = require('express')
const router = express.Router()

// GET request for /users
router.get("/", (req, res) => {
  res.send("List of users");
});

// POST request for /users
router.post("/", (req, res) => {
  res.send("Creating a new user");
});

// GET request for /users/:id
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User details for user with id: ${userId}`);
});

module.exports = router;