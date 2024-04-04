import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../styles/RegisterAndLogin.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState('');

  const navigate = useNavigate();

  // const loginUser = () => {
  //   setCurrentUser(user);
  // };

  const handleRegister = () => {
    if (verifyPassword != password) {
      alert('Please validate your password.');
    }
      console.log("jjjj")
      const newUser = { "name": name, "userName": username, "email": email, "phone": phone, "password": password }
      fetch('http://localhost:8080/user', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: { "Content-type": "application/json; charset=UTF-8", },
      })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          setUser({ "id": response.insertId, "name": name, "userName": username, "email": email, "phone": phone })})
          .then( console.log("user"+newUser),
            navigate(`/users/${user.id}/home`, { state: { user: user } }))
        .catch(error => console.error('Error:', error));
    
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div>
      <div className='signUpLogin-container'>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Verify Password"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
        />
        <button className='signUpBtn' onClick={handleRegister}>Register</button>
        <button className='loginBtn' onClick={handleLoginClick}>login</button>
      </div>

    </div>
  );
};
export default Register;