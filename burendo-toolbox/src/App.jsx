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
  const logout = () => instance.logoutRedirect();

  return (
    <div className="flex items-center justify-center px-4">
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold  mb-4">Burendo Toolbox</h1>
      {!isAuthenticated ? (
        <button onClick={login}>Sign in with SSO</button>
      ) : (
        <>
          <p className="mb-2">Welcome, {accounts[0]?.name}!</p>
          <p className="mb-4">Email: {accounts[0]?.username}</p>
          <button onClick={logout}>Log Out</button>
        </>
      )}
      <nav className="mt-6">
        <Link to="/tools" className="text-blue-600 hover:underline">Go to Tools</Link>
      </nav>
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
