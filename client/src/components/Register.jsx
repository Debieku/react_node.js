import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  function checkEmail(strEmail){
    return /^\w+@([\w\-]+\.)+\w{2,3}$/.test(strEmail);
  }

  const handleRegister = () => {
    if (verifyPassword != password||verifyPassword=="") {
      alert('Please validate your password.');
      return;
    }
    let user;
    const validate = "/^([A-Za-z0-9_\-\.])"
    if (name==""||username==""|| !checkEmail(email)) {
      alert("the parameters you entered are not correct")
      return
    }
    const newUser = { "name": name, "userName": username, "email": email, "phone": phone, "password": password }
    fetch('http://localhost:8080/user', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { "Content-type": "application/json; charset=UTF-8", },
    })
      .then(response => response.json())
      .then(response => {
        if (response.resualt == "userName duplicate") alert('userName exist')
        else {
          user = { "id": response.insertId, "name": name, "username": username, "email": email, "phone": phone };
          navigate(`/users/${response.insertId}/home`, { state: { user: user } })
        }
      })
      .catch(error => console.error('Error:', error));

  };

  return (
    <div>
      <div className='signUpLogin-container'>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
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
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Verify Password"
          value={verifyPassword}
          required
          onChange={(e) => setVerifyPassword(e.target.value)}
        />
        <button className='signUpBtn' onClick={handleRegister}>Register</button>
        <button className='loginBtn' onClick={() => navigate('/login')}>login</button>
      </div>

    </div>
  );
};
export default Register;