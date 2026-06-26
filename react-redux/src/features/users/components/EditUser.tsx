import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FormData } from "./AddUser"
import axios from "axios"
import styles from "./EditUser.module.css"
import { useAppDispatch } from "../../../app/hooks"
import { updateUser, updateUserPayload } from "../userSlice"

export const EditUser = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState<FormData>({ name: "", age: 0, salary: 0 })
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await axios.get(`http://localhost:4002/users/${id}`)
      setForm(user.data)
    }
    fetchUser()
  }, [id])
  const handleEdit = ({id, data}: updateUserPayload) => {
      if(!id) return;
      dispatch(updateUser({id, data}))
      navigate("/");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit User</h1>
      <form onSubmit={() => handleEdit({id, data: form})} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className={styles.input}
            placeholder="Enter user name"
            value={form?.name ?? ""}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="age">
            Age
          </label>
          <input
            id="age"
            type="number"
            className={styles.input}
            placeholder="Enter age"
            value={form?.age ?? 0}
            onChange={e =>
              setForm(prev => ({ ...prev, age: Number(e.target.value) }))
            }
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="salary">
            Salary
          </label>
          <input
            id="salary"
            type="number"
            className={styles.input}
            placeholder="Enter salary"
            value={form?.salary ?? 0}
            onChange={e =>
              setForm(prev => ({ ...prev, salary: Number(e.target.value) }))
            }
          />
        </div>

        <div className={styles.buttonRow}>
          <button
            type="button"
            className={`${styles.button} ${styles.secondary}`}
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`${styles.button} ${styles.primary}`}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
