import type React from "react"
import type { User } from "../context/types"
import { useContext } from "react"
import { Context } from "../context/context"

type Props = {
    user: User
}



export const UserItem:React.FC<Props> = ({user}) => {
    const context = useContext(Context);
    if(!context) throw new Error("out of provider");
    return(
        <>
        <tbody>
            <tr>

            <td>

            {user.name}
            </td>
            <td>

            {user.age}
            </td>
            <td>
            {user.salary}

            </td>
            <td>
                <button className="btn btn-sm btn-outline-success mx-2" onClick={() => context.handleInc(user.id)}>+</button>
                <button className="btn btn-sm btn-outline-dark mx-2" onClick={() => context.handleDec(user.id)}>-</button>
                <button className="btn btn-sm btn-outline-danger mx-2" onClick={() => context.handleDelete(user.id)}>X</button>
            </td>
            </tr>
        </tbody>
        </>
    )
}