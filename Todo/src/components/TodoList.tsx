import { useEffect, useState } from "react"
import { AddToDo } from "./AddToDo"
import { FilterTodo } from "./FilterTodo"
import { List } from "./List"
import type {Todo} from "./types.ts"
import { Api } from "../utility/api.ts"
import axios from "axios"

export const TodoList = () =>{

    const [todos, setTodos] = useState<Todo[]>([]);

    const deleteTodo = (id: string): void =>{
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleCompleteTodo = (id: string): void =>{
        const found = todos.find(todo => todo.id === id);

        if(!found) return;

        const updated = {...found, completed: !found.completed}

        Api
        .patch(`http://localhost:4001/todos/${id}`, updated )

        setTodos(prev =>
        prev.map(t => (t.id === id ? updated : t))
    );
    }

    useEffect(() => {
        Api.get<Todo[]>("/todos")
        .then(res => {
            setTodos(res.data)
    })
    },[])
    return(
        <div className="container py-4">
            <h1 className="text-center mb-4">Todo List</h1>
            <div className="row mb-3">
        <div className="col-md-7 mb-3 mb-md-0">
          <AddToDo setTodos={setTodos}/>
        </div>
        <div className="col-md-5">
          <FilterTodo todos={todos}/>
        </div>
      </div>
            <div className="row">
        <div className="col-12">
          <List 
            todos={todos}
            onDelete={deleteTodo}
            onComplete={handleCompleteTodo}
            // onNotComplete = {handleNonComplete},
          />
        </div>
      </div>
    </div>
    )
}