import React, { useContext, useState } from "react";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";
import { NewContext, type Todo } from "./NewContext";


export default function TodoItem({todo} : {todo : Todo}) {
  const {statusHandler,editHandler} = useContext(NewContext)!
  let [editMode, setEditmode] = useState(false);
  const closeInput = (event : React.KeyboardEvent) => {
    if(event.key=="Enter"){
      editHandler(todo.id, (event.target as HTMLInputElement).value)
      setEditmode(false)
    }
  }

  return (
    <li className="relative flex items-center justify-between px-2 py-6 border-b">
      {editMode ? (
        <input
          type="text"
          defaultValue={todo.name}
          className="w-full px-2 py-3 border rounded outline-none border-grey-600"
          onKeyDown={(event)=>{closeInput(event)}}
        />
      ) : (
        <>
          <div>
            <input
              type="checkbox"
              checked={todo.status}
              onChange={() => statusHandler(todo.id)}
            />
            <p
              className={`inline-block mt-1 ml-2 text-gray-600 ${todo.status ? "line-through" : ""}`}
            >
              {todo.name}
            </p>
          </div>

          <button
            type="button"
            className="absolute right-0 flex items-center space-x-1"
          >
            <EditTodo setEditmode={setEditmode} />
            <DeleteTodo todo={todo}/>
          </button>
        </>
      )}
    </li>
  );
}
