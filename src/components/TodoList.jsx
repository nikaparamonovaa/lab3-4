import React from 'react'; // Импорт React для создания компонентов
import TodoItem from './TodoItem'; // Импорт компонента TodoItem для отображения каждой задачи

// Компонент TodoList отображает список задач
function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <div className="todo-list">
      {/* Отображаем список задач, используя компонент TodoItem для каждой задачи */}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      ))}
    </div>
  );
}

export default TodoList; // Экспортируем компонент для использования в других частях приложения