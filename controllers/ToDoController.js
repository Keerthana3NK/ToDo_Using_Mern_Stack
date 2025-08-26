const ToDoModel = require("../models/ToDoModel");

// GET all todos
module.exports.getToDo = async (req, res) => {
  try {
    const toDo = await ToDoModel.find();
    res.send(toDo);
  } catch (err) {
    res.status(500).send(err);
  }
};

// SAVE new todo
module.exports.saveToDo = async (req, res) => {
  const { text } = req.body;
  ToDoModel.create({ text })
    .then((data) => {
      console.log("Added Successfully....");
      console.log(data);
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error("Error saving todo:", err);
      res.status(500).send(err);
    });
};

// UPDATE todo
module.exports.updateToDo = async (req, res) => {
  const { _id, text } = req.body;
  ToDoModel.findByIdAndUpdate(_id, { text }, { new: true }) // return updated doc
    .then((updated) => {
      if (!updated) return res.status(404).send("Todo not found");
      res.status(200).send("Updated Successfully");
    })
    .catch((err) => {
      console.error("Error updating todo:", err);
      res.status(500).send(err);
    });
};

// DELETE todo
module.exports.deleteToDo = async (req, res) => {
  const { _id } = req.body;
  ToDoModel.findByIdAndDelete(_id)
    .then((deleted) => {
      if (!deleted) return res.status(404).send("Todo not found");
      res.status(200).send("Deleted Successfully");
    })
    .catch((err) => {
      console.error("Error deleting todo:", err);
      res.status(500).send(err);
    });
};


