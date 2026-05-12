import { useContext } from "react"
import { Context } from "../context/context"
import { UserItem } from "./UserItem";

export const Table = () => {

    const context = useContext(Context);
    if(!context) throw new Error("out of provider...");
    
    return (
        <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Age
                        </th>
                        <th>
                            Salary
                        </th>
                        <th>
                            Actions
                        </th>
                        </tr>
                    </thead>
        {
            context.users.map( user => (

                    <UserItem
                    key={user.id}
                    user={user}/> 
                    
                )
            )
        }
        </table>
    )
}