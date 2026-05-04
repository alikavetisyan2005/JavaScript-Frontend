import { TodoItem } from "./TodoItem"
import type { Todo } from "./types"
type Props = {
    todos: Todo[],
    onDelete: (id: string) => void,
    onComplete: (id:string) => void,
}
export const List:React.FC<Props> = ({todos, onDelete, onComplete}) =>{
    return (
        <div>
            <h1>List</h1>
            {todos.map(todo =>
                <TodoItem 
                key={todo.id} 
                todo={todo}
                onDelete={onDelete}
                onComplete={onComplete}
                />
            )}
        </div>
    )
}