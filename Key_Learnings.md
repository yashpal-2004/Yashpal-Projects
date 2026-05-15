# Interview Preparation: Key Learnings

This document follows a Question & Answer format to help prepare for technical interviews based on this project.

---

### Question 1: How does `dnd-kit` detect when a draggable item is over a drop target, and why does it feel so responsive?

**The "Good" Answer:**
`dnd-kit` uses customizable **Collision Detection Strategies** rather than relying on native browser drag events. By default, it uses the **`rectIntersection`** algorithm. This algorithm calculates the intersection between the bounding boxes of the draggable element and all potential droppable targets. 

It feels highly responsive because the "collision" is triggered as soon as even a single pixel of the draggable element's border overlaps with a droppable target. This "magnetic" feel is a result of mathematical rectangle calculations happening in real-time, rather than waiting for the mouse pointer to enter the target area.

---

### Question 2: What are the different collision detection strategies available in `dnd-kit`, and when would you use them?

**The "Good" Answer:**
There are four primary built-in strategies:

1.  **`rectIntersection` (Default)**: Best for general use where you want immediate feedback as soon as boxes touch.
2.  **`closestCenter`**: Calculates the distance between the center points of the elements. This is ideal for **Sortable Lists** where you want the item to "jump" to a new position only when it's physically closer to that position's center.
3.  **`pointerWithin`**: Only triggers if the actual mouse/touch pointer is within the droppable area. This is useful for precise dragging where the size of the draggable item might be very large.
4.  **`closestCorners`**: Uses the distance between corners. Useful for complex grid layouts.

---

### Question 3: How do you handle state updates when a drag-and-drop operation completes?

**The "Good" Answer:**
We use the `onDragEnd` event handler provided by the `DragDropProvider`. When the drag operation ends, the event object contains an `operation` property which includes the `target` (the droppable it landed on). 

In our implementation, we check if the operation was canceled. If not, we extract the `id` of the target droppable and update our React state. Because React is declarative, updating this state automatically triggers a re-render, moving the component from its original container to the new one.

---

### Question 4: Why use `@dnd-kit` over other libraries like `react-beautiful-dnd`?

**The "Good" Answer:**
`dnd-kit` is built for modern React (hooks-based), is modular (unbundled it's very small), and supports multiple input methods like touch and mouse out-of-the-box. Unlike older libraries, it doesn't force a specific DOM structure, giving us full control over our CSS and layout.
---

### Question 5: How do you implement a Kanban board with multiple columns using `dnd-kit`?

**The "Good" Answer:**
In a Kanban system, we map over a list of columns (e.g., To-Do, In Progress, Done). Each column is a **Droppable** container. Inside each column, we filter our global tasks array by their `status` and render them as **Draggable** components. When `onDragEnd` is triggered, we simply update the `status` property of the dragged task to match the `id` of the droppable column it was landed in. This declarative approach ensures that React handles the actual movement of the element in the DOM.

---

---

### Question 6: How do you handle large numbers of tasks in a Kanban board UI?

**The "Good" Answer:**
When dealing with hundreds of tasks, you must constrain the column height to prevent the entire page from growing indefinitely. 
1.  **Fixed Height**: Set a fixed height (like `75vh`) on the column container.
2.  **Overflow Handling**: Apply `overflow-y-auto` to the task list container. This creates an internal "slider" or scrollbar for each column independently.
3.  **Sticky Headers**: Keep the column title visible by making the header a "shrink-0" element (or using `sticky top-0`) so it doesn't scroll away.
4.  **Performance**: For extremely large lists (thousands), you would implement **Virtualization** (rendering only the visible items), though for a few hundred items, standard CSS scrolling with React is efficient enough.
