import { useState } from 'react'
import { UserList } from './UserList'
import { AddUser } from './AddUser'

export default function App(){

  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
  })

  const handleChange = event =>{
    event.preventDefault();
    setForm({...form, [event.target.name]: event.target.value})
  }
  const [error, setError] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    const {name,age,email} = form;
    const ageNum = Number(age);
    if(!name.trim()){
      return setError("Fill Name")
    }
    if(ageNum < 18 || ageNum > 100){
      return setError("Invalid Age")
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if(!regex.test(email)){
      return setError("Invalid mail address")
    }

    setUser([...users, form]);
    
    setForm({
      name: "",
      age: "",
      email: "",
    })

    setError("");
    
  }
  const [users, setUser] = useState([])


   const handleRemove = user =>{
    setUser(users.filter(u => u !== user))
   }

  return (
    <div className='row my-4'>
      <div className='col md-7 '>
          <AddUser form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error} />
      </div>

      <div className='col md-5'>
          <UserList users={users}
          handleRemove={handleRemove}
          />        
      </div>
    </div>

  )

}
  