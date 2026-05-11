import { useContext, useState } from "react"
import { TodoContext } from "../context/context";

export const Filter = () => {

    const context = useContext(TodoContext);
    if(!context) throw new Error("out of provider");
    
    const [filter, setFilter] = useState("all");

    const filteredTodos = context.todos.filter((todo) => {
        if(filter === "completed") return todo.completed;
        if(filter === "not-completed") return !todo.completed;
        return true;
    })

    return(
        <>
        <h3>
            Filter
        </h3>

        <select  onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="not-completed">Not completed</option>
        </select>

        {filteredTodos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
        </div>
      ))}
    </>
  );
};
