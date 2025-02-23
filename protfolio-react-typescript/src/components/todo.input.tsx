import { useState } from "react";

interface ITodo {
  title: String,
  id: number,
  name?: string;
}
interface IProps {
  name?: string
  addNewTodo: (v: ITodo) => void
}
const TodoInput = (props: IProps) => {
  const { addNewTodo } = props;
  const [todo, setTodo] = useState<string>("");
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value)
  }
  const randomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const handleClick = () => {
    if (!todo) {
      alert('Please enter a todo')
      return;
    }
    console.log(`Adding todo: ${todo}`)
    setTodo("") // clear the input field after adding the todo.
    addNewTodo({ title: todo, id: randomInteger(1, 1000) })
  }
  return (
    <div style={{ display: "flex", gap: 15, marginBottom: 20 }}>
      <input value={todo}
        onChange={handleTextChange}
        type="text" />
      <button onClick={handleClick}>Add todo</button>
    </div>
  )
}

export default TodoInput;