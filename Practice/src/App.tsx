import { AddUser } from "./components/AddUser";
import { UserList } from "./components/UserList";
// import { UserList } from "./components/UserList";
// import { UserList } from "./components/UserList";
import { UserService } from "./context/provider";

export default function App(){
  return (
    <div className="container">
      <h1 className="display-5 fw-bold text-center text-primary my-4">
    User Management
</h1>


      <UserService>
        <div className="row">

        <>
        

        <div className="col-md-6 my-4">

        <AddUser/>

        </div>
        <div className="col-md-6 my-4">
            <UserList/>
        </div>
        </>
        </div>
        </UserService>
    </div>
  )
}

