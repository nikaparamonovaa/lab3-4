import React from 'react';
import { useDrag } from 'react-dnd';

// Тип задачи, используемый для Drag-and-Drop
const ITEM_TYPE = 'TASK';

function TaskItem({ item, columnId, handleDelete }) {
  // Настройка перетаскиваемого элемента
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE, // Определяем тип как TASK
    item: { id: item.id, sourceColumnId: columnId }, // Передача данных о задаче
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Определяем, перетаскивается ли элемент
    }),
  });

  return (
    <div
      ref={drag} // Используем ref для связывания элемента с Drag-and-Drop
      className={`flex justify-between items-center p-4 mb-2 rounded-lg shadow-md text-white font-medium 
        ${isDragging ? 'bg-blue-700' : 'bg-blue-500'}`} // Стилизация, которая изменяется при перетаскивании
    >
      {item.content} {/* Отображаем содержимое задачи */}
      <button
        onClick={() => handleDelete(columnId, item.id)} // Кнопка удаления задачи
        className="ml-4 bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded"
      >
        Удалить
      </button>
    </div>
  );
}

export default TaskItem;