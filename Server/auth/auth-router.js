const express = require("express");

const router = express.Router();

const {
  home,
  register,
  login,
  createtodo,
  updateTodo,
  deletetodo,
  fetchtodo,
} = require("../auth-controller/controller");

router.get("/", home);
router.post("/register", register);
router.post("/login", login);

router.post("/createtodo", createtodo);
router.patch("/updatetodo/:id", updateTodo);
router.delete("/deletetodo/:id", deletetodo);
router.get("/fetchtodo", fetchtodo);

module.exports = router;
