import { useContext, useState } from "react"
// import { AddUser } from "./AddUser"
import { Context } from "../context/context"
// import { UserItem } from "./UserItem";
import { Table } from "./Table";
import { Grid } from "./Grid";

export const UserList = () => {
    const context = useContext(Context);
    if(!context) throw new Error("out of provider...");

    const [form, setForm] = useState("table");
    
    return(
        <>
        <h1 className="text-center my-4 fw-bold text-primary">User List</h1>
        {form === "table" && <Table/>}
        {form === "grid" && <Grid/>}
        
        <button className="btn btn-outline-primary" onClick={() => setForm("table")}>
            Table
        </button>
        <button className="btn btn-outline-secondary mx-2" onClick={() => setForm("grid")}>
            Grid
        </button>
        </>
        
    )
}