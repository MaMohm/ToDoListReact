import React, { useState, useEffect } from 'react';
import {
  Plus, Trash2, CheckCircle2, Circle, Clock,
  Search, Bell, Menu, Calendar, Tag, User,
  Layout, Settings, LogOut, ChevronRight, MoreVertical
} from 'lucide-react';

const STORAGE_KEY = 'taskManagerData_v2';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    type: 'Operational',
    dueDate: '',
    priority: 'Medium'
  });
  const [filter, setFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      status: 'In Progress',
      type: newTask.type,
      priority: newTask.priority,
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      assignee: { name: 'You', avatar: 'https://ui-avatars.com/api/?name=You&background=random' },
      createdAt: new Date().toISOString(),
      completedAt: null
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', type: 'Operational', dueDate: '', priority: 'Medium' });
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

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getPriorityColor = (p) => {
    switch (p) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeColor = (t) => {
    switch (t) {
      case 'Design': return 'bg-pink-100 text-pink-700';
      case 'Development': return 'bg-blue-100 text-blue-700';
      case 'Operational': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex font-sans text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col z-20
        ${sidebarOpen ? 'w-64' : 'w-20'}`}
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <CheckCircle2 className="text-white" size={20} />
            </div>
            {sidebarOpen && <span className="font-bold text-xl tracking-tight">TaskFlow</span>}
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          <NavItem icon={<Layout size={20} />} label="My work" active={true} isOpen={sidebarOpen} />
          <NavItem icon={<Calendar size={20} />} label="Calendar" isOpen={sidebarOpen} />
          <NavItem icon={<User size={20} />} label="Team" isOpen={sidebarOpen} />
          <NavItem icon={<Tag size={20} />} label="Projects" isOpen={sidebarOpen} />
        </nav>

        <div className="p-3 border-t border-gray-100">
          <NavItem icon={<Settings size={20} />} label="Settings" isOpen={sidebarOpen} />
          <NavItem icon={<LogOut size={20} />} label="Logout" isOpen={sidebarOpen} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">My Tasks</h2>
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-medium">
              {tasks.length}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search tasks..."
                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all w-64 text-sm"
              />
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white shadow-sm cursor-pointer hover:shadow-md transition-shadow"></div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-[0.98]">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm border border-gray-200">
                {['all', 'Pending', 'In Progress', 'Completed', 'Scheduled'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-gray-500 hover:bg-gray-50'
                      }`}
                  >
                    {f === 'all' ? 'All' : f}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="group flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                <span className="font-medium">New Task</span>
              </button>
            </div>

            {/* Tasks List */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200/50 bg-gray-50/50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-4">Task Name</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Priority</th>
                      <th className="px-6 py-4">Due Date</th>
                      <th className="px-6 py-4">Assignee</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredTasks.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                          <div className="flex flex-col items-center gap-2">
                            <Layout className="text-gray-300" size={48} />
                            <p>No tasks found via this filter</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredTasks.map(task => (
                        <tr key={task.id} className="group hover:bg-white/80 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateTaskStatus(task.id, task.status === 'Completed' ? 'Pending' : 'Completed')}
                                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${task.status === 'Completed' ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300 hover:border-indigo-500'
                                  }`}
                              >
                                {task.status === 'Completed' && <CheckCircle2 size={12} className="text-white" />}
                              </button>
                              <span className={`font-medium text-gray-900 ${task.status === 'Completed' ? 'line-through text-gray-400' : ''}`}>
                                {task.title}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(task.status)}
                              <span className="text-sm font-medium text-gray-700">{task.status}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getTypeColor(task.type)}`}>
                              {task.type || 'General'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                              {task.priority || 'Normal'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                            {task.dueDate}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <img src={task.assignee?.avatar} alt={task.assignee?.name} className="w-6 h-6 rounded-full border border-gray-200" />
                              <span className="text-sm text-gray-600">{task.assignee?.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg group-hover:opacity-100 opacity-0"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full scale-100 animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Plus className="bg-indigo-100 text-indigo-600 p-1 rounded-lg" size={32} />
              Create Task
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Review Q3 Financials"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={newTask.type}
                    onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                  >
                    <option>Operational</option>
                    <option>Design</option>
                    <option>Development</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none"
                  rows="3"
                  placeholder="Add details..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createTask}
                disabled={!newTask.title.trim()}
                className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-colors shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none"
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

// Helper Components
const NavItem = ({ icon, label, active, isOpen }) => (
  <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
    }`}>
    <span className={active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}>{icon}</span>
    {isOpen && <span className="font-medium">{label}</span>}
  </button>
);

const getStatusIcon = (status) => {
  switch (status) {
    case 'Completed': return <CheckCircle2 size={16} className="text-indigo-600" />;
    case 'In Progress': return <Clock size={16} className="text-yellow-500" />;
    default: return <Circle size={16} className="text-gray-400" />;
  }
};

export default TaskManager;