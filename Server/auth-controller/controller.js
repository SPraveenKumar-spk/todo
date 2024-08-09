const user = require("../models/user");
const Todo = require("../models/task");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const home = async (req, res) => {
  res.status(200).send("Hello from Home");
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isExited = await user.findOne({ email });
    if (isExited) {
      return res.status(401).json({ msg: "email already existed" });
    }

    const createUser = await user.create({
      name,
      email,
      password,
    });

    const token = await createUser.generateTokens();

    res.status(200).json({
      message: "created user successfully",
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isExisted = await user.findOne({ email });

    if (!isExisted) {
      return res.status(401).json({ message: "user not found" });
    }
    const validPassword = await bcrypt.compare(password, isExisted.password);
    if (!validPassword) {
      return res.status(404).json({ message: "bad credentials" });
    }
    const token = await isExisted.generateTokens();
    res.status(200).json({ message: "user login successfull", token: token });
  } catch (err) {
    console.log(err);
  }
};

const createtodo = async (req, res) => {
  try {
    const auth = req.headers.authorization;
    const token = auth.replace("Bearer", "").trim();
    const secret_key = process.env.JWT_SECRET_KEY;
    const decodedUser = jwt.verify(token, secret_key);

    const userId = decodedUser.userId;

    const { todoName, lastDate, description, bookmark } = req.body;

    if (!todoName || !lastDate) {
      return res
        .status(400)
        .json({ error: "todoName and lastDate are required" });
    }
    const newTodo = await Todo.create({
      todoName,
      description: description || "",
      bookmark: bookmark || false,
      lastDate,
      userId,
    });

    res.status(201).json({
      id: newTodo._id,
      todoName: newTodo.todoName,
      lastDate: newTodo.lastDate,
      description: newTodo.description,
      bookmark: newTodo.bookmark,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create todo item" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, bookmark } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { description, bookmark },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update todo item" });
  }
};

const deletetodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo item not found" });
    }

    res.status(200).json({ message: "Todo item deleted successfully" });
  } catch (error) {
    console.error("Error while deleting todo item:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const fetchtodo = async (req, res) => {
  try {
    const auth = req.headers.authorization;
    const token = auth.replace("Bearer", "").trim();
    const secret_key = process.env.JWT_SECRET_KEY;
    const decodedUser = jwt.verify(token, secret_key);
    const tasks = await Todo.find({ userId: decodedUser.userId });

    res.json(tasks);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  home,
  register,
  login,
  createtodo,
  updateTodo,
  deletetodo,
  fetchtodo,
};
