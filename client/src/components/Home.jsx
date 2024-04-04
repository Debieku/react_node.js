import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';
// import '../styles/Global.css';

const Home = () => {
  const location = useLocation();
  const { user } = location.state;
    const navigate = useNavigate(); 

    const handleLogOut = () => {   
        localStorage.setItem('currentUser', '');
        navigate('/login');
    };
    console.log(user);
    return(
        <>
        <div className="container">
            <h1 className="heading">Hi {user.name}</h1>
            <div className="home-buttons">
                <button onClick={handleLogOut}>Logout</button>
                <button onClick={()=>navigate("posts", {state:{ user: user }})}>Posts</button>
                <button onClick={()=>navigate("todos", {state:{ user: user }})}>Todos</button>
                <button onClick={()=>navigate("info", {state:{ user: user }})}>Info</button>
            </div>
            <Outlet />
        </div>
        </>
    );
};

export default Home;