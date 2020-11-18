import React, { useState } from "react";
import "./Todo.css";
import {
  List,
  ListItem,
  ListItemText,
  Modal,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import firebase from "firebase";
import { db } from "./firebase";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo({ id, title, date }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const updateTodo = (e) => {
    e.preventDefault();
    db.collection("todos")
      .doc(id)
      .set(
        {
          title: input,
          timestamp: firebase.firestore.Timestamp.fromDate(new Date(date)),
          date: inputDate,
        },
        { merge: true }
      );
    setInput("");
    setInputDate("");
    setOpen(false);
  };

  const deleteTodo = (e) => {
    db.collection("todos").doc(id).delete();
  };

  return (
    <div className="todo">
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div style={modalStyle} className={`${classes.paper} todo__modal`}>
          <h1>Edit Todo</h1>
          <TextField
            id="standard-basic"
            label={title}
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="todo__updateTitle"
          />
          <TextField
            id="datetime-local"
            label="Due Date"
            type="datetime-local"
            onChange={(e) => setInputDate(e.target.value)}
            defaultValue={date}
            value={inputDate}
            className="todo__updateDate"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button onClick={updateTodo} color="primary" disabled={!input}>
            Update Todo
          </Button>
        </div>
      </Modal>

      <List className="todo__list">
        <ListItem>
          <ListItemText primary={title} secondary={new Date(date).toString()} />
          <EditIcon onClick={(e) => setOpen(true)} />
          <DeleteForeverIcon onClick={deleteTodo} />
        </ListItem>
      </List>
    </div>
  );
}

export default Todo;
