const { Schema, model } = require("mongoose");

const todosSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = model("todo", todosSchema);

module.exports = Todo;
