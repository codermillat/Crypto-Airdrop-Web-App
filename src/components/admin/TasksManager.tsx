import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Loader2 } from 'lucide-react';
import { DatabaseTask } from '../../hooks/useDatabase';
import api from '../../utils/api';

interface Props {
  tasks: DatabaseTask[];
  onUpdate: () => void;
}

interface TaskForm {
  title: string;
  reward: number;
  type: 'onboarding' | 'social' | 'defi' | 'daily';
  requirements: string[];
  isActive: boolean;
}

const initialForm: TaskForm = {
  title: '',
  reward: 100,
  type: 'onboarding',
  requirements: [''],
  isActive: true
};

const TasksManager: React.FC<Props> = ({ tasks, onUpdate }) => {
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<TaskForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setForm(initialForm);
    setError(null);
    setShowForm(false);
    setEditingTask(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingTask) {
        await api.put(`/api/tasks/${editingTask}`, form);
      } else {
        await api.post('/api/tasks', form);
      }
      onUpdate();
      resetForm();
    } catch (err: any) {
      setError(err?.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    setLoading(true);
    try {
      await api.delete(`/api/tasks/${taskId}`);
      onUpdate();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task: DatabaseTask) => {
    setForm({
      title: task.title,
      reward: task.reward,
      type: task.type as TaskForm['type'],
      requirements: task.requirements,
      isActive: task.isActive
    });
    setEditingTask(task._id);
    setShowForm(true);
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...form.requirements];
    newRequirements[index] = value;
    setForm({ ...form, requirements: newRequirements });
  };

  const addRequirement = () => {
    setForm({ ...form, requirements: [...form.requirements, ''] });
  };

  const removeRequirement = (index: number) => {
    const newRequirements = form.requirements.filter((_, i) => i !== index);
    setForm({ ...form, requirements: newRequirements });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Tasks</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
          disabled={loading}
        >
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full bg-gray-800 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Reward</label>
            <input
              type="number"
              value={form.reward}
              onChange={e => setForm({ ...form, reward: parseInt(e.target.value) })}
              className="w-full bg-gray-800 rounded-lg px-4 py-2"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value as TaskForm['type'] })}
              className="w-full bg-gray-800 rounded-lg px-4 py-2"
            >
              <option value="onboarding">Onboarding</option>
              <option value="social">Social</option>
              <option value="defi">DeFi</option>
              <option value="daily">Daily</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Requirements</label>
            {form.requirements.map((req, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={req}
                  onChange={e => handleRequirementChange(index, e.target.value)}
                  className="flex-1 bg-gray-800 rounded-lg px-4 py-2"
                  placeholder="Enter requirement"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="text-red-500 hover:text-red-400"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addRequirement}
              className="text-blue-500 hover:text-blue-400 text-sm"
            >
              + Add Requirement
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={e => setForm({ ...form, isActive: e.target.checked })}
              className="rounded border-gray-700"
            />
            <label className="text-sm">Active</label>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 flex items-center space-x-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Check size={20} />
                  <span>{editingTask ? 'Update' : 'Create'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task._id} className="bg-gray-900 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-blue-500">+{task.reward} PAWS</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-500 hover:text-blue-400"
                  disabled={loading}
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 hover:text-red-400"
                  disabled={loading}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              <p>Type: {task.type}</p>
              <p>Status: {task.isActive ? 'Active' : 'Inactive'}</p>
              <div className="mt-2">
                <p className="font-medium">Requirements:</p>
                <ul className="list-disc list-inside">
                  {task.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksManager;
