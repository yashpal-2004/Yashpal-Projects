import React from 'react';
import {useDroppable} from '@dnd-kit/react';

export function Droppable({id, children}) {
  const {ref, isOver} = useDroppable({
    id,
  });

  return (
    <div 
      ref={ref} 
      className={`w-48 h-48 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors ${isOver ? 'bg-green-100 border-green-500' : 'bg-gray-50 border-gray-300'}`}
    >
      {children}
    </div>
  );
}
