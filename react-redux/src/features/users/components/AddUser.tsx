import { useForm } from "react-hook-form"
import styles from "./AddUser.module.css"
import { C } from "vitest/dist/chunks/reporters.d.BuRON0I0.js"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../app/hooks"
import { addUser } from "../userSlice"

export type FormData = {
  name: string
  age: number
  salary: number
}

export const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()


  const dispatch = useAppDispatch();
  const onSubmit = (data: FormData) => {
    dispatch(addUser(data))
    navigate("/")
  }
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add User</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className={styles.input}
            placeholder="Enter user name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
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
            {...register("age", {
              required: "Age is required",
              min: { value: 1, message: "Enter a valid age" }
            })}
          />
          {errors.age && <p className={styles.error}>{errors.age.message}</p>}
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
            {...register("salary", {
              required: "Salary is required",
              min: { value: 0, message: "Salary cannot be negative" }
            })}
          />
          {errors.salary && <p className={styles.error}>{errors.salary.message}</p>}
        </div>

        <div className={styles.buttonRow}>
          <button onClick={() => navigate("/")} type="button" className={`${styles.button} ${styles.secondary}`}>
            Cancel
          </button>
          <button type="submit" className={`${styles.button} ${styles.primary}`}>
            Save User
          </button>
        </div>
      </form>
    </div>
  )
}
