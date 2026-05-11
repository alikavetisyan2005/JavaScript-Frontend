import type React from "react"
import type { Todo } from "../context/types"
import { useContext } from "react"
import { TodoContext } from "../context/context"

type Props = {
    todo: Todo
}
export const TodoItem:React.FC<Props> = ({todo}) => {
    const context = useContext(TodoContext);
    if(!context) throw new Error("Out of provider...");

    return(
        <>
        <div>
            <p>{todo.text}</p>
            <button className="btn" onClick={() => context.handleRemove(todo.id)}>Delete</button>
        </div>
        </>
    )
}