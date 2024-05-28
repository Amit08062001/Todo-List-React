import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Todo() {
    let [todos, setTodos] = useState([{ task: "Sample Task", id: uuidv4(), isDone: false }]);
    let [newTodos, setNewTodos] = useState("");

    function addNewTodo() {
        setTodos((prevTodos) => {
            if (prevTodos.length === 1 && prevTodos[0].task === "Sample Task") {
                return [{ task: newTodos, id: uuidv4(), isDone: false }];
            }
            return [...prevTodos, { task: newTodos, id: uuidv4(), isDone: false }];
        });
        setNewTodos("");
    }

    let updateInput = (event) => {
        setNewTodos(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((prevTodos) => prevTodos.id !== id));
    };

    let markAllAsDone = () => {
        setTodos(todos.map((todo) => {
            return {
                ...todo,
                isDone: true
            };
        }));
    };

    let markAsDone = (id) => {
        setTodos((todos) => todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isDone: true
                };
            }
            return todo;
        }));
    };

    return (
        <div className="Todo">
            <input placeholder="Add Your list" value={newTodos} onChange={updateInput}></input>
            &nbsp; &nbsp;
            <button onClick={addNewTodo}>Add Task</button>
            <br></br>
            <hr></hr>
            <h2> Do List</h2>
            <ul>
                {
                    todos.map((todo) => (
                        <li key={todo.id}>
                            <span style={todo.isDone ? { textDecoration: "line-through" } : {}}>{todo.task}</span>
                            &nbsp; &nbsp;
                            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                            <button onClick={() => markAsDone(todo.id)}>Mark As Done</button>
                        </li>
                    ))
                }
            </ul>
            <br></br>
            <button onClick={markAllAsDone}>Mark All As Done</button>
        </div>
    );
}
