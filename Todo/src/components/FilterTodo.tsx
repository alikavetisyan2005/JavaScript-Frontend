import type { Todo } from "./types"
import { useState } from "react"


type Props = {
    todos: Todo[];
}

type FilterType = "all" | "completed" | "notCompleted"
export const FilterTodo:React.FC<Props> = ({todos}) =>{
    const [filter,setFilter] = useState<FilterType>("all");
    
    const filteredTodos = todos.filter(todo => {
        if(filter === "completed") return todo.completed;
        if(filter === "notCompleted") return !todo.completed;
        return true;
    })

    return (
        <div>
            <h1>Filter Todo</h1>
            <select 
                className="form-select"  
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterType)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="notCompleted">Not Completed</option>
                
            </select>

        <ul>
            {
                filteredTodos.map(todo =>(
                    <li key={todo.id}>
                        {todo.text} {todo.completed? "✅" : "❌"}
                    </li>
                ))
            }
        </ul>
        </div>
    )
}