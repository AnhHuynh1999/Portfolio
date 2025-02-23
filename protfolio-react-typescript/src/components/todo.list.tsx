import { useState } from "react";
import TodoData from "./todo.data";
import TodoInput from "./todo.input";

interface ITodo {
  title: String,
  id: number,
  name?: string;
}

const TodoList = () => {

  const [listTodo, setListTodo] = useState<ITodo[]>([])
  const addNewTodo = (todo: ITodo) => {
    setListTodo([...listTodo, todo])
  }

  const deleteTodo = (id: number) => {
    setListTodo(listTodo.filter((todo) => todo.id !== id))
  }

  return (
    <div style={{ width: "600px", padding: "20px", margin: "50px auto", border: "1px solid #ccc", borderRadius: "5px" }}>
      Todo List Component
      <hr />
      <TodoInput addNewTodo={addNewTodo} />
      <TodoData todos={listTodo} deleteTodo={deleteTodo} />

    </div>
  )
}

export default TodoList;