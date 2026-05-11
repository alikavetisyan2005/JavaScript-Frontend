import { useContext } from "react"
import { TodoContext } from "../context/context"
import { TodoItem } from "./TodoItem";

export const List = () => {
    const context = useContext(TodoContext);
    if(!context) throw new Error("Out of provider...")
    return(
        <>
        <h1>
            List
        </h1>
        <div>

        {
            context.todos.map(todo => (
                <TodoItem
                key={todo.id}
                todo={todo}
                />
            ))
        }

        </div>

        </>
    )
}