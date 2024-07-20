import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

const Todo = (props) => {
    const [todos, setTodos] = useContext(TodoContext);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const completeTodo = (id) => {
        const updatedTodos = todos.map((item) => {
            if (item.id === id) {
                item.completed = !item.completed;
            }
            return item;
        });
        setTodos(updatedTodos);
    };

    const deleteTodo = (id) => {
        const filteredTodos = todos.filter((item) => item.id !== id);
        setTodos(filteredTodos);
    };

    const updateTodo = (id) => {
        const updatedTodos = todos.map((item) => {
            if (item.id === id && newTitle.trim() !== "") {
                item.title = newTitle;
            }
            return item;
        });
        setTodos(updatedTodos);
        setNewTitle("");
        setIsEditing(false);
    };

    return (
        <>
            <div className="todo-item">
                {isEditing ? (
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Update title"
                        style={{width:"100%"}}
                    />
                ) : (
                    <label
                        htmlFor={props.id}
                        className={props.completed ? "completed" : ""}
                    >
                        {props.title}
                    </label>
                )}
                <div className="todo-actions">
                    {isEditing ? (
                        <button
                            type="button"
                            className="btn-update"
                            onClick={() => updateTodo(props.id)}
                        >
                            SAVE
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="btn-update"
                            onClick={() => setIsEditing(true)}
                        >
                            UPDATE
                        </button>
                    )}
                    <button
                        type="button"
                        className="btn-complete"
                        onClick={() => completeTodo(props.id)}
                    >
                        {props.completed ? "UNMARK AS COMPLETED" : "MARK AS COMPLETED"}
                    </button>
                    <button
                        type="button"
                        className="btn-delete"
                        onClick={() => deleteTodo(props.id)}
                    >
                        DELETE
                    </button>
                    
                    
                </div>

                

            </div>
        </>
    );
};

export default Todo;

