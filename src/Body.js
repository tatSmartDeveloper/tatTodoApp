import React, { useState, useEffect } from "react";
import "./Body.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Todo from "./Todo";
import firebase from "firebase";
import { db } from "./firebase";

function Body() {
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      title: input,
      timestamp: firebase.firestore.Timestamp.fromDate(new Date(date)),
      date: date,
    });
    setTodos([...todos, { title: input, date: date }]);
    setInput("");
    setDate("");
  };

  useEffect(() => {
    db.collection("todos")
      .orderBy("date", "asc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            date: doc.data().date,
          }))
        );
      });
  }, []);

  return (
    <div className="body">
      <form className="body__form">
        <div className="body__fields">
          <TextField
            id="standard-basic"
            label="Todo Name"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="body__inputField"
          />
          <TextField
            id="datetime-local"
            label="Due Date"
            type="datetime-local"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            className="body__dateField"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="body__button">
          <Button type="submit" onClick={addTodo} disabled={!input || !date}>
            Add Todo
          </Button>
        </div>
      </form>
      <div className="body__todos">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            date={todo.date}
          />
        ))}
      </div>
    </div>
  );
}

export default Body;
