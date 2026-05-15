import React from 'react';
import {useDraggable} from '@dnd-kit/react';

export function TaskCard({task}) {
  const {ref, isDragging} = useDraggable({
    id: task.id,
  });

  const priorityColors = {
    High: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Low: 'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
      }}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-all flex flex-col gap-2"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-800 leading-tight">{task.title}</h3>
        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      
      <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
        <span className="text-[11px] text-gray-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {task.dueDate}
        </span>
      </div>
    </div>
  );
}
