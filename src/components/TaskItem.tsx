import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 transition-colors duration-200 ${
            task.completed
              ? 'text-green-500 hover:text-green-600'
              : 'text-gray-400 hover:text-blue-500'
          }`}
        >
          {task.completed ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>
        <span
          className={`flex-1 transition-all duration-200 ${
            task.completed
              ? 'text-gray-500 line-through'
              : 'text-gray-800 group-hover:text-gray-900'
          }`}
        >
          {task.title}
        </span>
        {task.completed && (
          <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
            Completed
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;