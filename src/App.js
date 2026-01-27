import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, Clock } from 'lucide-react';

const STORAGE_KEY = 'taskManagerData';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse tasks:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const createTask = () => {
    if (!newTask.title.trim()) return;
    
    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '' });
    setShowModal(false);
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          status: newStatus,
          completedAt: newStatus === 'Completed' ? new Date().toISOString() : null
        };
      }
      return task;
    }));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getStatusProgress = (status) => {
    switch(status) {
      case 'Pending': return 0;
      case 'In Progress': return 50;
      case 'Completed': return 100;
      default: return 0;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const statusColors = {
    'Pending': 'bg-gray-300',
    'In Progress': 'bg-blue-500',
    'Completed': 'bg-green-500'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              New Task
            </button>
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            {['all', 'Pending', 'In Progress', 'Completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === f
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {f === 'all' ? 'All Tasks' : f}
              </button>
            ))}
          </div>

          <div className="text-sm text-gray-600 mb-4">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </div>
        </div>

        <div className="space-y-4">
          {filteredTasks.map(task => {
            const progress = getStatusProgress(task.status);
            const isCompleted = task.status === 'Completed';
            
            return (
              <div
                key={task.id}
                className={`bg-white rounded-lg shadow-md p-5 transition-all hover:shadow-lg ${
                  isCompleted ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold text-gray-800 mb-1 ${
                      isCompleted ? 'line-through text-gray-500' : ''
                    }`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 transition-colors ml-3"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${statusColors[task.status]}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{progress}%</span>
                    <span className="font-medium">{task.status}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {['Pending', 'In Progress', 'Completed'].map(status => (
                    <button
                      key={status}
                      onClick={() => updateTaskStatus(task.id, status)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        task.status === status
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {status === 'Pending' && <Circle size={12} className="inline mr-1" />}
                      {status === 'In Progress' && <Clock size={12} className="inline mr-1" />}
                      {status === 'Completed' && <CheckCircle2 size={12} className="inline mr-1" />}
                      {status}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4 text-xs text-gray-500">
                  <span>Created: {formatDate(task.createdAt)}</span>
                  {task.completedAt && (
                    <span className="text-green-600 font-medium">
                      Completed: {formatDate(task.completedAt)}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {filteredTasks.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No tasks found</p>
              <p className="text-gray-400 text-sm mt-2">Create a new task to get started</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Task</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="Enter task title"
                autoFocus
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                rows="3"
                placeholder="Enter task description"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setNewTask({ title: '', description: '' });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createTask}
                disabled={!newTask.title.trim()}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;