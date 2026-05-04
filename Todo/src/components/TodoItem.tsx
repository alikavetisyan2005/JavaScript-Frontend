import type { Todo } from "./types"
import { Api } from "../utility/api"
type Props = {
    todo: Todo;
    onDelete: (id: string) => void;
    onComplete: (id: string) => void
}

export const TodoItem:React.FC<Props> = ({todo, onDelete, onComplete}) =>{
    
    const handleDelete = ():void =>{
        Api.delete(`/todos/${todo.id}`)
        .then(() =>{
            onDelete(todo.id)
        })
    }
    return(
        <div className="card shadow-sm mb-2">
            <div className="card-body d-flex justify-content-between align-items-center">
    
        <div>
            <h6
            className={`mb-0 ${
            todo.completed ? "text-decoration-line-through text-muted" : ""
            }`}>
            {todo.text}
        </h6>
        </div>

    <div>
      <button
        onClick={() => onComplete(todo.id)}
        className={`btn btn-sm ${
          todo.completed ? "btn-secondary" : "btn-success"
        } me-2`}
      >
        {todo.completed ? "Cancel" : "Complete"}
      </button>

      <button
        onClick={handleDelete}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    </div>

  </div>
</div>
    )    
}