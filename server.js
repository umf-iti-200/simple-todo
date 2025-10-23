const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'))
app.use(bodyParser.json())

let COUNT = 2;

let todos = [
  { id: 1, title: "Buy Groceries" }
];

app.get("/api/todos", function (req, res) {

  res.json(todos);
});

app.post("/api/todos/save", function (req, res) {

  let { title } = req.body;

  if (!title) {
    res.status(500).json({ message: "Title is required" });
    return;
  }
  
  title = title.trim();

  if (title === "") {
    res.status(500).json({ message: "Title should not be blank" });
    return;
  }

  if (title.length > 15) {
    res.status(500).json({ message: "Title should be <= 15 characters" });
    return;
  }

  const todo = {
    id: COUNT++,
    title: title
  }

  todos.push(todo)

  res.json({ message: "ToDo created successfully" });
});

app.post("/api/todos/remove", function (req, res) {

  const { id } = req.body;

  if (!id) {
    res.status(500).json({ message: "ID is required" });
    return;
  }

  todos = todos.filter(t => t.id !== id);

  res.json({ message: "ToDo removed successfully" });
});

app.listen(80, () => {
  console.log("Listening on port 80");
});
