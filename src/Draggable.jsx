import React from 'react';
import {useDraggable} from '@dnd-kit/react';

export function Draggable({id, children}) {
  const {ref, isDragging} = useDraggable({
    id,
  });

  return (
    <button 
      ref={ref} 
      className={`px-4 py-2 bg-blue-500 text-white rounded shadow-md cursor-grab active:cursor-grabbing transition-transform ${isDragging ? 'opacity-50 scale-105' : ''}`}
    >
      {children}
    </button>
  );
}
