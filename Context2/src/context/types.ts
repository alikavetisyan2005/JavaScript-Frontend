export interface Todo {
    id: number,
    text: string,
    completed: boolean
}

export interface Context {
    todos: Todo[];
    handleRemove: (id: number) => void;
    // setTodos: (todo: Todo) => void;
    addTodo: (data: string) => void;
}
