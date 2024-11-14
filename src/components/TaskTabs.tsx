import React, { useState } from 'react';

const TaskTabs = () => {
  const [activeTab, setActiveTab] = useState('limited');
  const tabs = [
    { id: 'limited', label: 'Limited', count: 4 },
    { id: 'in-game', label: 'In-game', count: 2 },
    { id: 'partners', label: 'Partners', count: 0 }
  ];

  return (
    <div className="flex space-x-4 mb-6">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            activeTab === tab.id ? 'bg-white text-black' : 'bg-gray-900 text-gray-400'
          }`}
        >
          <span>{tab.label}</span>
          {tab.count > 0 && (
            <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TaskTabs;