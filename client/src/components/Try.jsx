import React ,{ useEffect, useState } from "react";
import cors from 'cors';

const Try=()=>{
    const [todos, setTodos]=useState('');
    useEffect(() => {
        fetch(`http://localhost:8080/todo/1`)
        .then(response => response.json())
        .then(json => {setTodos(json);})
        .then(console.log(todos));
        }, []);

        return (
        <>
        <h>hhh</h>
        <button onClick={()=>{return(<h1>{todos.id}</h1>)}}>hh</button>
        <h1>{todos.id}</h1>
        </>)
}

export default Try;