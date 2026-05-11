import { useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TodoContext } from "../context/context";

type Input = {
    text: string;
}
export const Add = () => {
    const context = useContext(TodoContext);
    if(!context) throw new Error("Out of provider...");
    
    const {register,
    handleSubmit,
    reset,
    formState: { errors },
    } = useForm<Input>()

    const onSubmit: SubmitHandler<Input> = (data) => {
    context.addTodo(data.text);
    reset();
    };
    return(
        <>
        <h1>
            Add
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
        <label>
        <input type="text" placeholder="what you need todo" className="input"
        {...register("text", {
            required: "Todo is required",
        })}/>
        <button className="btn">Save</button>
        </label>
        {errors.text && <p>{errors.text.message}</p>}
        </form>
        </>
    )
}