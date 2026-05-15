import React, {useState} from 'react';
import {DragDropProvider} from '@dnd-kit/react';

import {Droppable} from './Droppable';
import {Draggable} from './Draggable';

function App() {
  const targets = ['A', 'B', 'C'];
  const [target, setTarget] = useState(null);
  
  const draggable = (
    <Draggable id="draggable">Drag me</Draggable>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold text-gray-800">dnd-kit Playground</h1>
      
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;
          
          // event.operation.target is the droppable that the draggable was dropped over
          setTarget(event.operation.target?.id);
        }}
      >
        <div className="h-20 flex items-center justify-center">
          {!target ? draggable : <span className="text-gray-400">Dropped!</span>}
        </div>

        <div className="flex gap-4">
          {targets.map((id) => (
            <Droppable key={id} id={id}>
              {target === id ? draggable : `Droppable ${id}`}
            </Droppable>
          ))}
        </div>
        
        {target && (
          <button 
            onClick={() => setTarget(null)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Reset
          </button>
        )}
      </DragDropProvider>
    </div>
  );
}

export default App;