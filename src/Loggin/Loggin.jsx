import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

function Loggin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameToId = {
    'admin': 0,
    'casa': 1,
    'c5': 2,
    'transporte': 3
  };
  
  const handleLogin = () => {
    const userId = usernameToId[username];
    if (userId !== undefined) {
        navigate(`/dashboard?user=${userId}`);
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
