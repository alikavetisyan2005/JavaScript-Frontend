import { createBrowserRouter } from "react-router-dom"
import { UserList } from "./features/users/components/UserList"
import { AddUser } from "./features/users/components/AddUser"
import { EditUser } from "./features/users/components/EditUser"

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserList />,
  },
  {
    path: "/add",
    element: <AddUser />,
  },
  {
    path: "/edit/:id",
    element: <EditUser />,
  },
])

export default router
