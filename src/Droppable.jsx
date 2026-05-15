import React from 'react';
import {useDroppable} from '@dnd-kit/react';

export function Column({id, title, children, count}) {
  const {ref, isOver} = useDroppable({
    id,
  });

  return (
    <div className="flex flex-col w-85 min-w-[320px] bg-gray-50 rounded-xl border border-gray-200 shadow-sm h-[75vh] max-h-[800px]">
      {/* Column Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200 bg-white rounded-t-xl shrink-0">
        <h2 className="font-bold text-gray-700 uppercase text-xs tracking-widest">{title}</h2>
        <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full border border-gray-200 font-bold">
          {count}
        </span>
      </div>
      
      {/* Scrollable Task List */}
      <div 
        ref={ref}
        className={`p-3 flex flex-col gap-3 flex-grow overflow-y-auto transition-colors duration-200 rounded-b-xl scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent ${isOver ? 'bg-blue-50/50' : ''}`}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 transparent'
        }}
      >
        {children}
        
        {count === 0 && !isOver && (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-sm text-gray-400">Empty List</p>
          </div>
        )}
      </div>
    </div>
  );
}
