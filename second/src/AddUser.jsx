import { useState } from "react"

function AddUser({onAdd}){
    
    const [form, setForm] = useState({
        name: "",
        email: ""
    });

    const handleSumbit = (e) =>{
        e.preventDefault();

        if(!validate()) return;
        onAdd(form);
        setForm({name: "", email: ""})
    }

    const validate = () => {

        if(!form.name.trim()){
            alert("Name is required")
            return false;
        }
        if(!form.email.trim()){
            alert("Email is required")
            return false;
        }
        else if(!/\S+@\S+\.\S+/.test(form.email)){
            alert("Email is invalid")
            return false;
        }

        return true
    }

    return (
        <form onSubmit={handleSumbit}>
            <input type="text" placeholder="Name" value={form.name} onChange={(e) =>{
                setForm({...form, name: e.target.value});
            }} />

            <input type="text" placeholder="Email" value={form.email} onChange={(e) =>{
                setForm({...form, email: e.target.value})
            }} />

            <button type="submit">Add User</button>

        
        </form>
    )
}

export default AddUser