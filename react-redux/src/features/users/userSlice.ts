import { Action, PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { State, User } from "../../types"
import axios from "axios"
import { FormData } from "./components/AddUser"

const initialState: State = {
  users: [],
}

export type updateUserPayload = {
  id: string | undefined
  data: Partial<User>
}
export const userSlice = createAppSlice({
  name: "users",
  initialState,
  reducers: create => ({
    getUsers: create.asyncThunk<User[]>(
      async () => {
        const response = await fetch("http://localhost:4002/users")
        return (await response.json()) as User[]
      },
      {
        fulfilled: (state: State, action: PayloadAction<User[]>) => {
          state.users = action.payload
        },
      },
    ),
    addUser: create.asyncThunk(
      async (userData: FormData) => {
        const response = await axios.post(
          "http://localhost:4002/users",
          userData,
        )
        return response.data
      },
      {
        fulfilled: (state: State, action: PayloadAction<User>) => {
          state.users.push(action.payload)
        },
      },
    ),

    deleteUser: create.asyncThunk(
      async (id: string) => {
        await axios.delete(`http://localhost:4002/users/${id}`)
        return id
      },
      {
        fulfilled: (state: State, action: PayloadAction<string>) => {
          state.users = state.users.filter(
            user => user.id !== String(action.payload),
          )
        },
      },
    ),
    updateUser: create.asyncThunk(
      async ({ id, data }: updateUserPayload) => {
        const response = await axios.patch(
          `http://localhost:4002/users/${id}`,
          data,
        )
        return response.data
      },
      {
        fulfilled: (state: State, action: PayloadAction<User>) => {
          const index = state.users.findIndex(
            user => user.id === action.payload.id,
          )

          if (index !== -1) {
            state.users[index] = action.payload
          }
        },
      },
    ),
  }),

  selectors: {
    selectUsers: state => state.users,
  },
})

export const { selectUsers } = userSlice.selectors
export const { getUsers, addUser, deleteUser, updateUser } = userSlice.actions
