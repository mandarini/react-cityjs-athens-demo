import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckSquare } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200"
            >
              Agentic Coding Demo
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/')
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
            <Link
              to="/tasks"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/tasks')
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Tasks
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;