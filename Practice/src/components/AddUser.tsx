import { useContext } from "react"
// import { UserList } from "./UserList"
import type { User } from "../context/types"
import { Context } from "../context/context";
import { useForm, type SubmitHandler } from "react-hook-form";



export const AddUser = () => {
    
    const context = useContext(Context);
    if(!context) throw new Error("out of provider...");
    

    const {register,
    handleSubmit,
    reset,
    formState: { errors },
    } = useForm<User>()

    const onSubmit: SubmitHandler<User> = (data) => {
        context.addUser(data)
    reset();
};
    return(
        <>
        <div>
            <h3 className="text-center  my-3 fw-bold text-primary">AddUser</h3>

        </div>
        <div className="text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>

            <label className="form-label fw-semibold"> 
            <input type="text" className="form-control form-control-lg"
            placeholder="Enter Name"
             {...register("name", { required: true })}  />           
            {errors.name && <p className="text-danger">Name is required</p>}
            </label>
            </div>
            <div>
            <label>
            <input type="text" className="form-control my-2 form-control-lg"
            placeholder="Enter Age"
            {...register("age", { required: true })}  />            
            {errors.age && <p className="text-danger">Age is required</p>}
            </label>

            </div>
            <div>
            <label>
            <input type="text"  className="form-control form-control-lg"
            placeholder="Enter Salary"
            {...register("salary", { required: true })} />  
            {errors.salary && <p className="text-danger">Salary is required</p>}         
            </label>

            </div>
            <button className="btn btn-sm btn-outline-primary my-4">
                Save
            </button>
            </form>
        </div>
        </>
    )
}