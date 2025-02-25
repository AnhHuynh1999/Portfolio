interface ITodoDataProps {
  todos: {
    title: String
    id: number
  }[]
  deleteTodo: (id: number) => void
}
const TodoData = (props: ITodoDataProps) => {
  const { todos, deleteTodo } = props
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} style={{ padding: '10px 0' }}>
          {todo.id}-{todo.title} &nbsp; <button onClick={() => deleteTodo(todo.id)}>Delete</button>{' '}
        </div>
      ))}
    </div>
  )
}

export default TodoData
