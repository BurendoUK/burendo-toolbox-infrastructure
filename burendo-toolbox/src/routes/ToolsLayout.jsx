import { Outlet, Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { Home } from 'lucide-react';

export default function ToolsLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="w-full px-6 py-4 bg-white dark:bg-gray-800 shadow flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Burendo Toolbox</h1>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`text-sm font-medium flex items-center gap-1 hover:underline ${location.pathname === '/' ? 'text-blue-600 dark:text-blue-400' : ''
              }`}
          >
            <Home size={18} /> Home
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 w-full overflow-hidden">
        <div className='w-full'>

        <Outlet />
        </div>
      </main>
    </div>
  );
}
