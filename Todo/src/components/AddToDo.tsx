import axios from "axios";
import { useState } from "react"
import React from "react"
import type { Todo } from "./types";

interface formState{
    id: number,
    text: string,
    completed: boolean
}
type Props = {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const AddToDo:React.FC<Props> = ({setTodos}) =>{

    const [form, setForm] = useState<formState>({
        id: Date.now(),
        text: "",
        completed: false
    });
    const [error,setErrors] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();

        if(!form?.text.trim()){
            return setErrors("To do field must be filled...")
        }

        setErrors("");

        axios
        .post("http://localhost:4001/todos",form)
        .then(res => {
            setTodos(prev =>
                [...prev,res.data]
            )
            setForm({
                id: Date.now(),
                text: "",
                completed: false
            })
        })  

        }

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{

            setForm({...form, text: e.target.value});
        }
    return (
        <div>
            <h1>AddTodo</h1>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-danger">{error}</p>}
                <input
                    type="text"
                    value={form.text} 
                    onChange={handleChange}
                    className="form-control form-control-sm"
                    />

                <button className="btn btn-primary my-2 " >Save</button>
                    
            </form>
        </div>
    )
}