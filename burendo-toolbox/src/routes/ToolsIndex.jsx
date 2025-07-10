import {
  DoorOpen,
  Settings,
  Users,
  FolderKanban,
  CalendarCheck,
  Database,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const tools = [
  {
    label: 'Door Access',
    icon: DoorOpen,
    href: '/tools/door-access',
  },
  {
    label: 'Admin',
    icon: Settings,
    href: '/tools/admin',
  },
  {
    label: 'Users',
    icon: Users,
    href: '/tools/users',
  },
  {
    label: 'Projects',
    icon: FolderKanban,
    href: '/tools/projects',
  },
  {
    label: 'Calendar',
    icon: CalendarCheck,
    href: '/tools/calendar',
  },
  {
    label: 'Data',
    icon: Database,
    href: '/tools/data',
  },
];

export default function ToolsIndex() {
  return (
    <div className="flex flex-col flex-grow items-center w-full max-w-6xl px-4 pt-10">
      <h2 className="text-2xl font-semibold mb-10">Your Tools</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-10 w-full max-w-[700px]">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            to={tool.href}
            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition text-center hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <tool.icon size={36} className="mb-3 text-blue-700 dark:text-blue-400" />
            <span className="text-base font-medium text-gray-900 dark:text-gray-100">
              {tool.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
