import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';

// import '../styles/Global.css';


const Home = () => {
    const [isToUpdate, setIsToUpdate] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const location = useLocation();
    const { user } = location.state;
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.setItem('currentUser', '');
        navigate('/login');
    };

    const update_password = () => {
        fetch(`http://localhost:8080/login/${user.id}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "password": newPassword , "password": oldPassword })
        })
            .then(response => response.json())
            .then(jsonUser => {
                console.log(jsonUser)
                if (jsonUser.result == 0)
                    alert('password is wrong');
            });
    }

    const cancel = () => {
        setIsToUpdate(false);
        setNewPassword('');
        setOldPassword('');
    }
    return (
        <>
            <div className="container">
                <h1 className="heading">Hi {user.name}</h1>
                <div className="home-buttons">
                    <button onClick={handleLogOut}>Logout</button>
                    <button onClick={() => navigate("posts", { state: { user: user } })}>Posts</button>
                    <button onClick={() => navigate("todos", { state: { user: user } })}>Todos</button>
                    <button onClick={() => navigate("info", { state: { user: user } })}>Info</button>
                    {isToUpdate ? <> <input type="text" placeholder="current password" value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)} />
                        <input type="text" placeholder="new password" value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)} />
                        <button onClick={update_password}>update password</button>
                        <button onClick={cancel}>cancel</button>
                    </> :
                        <button onClick={() => setIsToUpdate(true)}>update password</button>}
                </div>
                <Outlet />
            </div>
        </>
    );
};

export default Home;