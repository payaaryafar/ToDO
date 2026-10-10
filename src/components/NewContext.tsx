import { createContext, useState, type ReactNode, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  id: string;
  name: string;
  status: boolean;
}

interface NewContextType {
  todos: Todo[];
  addTodo: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  statusHandler: (todoId: string) => void;
  removeTodo: (todoId: string) => void;
  editHandler: (todoId: string, newName: string) => void;
}

interface AppDataProviderProps {
  children: ReactNode;
}

export const NewContext = createContext<NewContextType | null>(null);

export const AppDataProvider = ({ children }: AppDataProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("my_todos");
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch (error) {
        console.error("خطا در خواندن از لوکال استوریج:", error);
      }
    }
    return [
      { id: uuidv4(), name: "Eating breakfast", status: false },
      { id: uuidv4(), name: "Going to gym", status: true },
      { id: uuidv4(), name: "Going to park", status: false },
    ];
  });

  useEffect(() => {
    localStorage.setItem("my_todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.target as HTMLInputElement).value == "") {
    } else {
      if (event.key == "Enter") {
        let newTodo = {
          id: uuidv4(),
          name: (event.target as HTMLInputElement).value,
          status: false,
        };
        setTodos([...todos, newTodo]);
        (event.target as HTMLInputElement).value = "";
      }
    }
  };

  const statusHandler = (todoId: string) => {
    const updatedStatus = todos.map((item) =>
      item.id == todoId ? { ...item, status: !item.status } : item,
    );

    setTodos(updatedStatus);
  };

  const removeTodo = (todoId: string) => {
    const updatedTodo = todos.filter((item) => {
      return item.id != todoId;
    });
    setTodos(updatedTodo);
  };

  const editHandler = (todoId: string, newName: string) => {
    const updatedTodo2 = todos.map((item) => {
      if (item.id == todoId) {
        item.name = newName;
        return item;
      }
      return item;
    });
    setTodos(updatedTodo2);
  };

  return (
    <NewContext.Provider
      value={{ editHandler, removeTodo, statusHandler, addTodo, todos }}
    >
      {children}
    </NewContext.Provider>
  );
};
