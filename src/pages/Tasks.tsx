import React from 'react';
import TaskList from '../components/TaskList';
import TaskTabs from '../components/TaskTabs';

const Tasks = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">TASKS</h1>
      <h2 className="text-xl text-gray-500 mb-6">GET REWARDS FOR COMPLETING QUESTS</h2>
      
      <TaskTabs />
      <TaskList />
    </div>
  );
};

export default Tasks;