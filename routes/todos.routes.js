const router = require("express").Router();
const Todo = require("../models/Todos.model");

// CRUD - app
router.get("/todos", async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.json({ todos });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Error in fetching todos from server! " + err.message,
    });
  }

  // how to send errors example
  //   res.status(403).json({ errorMessage: "Denied Access!" });
});

router.put("/todos", async (req, res, next) => {
  try {
    const { _id, name, done } = req.body;
    if (!_id) {
      return res
        .status(400)
        .json({ errorMessage: "Please provide a valid _id in your request" });
    }
    const afterUpdate = await Todo.findByIdAndUpdate(
      _id,
      { name, done },
      { new: true }
    );
    res.json({
      message: "Successfully updated todo!",
      updatedTodo: afterUpdate,
    });
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Error in updating todo! " + err.message });
  }
});

router.delete("/todos", async (req, res, next) => {
  try {
    const { id } = req.body;
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Successfully delete todo " + id });
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Error in deleting todo! " + err.message });
  }
});

router.post("/todos", async (req, res, next) => {
  try {
    const { name, done } = req.body;
    console.log("Should create a new todo with", name, done);
    const newTodo = new Todo({ name, done });
    await newTodo.save();
    res.json({ message: "Succesfully created todo", todo: newTodo });
  } catch (err) {
    res.status(400).json({
      errorMessage: "Please provide correct request body! " + err.message,
    });
  }
});

module.exports = router;
