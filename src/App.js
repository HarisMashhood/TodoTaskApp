import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./styles.css";

const getLocalItems = () => {
  let list = localStorage.getItem("Harislists");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
const App = () => {
  const [task, setTask] = useState("");
  const [values, setValues] = useState(getLocalItems);
  const [togglebtn, setTogglebtn] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const deleteIcon = (
    <svg
      style={{
        width: "15px",
        height: "18px",
        backgroundColor: "gray",
        alignItems: "center"
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
    </svg>
  );
  const editIcon = (
    <svg
      style={{
        width: "15px",
        height: "18px",
        backgroundColor: "gray",
        alignItems: "center"
      }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
    </svg>
  );

  const funct = (e) => {
    e.preventDefault();
    if (!task) {
      alert("Add Input data");
    } else if (task && !togglebtn) {
      setValues(
        values.map((elem) => {
          if (elem.id === editItem) {
            return { ...elem, task: task };
          }
          return elem;
        })
      );
      setTogglebtn(true);

      setTask("");

      setEditItem(null);
    } else {
      const newValues = {
        id: new Date().getTime().toString(),
        task: task
      };
      setValues([...values, newValues]);
      setTask("");
    }
  };
  const deleteItems = (index) => {
    const updatedvalues = values.filter((elem) => {
      return index !== elem.id;
    });
    setValues(updatedvalues);
  };
  const editItems = (id) => {
    let editvalues = values.find((elem) => {
      return elem.id === id;
    });
    console.log(editvalues);
    setTogglebtn(false);

    setTask(editvalues.task);

    setEditItem(id);
  };
  useEffect(() => {
    localStorage.setItem("Harislists", JSON.stringify(values));
  }, [values]);
  return (
    <div className="App">
      <Header values={values} />
      <form action="" onSubmit={funct}>
        <div
          className="formstyle"
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            color: "hsl(235,24%, 19%)"
          }}
        >
          <h2>Enter Task</h2>
          <br />
          <label htmlFor="task" style={{ color: "white" }}>
            Enter your task
          </label>
          <input
            style={{
              backgroundColor: "whitesmoke",
              border: "1.5px solid black",
              borderRadius: "5px",
              marginLeft: "15px",
              padding: "2px 8px"
            }}
            type="text"
            value={task}
            id="task"
            onChange={(e) => setTask(e.target.value)}
          />

          <button
            style={{
              color: "hsl(234, 39%, 85%)",
              fontWeight: "bold",
              backgroundColor: "hsl(235,24%, 19%)",
              border: "1px solid gray",
              borderRadius: "5px",
              gap: "10px",
              padding: "2px 8px"
            }}
            type="submit"
          >
            {togglebtn ? "ADD" : "EDIT"}
          </button>
        </div>
      </form>

      {values.map((curElem) => {
        return (
          <div className="lists">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 20px",
                fontSize: "20px",
                color: "white",
                fontWeight: "bold",
                letterSpacing: "3px",
                backgroundColor: "hsl(235,24%, 19%)",
                borderBottom: "1px solid grey",
                gap: "20px"
              }}
              key={curElem.id}
            >
              <div style={{ display: "flex" }}>
                <div className="check">
                  <button className="check-mark"></button>
                </div>
                <p>{curElem.task}</p>
              </div>
              <div style={{ display: "flex", gap: "10px", cursor: "pointer" }}>
                <div
                  className="deleteIconImg"
                  onClick={() => deleteItems(curElem.id)}
                >
                  {deleteIcon}
                </div>
                <div
                  className="editIconImg"
                  onClick={() => editItems(curElem.id)}
                >
                  {editIcon}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
