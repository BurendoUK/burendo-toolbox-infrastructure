import './App.css';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

function App() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginRedirect({
      scopes: ['User.Read'], // You can customise this later
    });
  };

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <div className="App">
      <h1>🔧 Burendo Toolbox</h1>

      {!isAuthenticated ? (
        <button onClick={handleLogin}>Log in with Microsoft</button>
      ) : (
        <>
          <p>Welcome, {accounts[0]?.name || 'user'}!</p>
          <p>Email: {accounts[0]?.username}</p>
          <button onClick={handleLogout}>Log out</button>
        </>
      )}
    </div>
  );
}

export default App;
