import { useState } from 'react'
import UserList from "./UserList";
import AddUser from "./AddUser";


function App() {

  const [users, setUsers] = useState([]);

  const addUser = user => {
    setUsers([...users, {...user, id: Date.now()}]);
  }

  const deleteUser = userId => {
    setUsers(users.filter(u => u.id !== userId))
  }


  return (
    <>

    <AddUser onAdd={addUser} />

    <UserList users={users} onDelete ={deleteUser}/>
    
    </>
  )
}

export default App
