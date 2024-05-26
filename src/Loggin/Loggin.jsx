import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

function Loggin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameToId = {
    'admin': '/dashboardAdmin',
    'casa': '/dashboardHome',
    'c5': '/dashboardC5',
    'transporte': '/dashboardMobility'
  };
  
  const handleLogin = () => {
    const dashboardRoute = usernameToId[username];
    if (dashboardRoute) {
      navigate(dashboardRoute);
    } else {
      message.error('Usuario no encontrado');
    }
  };

  return (
    <div>
      <h1>Loggin</h1>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Loggin;
