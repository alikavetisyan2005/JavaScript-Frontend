import { TodoList } from "./components/TodoList";
import { TodoService } from "./context/provider";

export default function App(){
  return (
    <>

    <TodoService>
     <TodoList/>
    
      </TodoService>

    </>
  )

}