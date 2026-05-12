import React, { useState } from "react"
import { Context } from "./context"
import type { User } from "./types"


type Props = {
    children: React.ReactElement
}

export const UserService: React.FC<Props> = ({children}) => {

    const [users, setUsers] = useState<User[]>([
        {id: 101, name: "Alik", age: 20, salary: 1330000},
        {id: 102, name: "Bob", age: 20, salary: 133000},
    ]);


    const addUser = (data: User) => {
        setUsers([...users,
            {id: Date.now(), name: data.name, age: data.age, salary: data.salary}]);
    }

    const handleInc = (id: number) =>{
        setUsers(
            users.map(user => 
            user.id === id ? {...user, salary: user.salary + 10000} : user
        )
    );
}

    const handleDec = (id: number) =>{
        setUsers(
            users.map(user => 
            user.id === id ? {...user, salary: user.salary - 10000}: user)
        )
    }

    const handleDelete = (id: number) => {
        setUsers(users.filter(user => user.id !== id))
    }
    
    



    return(

        <Context.Provider value={{users, addUser, handleInc, handleDec, handleDelete}}>
            {children}
        </Context.Provider>
    )
}