import TodoItem from "./TodoItem";

export default function TodoList({ todos = [], deleteTodo, toggleTodo}) {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          deleteTodo={()=>deleteTodo(todo._id)}
           toggleTodo={()=>toggleTodo(todo._id)}
        />
      ))}
    </div>
  );
}