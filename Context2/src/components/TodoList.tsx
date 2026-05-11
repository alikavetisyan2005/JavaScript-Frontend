import { useContext } from "react"
import { Add } from "./Add"
import { Filter } from "./Filter"
import { List } from "./List"
import { TodoContext } from "../context/context"
// import { TodoItem } from "./TodoItem"

export const TodoList = () => {

    const context = useContext(TodoContext);
    if(!context) throw new Error("Out of provider...");
    
    return(
        <>
        <h1>
            TodoList
        </h1>

        <List/>
        <Add/>
        <Filter/>
        </>
    )
}