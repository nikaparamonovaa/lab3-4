import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoPage from './pages/TodoPage'; // Страница обычного To-Do списка
import DndPage from './pages/DndPage';   // Страница с Drag-and-Drop

function App() {
  return (
    <Router>
      <Routes>
        {/* Маршрут для страницы To-Do */}
        <Route path="/" element={<TodoPage />} />
        {/* Маршрут для страницы с Drag-and-Drop */}
        <Route path="/dnd" element={<DndPage />} />
      </Routes>
    </Router>
  );
}

export default App;