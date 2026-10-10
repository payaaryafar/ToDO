import { useContext } from "react";
import TodoItem from "./TodoItem";
import { NewContext } from "./NewContext";

export default function TodoList() {
  const {todos} = useContext(NewContext)!
  return (
    <ul className="list-reset">
     { 
     todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))
      }
    </ul>
  );
}
