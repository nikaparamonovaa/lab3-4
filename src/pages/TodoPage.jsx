import React, { useState } from 'react'; // Импорт React и useState для управления состоянием
import TodoList from '../components/TodoList'; // Импорт компонента TodoList
import '../index.css'; // Импорт CSS-файла для стилей

// Главный компонент приложения
function TodoPage() {
  // Состояние для задач
  const [todos, setTodos] = useState([
    { id: 1, title: 'Сделать РКПО', completed: true }, // Пример задачи
    { id: 2, title: 'Лечь спать пораньше', completed: false },
  ]);

  // Состояние для новой задачи (ввод пользователя)
  const [newTodo, setNewTodo] = useState('');

  // Состояние для фильтра (все, завершённые, незавершённые)
  const [filter, setFilter] = useState('all');

  // Функция для переключения состояния выполнения задачи
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Функция для добавления новой задачи
  const addTodo = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
    if (!newTodo.trim()) return; // Проверяем, что задача не пустая

    // Создаём новую задачу
    const newTodoItem = {
      id: Date.now(), // Уникальный идентификатор задачи
      title: newTodo, // Текст задачи, введённый пользователем
      completed: false, // По умолчанию задача не выполнена
    };

    // Обновляем список задач
    setTodos([...todos, newTodoItem]);
    setNewTodo(''); // Очищаем поле ввода
  };

  // Функция для удаления задачи
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // Удаляем задачу по её id
  };

  // Фильтрация задач по состоянию выполнения
  const filterTodos = (todos) => {
    if (filter === 'completed') return todos.filter((todo) => todo.completed); // Только выполненные
    if (filter === 'incomplete') return todos.filter((todo) => !todo.completed); // Только невыполненные
    return todos; // Все задачи
  };

  return (
    <div className="app">
      <h1>My To-Do List</h1>
      {/* Форма для добавления новой задачи */}
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo} // Значение из состояния newTodo
          onChange={(e) => setNewTodo(e.target.value)} // Обновляем состояние при вводе
          placeholder="Добавьте новую задачу..." // Подсказка для пользователя
        />
        <button type="submit">Добавить</button> {/* Кнопка для добавления задачи */}
      </form>

      {/* Кнопки для фильтрации задач */}
      <div className="filters">
        <button onClick={() => setFilter('all')}>Все</button> {/* Все задачи */}
        <button onClick={() => setFilter('completed')}>Выполненные</button> {/* Выполненные */}
        <button onClick={() => setFilter('incomplete')}>Невыполненные</button> {/* Невыполненные */}
      </div>

      {/* Отображение списка задач с учётом фильтра */}
      <TodoList todos={filterTodos(todos)} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />

       {/* Кнопка для перехода на страницу DND */}
       <button onClick={() => window.location.href = '/dnd'}>Перейти к DnD-странице</button>
    </div>
  );
}

export default TodoPage; // Экспортируем главный компонент приложения