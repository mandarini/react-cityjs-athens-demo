import React from 'react';
import TaskList from '../components/TaskList';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';
import { Plus, RefreshCw, LogOut, AlertCircle } from 'lucide-react';
import LoadingSpinner from '../components/Auth/LoadingSpinner';

const RANDOM_TASK_TEMPLATES = [
  'Optimize application performance',
  'Add user authentication',
  'Implement data validation',
  'Create unit tests',
  'Set up CI/CD pipeline',
  'Add error handling',
  'Implement state management',
  'Create API integration',
  'Add accessibility features',
  'Optimize bundle size',
  'Implement lazy loading',
  'Add internationalization',
  'Create mobile responsive design',
  'Set up monitoring and analytics',
  'Implement caching strategy',
];

const Tasks: React.FC = () => {
  const { user, signOut } = useAuth();
  const { tasks, loading, error, addTask, toggleTask } = useTasks();

  const addRandomTask = async () => {
    const randomTitle = RANDOM_TASK_TEMPLATES[
      Math.floor(Math.random() * RANDOM_TASK_TEMPLATES.length)
    ];

    const result = await addTask(randomTitle);
    if (result.error) {
      console.error('Failed to add task:', result.error);
    }
  };

  const handleToggleTask = async (id: number) => {
    const result = await toggleTask(id);
    if (result.error) {
      console.error('Failed to toggle task:', result.error);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Task Management Demo
              </h1>
              <p className="text-gray-600 mb-2">
                Welcome back, {user?.email}! Manage your tasks with real-time synchronization
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={addRandomTask}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Random Task
              </button>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-2xl font-bold text-orange-600">{totalCount - completedCount}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Current Tasks
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%'
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {completedCount} of {totalCount} tasks completed
            </p>
          </div>

          <TaskList tasks={tasks} onToggleTask={handleToggleTask} />
        </div>
      </div>
    </div>
  );
};

export default Tasks;