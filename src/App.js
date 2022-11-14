import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { v4 as uuidv4 } from "uuid";

function id() {
  return uuidv4();
}

function App() {
  const [cases, setCases] = useState([]);
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(null);

  function handleChange(event) {
    setValue(event.target.value);
  }

  function updateItem(id, title, completed) {
    const newCases = cases.map((elem) =>
      elem.id === id ? { id, title, completed } : elem
    );
    setCases(newCases);
    setEdit("");
  }

  function addItem() {
    if (!edit) {
      setCases([...cases, { id: id(), title: value, completed: false }]);
      setValue("");
    } else {
      updateItem(edit.id, value, edit.completed);
      setValue("");
    }
    console.log(cases);
  }

  function deleteItem(elem) {
    setCases(cases.filter((item) => item.id !== elem.id));
    console.log(elem);
  }

  function editItem(elem) {
    const findId = cases.find((item) => item.id === elem.id);
    setEdit(findId);
    console.log(findId.id);
    if (findId) {
      setValue(findId.title);
    } else {
      setValue("");
    }
  }

  function completedItem(elem) {
    setCases(
      cases.map((item) => {
        if (item.id === elem.id) {
          item.completed = !item.completed;
        }
        return item;
      })
    );
  }

  const result = cases.map((elem) => {
    return (
      <li
        className={elem.completed ? "elementList textdec" : "elementList"}
        key={elem.id}
      >
        {elem.title}
        <div className="blockBtn">
          <button className="iconBtn" onClick={() => completedItem(elem)}>
            copmlited
          </button>
          <button className="iconBtn" onClick={() => editItem(elem)}>
            edit
          </button>
          <button className="iconBtn" onClick={() => deleteItem(elem)}>
            delete
          </button>
        </div>
      </li>
    );
  });

  return (
    <div className="container">
      <div className="blockApp">
        <div>
          <Header />
        </div>
        <div className="listItem">
          <div className="blockInput">
            <input
              value={value}
              className="inp"
              onChange={(event) => handleChange(event)}
              placeholder="Enter a todo..."
            />
            <button className="btn" onClick={addItem}>
              {edit ? "ok" : "add"}
            </button>
          </div>
          <div>{result}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
