import React from 'react';
import { Check } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: 'One falls, one rises',
    reward: 250,
    icon: '💫',
    completed: true
  },
  {
    id: 2,
    title: 'Put 🐾 in your name',
    reward: 5000,
    icon: '🐾',
    completed: true
  },
  {
    id: 3,
    title: 'Boost PAWS channel',
    reward: 2500,
    icon: '⚡',
    completed: false
  },
  {
    id: 4,
    title: 'Follow channel',
    reward: 1000,
    icon: '📢',
    completed: true
  }
];

const TaskList = () => {
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div key={task.id} className="bg-gray-900 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-2xl">{task.icon}</span>
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-blue-500">+{task.reward} PAWS</p>
            </div>
          </div>
          {task.completed ? (
            <Check className="text-green-500" />
          ) : (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Start
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;