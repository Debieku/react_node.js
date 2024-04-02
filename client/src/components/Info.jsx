import {UserContext} from '../contexts/UserProvider';
import React, {useState} from 'react';
// import '../styles/Global.css';
// import '../styles/Info.css';

const Info = () => {
    // const { user } = useContext(UserContext);
    const [user, setCurrentUser] = useState({id:1, name:"Muffy", email:	"Indore", phone: 5555555});
    return (
        <>
        <div className="info-container">
            <h1 className="info-heading">Info</h1>
            <div className="info-content">
            <span><strong>name:</strong> {user.name}</span><br/>
            <span><strong>email:</strong> {user.email}</span><br/>
            <span><strong>username:</strong> {user.username}</span><br/>
            <span><strong>phone:</strong> {user.phone}</span>
            </div>
        </div>
        </>
    );
};
export default Info;