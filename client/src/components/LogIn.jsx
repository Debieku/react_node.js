
import React, { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
// import '../styles/RegisterAndLogin.css';


const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [toRegister, setToRegister] = useState(false);
  const [user, setCurrentUser] = useState(false);

  const handleLogin = () => {
    if (userName == '' || password == '') {
      alert("Enter name and password");
      return;
    }
    console.log(userName + password)
    fetch(`http://localhost:8080/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "userName": userName, "password": password })
    })
      .then(response => response.json())
      .then(jsonUser => {
        console.log(jsonUser)
        if (jsonUser.result == 0)
          alert('please try again or register.');
        else {
          setCurrentUser(jsonUser.user[0]);
          setIsLoggedInUser(true);
        }
        setUserName('');
        setPassword('');
      });
  };

  // useEffect(() => {
  //    localstorageAndLogin();
  // }, [user]);

  // const localstorageAndLogin = () => {
  //   if (user != '' && password == user.website) {
  //     setCurrentUser(user);
  //     setIsLoggedInUser(true);
  //   }
  //   else if (userName != '') {
  //     alert('try again or register');
  //   }
  //   setUserName('');
  //   setPassword('');
  // };

  const goToRegister = () => {
    setToRegister(true);
  };

  return (
    <div>
      <Navigate to={isLoggedInUser ? `/users/${user.id}/home` : toRegister ? "/register" : "/login"} />
      <div className='signUpLogin-container'>
        <h2>insert user</h2>
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='loginBtn' onClick={handleLogin}>Login</button>
        <button className='signUpBtn' onClick={goToRegister}>Register</button>
      </div>
    </div>
  );
};

export default Login;
