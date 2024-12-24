import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd'; // Импортируем DndProvider, useDrag, useDrop из react-dnd
import { HTML5Backend } from 'react-dnd-html5-backend'; // Backend для HTML5
import TaskItem from './TaskItem'; // Импорт компонента TaskItem для отображения задачи

// Тип задачи, используемый для Drag-and-Drop
const ITEM_TYPE = 'TASK';

function DndPage() {
  // Инициализация состояния для колонок и задач
  const [columns, setColumns] = useState({
    todo: { name: 'To Do', items: [{ 
      id: '1', content: 'Покормить собаку' }, {
        id: '2', content: 'Сходить в магазин' }] 
      },
    inProgress: { name: 'В процессе', items: [] },
    done: { name: 'Выполнено', items: [] },
    blocked: { name: 'Отложено', items: [] },
  });

  // Функция для удаления задачи из колонки
  const handleDelete = (columnId, itemId) => {
    setColumns((prevColumns) => {
      // Фильтрация задач, чтобы удалить задачу с указанным id
      const newItems = prevColumns[columnId].items.filter(item => item.id !== itemId);
      return {
        ...prevColumns,
        [columnId]: {
          ...prevColumns[columnId],
          items: newItems,
        }
      };
    });
  };

// Функция для перемещения задачи между колонками
const moveTask = (taskId, sourceColumnId, destinationColumnId, destinationIndex) => {
  // Если задача остается в той же колонке и на том же месте, выходим
  if (sourceColumnId === destinationColumnId) {
    const sourceItems = [...columns[sourceColumnId].items];
    const sourceIndex = sourceItems.findIndex(item => item.id === taskId);
    if (sourceIndex === destinationIndex) return;

    // Перемещаем задачу внутри той же колонки
    const [movedTask] = sourceItems.splice(sourceIndex, 1); // Удаляем задачу
    sourceItems.splice(destinationIndex, 0, movedTask); // Вставляем в нужное место
    setColumns({
      ...columns,
      [sourceColumnId]: { ...columns[sourceColumnId], items: sourceItems },
    });
  } else {
    // Перемещаем задачу между колонками
    const sourceItems = [...columns[sourceColumnId].items];
    const destinationItems = [...columns[destinationColumnId].items];
    const [movedTask] = sourceItems.splice(sourceItems.findIndex(item => item.id === taskId), 1);
    destinationItems.splice(destinationIndex, 0, movedTask);

    setColumns({
      ...columns,
      [sourceColumnId]: { ...columns[sourceColumnId], items: sourceItems },
      [destinationColumnId]: { ...columns[destinationColumnId], items: destinationItems },
    });
  }
};
  

  return (
    // DndProvider оборачивает все элементы, чтобы они могли поддерживать Drag-and-Drop
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Drag-and-Drop Task Manager</h1>
        <div className="flex space-x-4 w-full justify-center">
          {/* Обход по колонкам для их отображения */}
          {Object.entries(columns).map(([columnId, column]) => (
            <Column
              key={columnId}
              columnId={columnId}
              column={column}
              moveTask={moveTask}
              handleDelete={handleDelete}
            />
          ))}
        </div>
        {/* Кнопка для перехода на страницу To-Do */}
        <button
          onClick={() => window.location.href = '/'}
          className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Перейти к To-Do-странице
        </button>
      </div>
    </DndProvider>
  );
}

// Компонент для каждой колонки
function Column({ columnId, column, moveTask, handleDelete }) {
  // Настройка зоны сброса задач в колонке
  const [, drop] = useDrop({
    accept: ITEM_TYPE, // Колонка принимает только задачи типа TASK
    drop: (item) => moveTask(item.id, item.sourceColumnId, columnId), // Перемещение задачи при сбросе в колонку
  });

  return (
    <div ref={drop} className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 w-1/4">
      <h2 className="text-xl font-semibold mb-4">{column.name}</h2>
      {/* Контейнер для задач */}
      <div className="p-4 rounded-lg min-h-[300px] w-full bg-gray-200">
        {/* Отображение каждой задачи в колонке */}
        {column.items.map((item) => (
          <TaskItem
            key={item.id}
            item={item}
            columnId={columnId}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default DndPage;
