import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { Routes, Route, Link } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import ToolsLayout from './routes/ToolsLayout';
import ToolsIndex from './routes/ToolsIndex'; // ✅ Must import this
// Tool routes
import ExampleTool from './routes/ExampleTool'; // If this exists, otherwise comment/remove
import DoorAccess from './routes/DoorAccess';

function Home() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const login = () => instance.loginRedirect({ scopes: ['User.Read'] });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-4">
      <div className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow p-10 text-center">
        <div className="mb-8">
          <img
            src="/Burendo_Landscape_RGB.png"
            alt="Burendo Logo"
            className="mx-auto mb-4 w-36"
          />
          <h1 className="text-3xl font-bold">Burendo Toolbox</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Secure internal tools, all in one place.
          </p>
        </div>

        {!isAuthenticated ? (
          <button
            onClick={login}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-base hover:bg-blue-700 transition"
          >
            Sign in with SSO
          </button>
        ) : (
          <div className="space-y-6">
            <Link
              to="/tools"
              className="inline-block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-blue-700 transition"
            >
              🧰 Open Your Toolbox
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/tools"
        element={
          <ProtectedRoute>
            <ToolsLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ToolsIndex />} />
        <Route path="example" element={<ExampleTool />} />
        <Route path="door-access" element={<DoorAccess />} />
      </Route>
    </Routes>
  );
}

export default App;
