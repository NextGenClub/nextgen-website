import React from 'react';
import { Task } from '../../services/tasks';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, isComplete: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggleComplete }) => {
  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <span
                style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}
                onClick={() => onToggleComplete(task.id, !task.isComplete)}
              >
                {task.title}
              </span>
              <button onClick={() => onDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;