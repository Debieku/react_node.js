
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// import '../styles/RegisterAndLogin.css';


const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [toRegister, setToRegister] = useState(false);
  const [user, setUser] = useState('');

  // const navigate = useNavigate();

  const handleLogin = () => {
    if (userName == '' || password == '') {
      alert("Enter name and password");
      return;
    }
    fetch(`http://localhost:8080/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "userName": userName, "password": password })
    })
      .then(response => response.json())
      .then(jsonUser => {
        if (jsonUser == "wrong details")
          alert('please try again or register.');
        else if (jsonUser.result == "blocked")
          alert("you tried too many times, you are blocked! try again later");
        else {
          setUser(jsonUser.user[0]);
          localStorage.setItem("currentUser", JSON.stringify(jsonUser.user));
          setIsLoggedInUser(true);
        }
        setUserName('');
        setPassword('');
      })
      .catch(error => console.error('Error:', error));
  };


  const goToRegister = () => {
    setToRegister(true);
  };

  return (
    <div>
      <Navigate to={isLoggedInUser ? `/users/${user.id}/home` : toRegister ? "/register" : "/login"} state={{ user: user }} />
      <div className='signUpLogin-container'>
        <h2>insert user</h2>
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='loginBtn' onClick={handleLogin}>Login</button>
        <button className='signUpBtn' onClick={() => goToRegister()}>Register</button>
      </div>
    </div>
  );
};

export default Login;
