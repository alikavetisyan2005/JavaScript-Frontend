import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { deleteUser, getUsers, selectUsers } from "../userSlice"
import styles from "./UserList.module.css"
import { useNavigate } from "react-router-dom"

export const UserList = () => {
  const users = useAppSelector(selectUsers)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id))
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.heading}>User List ({users.length})</h1>
        <button
          onClick={() => navigate("/add")}
          className={`${styles.button} ${styles.primaryButton}`}
        >
          Add User
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>ID</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Age</th>
              <th className={styles.th}>Salary</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr className={styles.row} key={user.id}>
                <td className={styles.td}>{user.id}</td>
                <td className={styles.td}>{user.name}</td>
                <td className={styles.td}>{user.age}</td>
                <td className={styles.td}>{user.salary}</td>
                <td className={styles.td}>
                  <div className={styles.actions}>
                    <button
                      onClick={() => handleDelete(String(user.id))}
                      className={`${styles.button} ${styles.danger}`}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/edit/${user.id}`)}
                      className={`${styles.button} ${styles.secondary}`}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
