export interface User{
    id: number,
    name: string,
    age: number, 
    salary: number,
}

export interface UserContext{
    users: User[],
    addUser: (data: User) => void;
    handleInc: (id: number) => void;
    handleDec: (id: number) => void;
    handleDelete: (id: number) => void;

}