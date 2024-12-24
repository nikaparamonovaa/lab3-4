import React from 'react'; // Импорт React для создания компонентов

// Компонент TodoItem отвечает за отображение одной задачи
function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div className="todo-item">
      {/* Чекбокс для переключения состояния выполнения задачи */}
      <input
        type="checkbox"
        checked={todo.completed} // Показываем, выполнена ли задача
        onChange={() => toggleTodo(todo.id)} // Обработка переключения выполнения задачи
      />
      {/* Название задачи, стилизуется в зависимости от состояния (выполнено или нет) */}
      <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
      {/* Кнопка для удаления задачи */}
      <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
    </div>
  );
}

export default TodoItem; // Экспортируем компонент, чтобы использовать его в других файлах