import React, {  useState } from "react"
import { TodoContext } from "./context"
import type { Todo } from "./types";

type Props = {
    children: React.ReactElement;
}
export const TodoService:React.FC<Props> = ({children}) =>{
    const [todos, setTodos] = useState<Todo[]>([])
    const handleRemove = (id: number):void =>{
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const addTodo = (data: string):void => {
        setTodos([...todos,
            {
            id: Date.now(),
            text: data,
            completed: false

        }])
    }



    return (
        <>
        <TodoContext.Provider value={{todos,handleRemove, addTodo}}>
            {children}
        </TodoContext.Provider>
        </>
    )
}