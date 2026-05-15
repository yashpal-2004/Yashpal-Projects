import React, {useState} from 'react';
import {DragDropProvider} from '@dnd-kit/react';

import {Column} from './Droppable';
import {TaskCard} from './Draggable';

const INITIAL_TASKS = [
  { id: 'task-1', title: 'Setup Kanban Foundation', description: 'Implement the basic structure with To-Do, In Progress, and Done columns.', dueDate: '2026-05-15', priority: 'High', status: 'todo' },
  { id: 'task-2', title: 'Design Task Cards', description: 'Add metadata like due dates, descriptions, and priority labels to cards.', dueDate: '2026-05-16', priority: 'Medium', status: 'in-progress' },
  { id: 'task-3', title: 'User Authentication', description: 'Research and implement JWT based authentication for the board.', dueDate: '2026-05-20', priority: 'Low', status: 'todo' },
  { id: 'task-4', title: 'Documentation', description: 'Update the project README and Key Learnings document.', dueDate: '2026-05-15', priority: 'Low', status: 'done' },

  ...Array.from({ length: 19 }, (_, i) => ({
    id: `task-${i + 5}`,
    title: `Task ${i + 5}`,
    description: `Complete the implementation and testing for module ${i + 5}.`,
    dueDate: `2026-05-${String(((i % 28) + 1)).padStart(2, '0')}`,
    priority: ['Low', 'Medium', 'High'][i % 3],
    status: ['todo', 'in-progress', 'done'][i % 3],
  })),
];

const COLUMNS = [
  { id: 'todo', title: 'To-Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const handleDragEnd = (event) => {
    const {operation} = event;
    if (event.canceled || !operation.target) return;

    const taskId = operation.source.id;
    const newStatus = operation.target.id;

    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Zeera Board</h1>
        <p className="text-slate-500 mt-2">Manage your tasks with ease</p>
      </header>
      
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="flex justify-center gap-6 overflow-x-auto pb-6">
          {COLUMNS.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            return (
              <Column 
                key={col.id} 
                id={col.id} 
                title={col.title} 
                count={colTasks.length}
              >
                {colTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </Column>
            );
          })}
        </div>
      </DragDropProvider>
    </div>
  );
}

export default App;