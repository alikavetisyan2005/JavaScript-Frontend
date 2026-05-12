import { useContext } from "react"
import { Context } from "../context/context"

export const Grid = () => {
    const context = useContext(Context);
    if(!context) throw new Error("out od provider...");
    
    return(
        
        <div className="container">
            <div className="row">

            {context.users.map(user => (
                <div className="col-md-3 mb-4"
                key={user.id}>
                    <div className="card p-2">

                    <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4KGejCZLA706wACzz5G6PopDe_cX5PUkJgA&s" alt="" 
                    className="img-fluid"/>
                    <p>{user.name}</p>
                    <p>{user.age}</p>
                    <p>{user.salary}</p>
                    </div>

                </div>
            ))}
            </div>
        </div>
        

    )
}