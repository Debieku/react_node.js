import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';
// import '../styles/Global.css';

const Todos = () => {
  const { userId } = useParams();
//   const { user } = useContext(UserContext);

  const [todos, setTodos] = useState('');
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState('');
  const [forceRender, setForseRender] = useState(false);
  const [todoId, setTodoId] = useState('');
  const [isToAddTodo, setIsToAddTodo] = useState('');
  const [toUpdateTodoId, setToUpdateTodoId] = useState('');
  const [toSearchId, setToSearchId] = useState('');
  const [toSearchTitle, setToSearchTitle] = useState('');
  const [toSearchState, setToSearchState] = useState('');
  const [searchTodosdBy, setSearchTodosBy] = useState('');

  const [user, setCurrentUser] = useState({id:1, name:"Muffy", email:	"Indore", phone:	5555555});
  useEffect(() => {
    fetch(`http://localhost:8080/todo?userId=${user.id}`)
    .then(response => response.json())
    .then(json => {setTodos(json);})
    .then(console.log(todos));
    }, []);

  if(!todos){
      return <></>;
  }


  const addNewTodo = () => {
    let addedTodo = { "userId": user.id, "title": title,"completed": completed };
    addedTodo=JSON.stringify(addedTodo);
    fetch('http://localhost:8080/todo', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: addedTodo,
    })
      .then(response => response.json())
      .then(json=>{addedTodo={"id":json.insertId,"userId": user.id, "title": title,  "completed": completed};
       setTodos(prevTodos => [...prevTodos, addedTodo]);})
      .catch(error => console.error('Error:', error));
    setTitle('');
    setCompleted('');
    setIsToAddTodo(false);  
  };


  // todos.map((todo) => (
  //     todo.id = parseInt(todo.id)
  // ));


  const updateTodo = ( todo, e, ti) => {
    console.log(title); 
    fetch(`http://localhost:8080/todo/${todo.id}`, {
            method: "PUT",
            body: JSON.stringify({
                "title":ti,
                "completed": e
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).catch(error=>console.error('Error:', error))

    setTodos(prevTodos => prevTodos.map((prevTodo) => {
        if(prevTodo.id === todo.id){
          prevTodo.completed = e;
          prevTodo.title=ti;
        }
        return (prevTodo);
      }));
      setToUpdateTodoId('');
      setTitle('');
      console.log(title); 
  };


  // const updateTodo = (todo) => {
  //   // const updatedTodo = { 
  //   //     "userId": `${todo.userI}`,
  //   //     "id": `${todo.id}`,
  //   //     "title": title,
  //   //     "completed": todo.completed
  //   // };

  //   fetch(`http://localhost:8080/todos?todoId=${todo.id}`, {
  //       method: "put",
  //       body: JSON.stringify({
  //         "title":title,
  //       }),
  //   })
  //   .then(response => response.json())
  //   .catch(error => console.error('Error:', error));

  //   setTodos(prevTodos => prevTodos.map((prevTodo) => {
  //      if(prevTodo.id === todo.id) 
  //       prevTodo.title=title 
  //      return prevTodo;
  //   }));
   
  // };

  const searchTodos = (propertytype, property) => {
    if (property === '' || property === undefined) {
      fetch(`http://localhost:8080/todos?userId=${user.id}`)
          .then(response => response.json())
          .then(json => setTodos(json))
          .then(setSearchTodosBy('finished'));

    } else {
      fetch(`http://localhost:3000/todos?${propertytype}=${property}`)
          .then(response => response.json())
          .then(json => setTodos(json))
          .then(setSearchTodosBy('finished'));
    }
  };

  const deleteTodo = (todoId) => {
    fetch(`http://localhost:8080/todo/${todoId}`, {
      method: "DELETE",
    })
      .catch(error => console.error('Error:', error));

      setTodos(prevTodos => prevTodos.filter(todo => { return todo.id !== todoId; }));
    };
   
  



  
  const cancel = () => {
    setIsToAddTodo(false);
    setToUpdateTodoId('');
    setSearchTodosBy('');
    setToSearchId('');
    setTitle('');
  };

  const cancelSearch = () => {
    setSearchTodosBy('');
    setToSearchId('');
    setTitle('');
    setToSearchId('');
    setSearchTodosBy('');
    fetch(`http://localhost:3000/todos?userId=${user.id}`)
      .then(response => response.json())
      .then(json => setTodos(json));
  };

  const compareAlphabetical = (a, b) => {
    if (a.title < b.title) {
      return -1;
    }if (a.title > b.title) {
      return 1;
    }
    return 0;
  };

  const compareSerially = (a, b) => {
    if (a.id < b.id) {
      return -1;
    }if (a.id > b.id) {
      return 1;
    }
    return 0;
  };

  const compareCompletion = (a, b) => {
    if (a.completed < b.completed) {
      return -1;
    }if (a.completed > b.completed) {
      return 1;
    }
    return 0;
  };

  const handleSelectTodos = (selectType) => {
    const currentTodos = todos;
    if (selectType === 'alphabetical') {
      currentTodos.sort(compareAlphabetical);
    }
    else if (selectType === 'serially') {
      currentTodos.sort(compareSerially);
    }
    else if (selectType === 'random') {
      currentTodos.sort((a, b) => 0.5 - Math.random());
    }
    else if (selectType === 'completion') {
      currentTodos.sort(compareCompletion);
    }
        setTodos(currentTodos);
        setForseRender(!forceRender);
    };

  
    if(todos=='')
      return(<></>)
    return(
        <>
        <div className="container">
        <h1 className="heading">Todos</h1>
        <div>
          <div className="section search-section">
            <h2>Search Todos</h2>
            {searchTodosdBy ==='id' ?
              <>
              <input
                  type="number"
                  placeholder="id"
                  value={toSearchId}
                  onChange={(e) => setToSearchId(e.target.value)}
              />
              <button onClick={() => searchTodos(searchTodosdBy, toSearchId)}>search</button>
              <button onClick={() => { cancel(); }}>cancel</button><br />
              </>
              :searchTodosdBy === 'title'?
                <>
                <input
                    type="text"
                    placeholder="title"
                    value={toSearchTitle}
                    onChange={(e) => setToSearchTitle(e.target.value)}
                />
                <button onClick={() => searchTodos(searchTodosdBy, toSearchTitle)}>search</button>
                <button onClick={() => { cancel(); }}>cancel</button><br />
                </>
                :searchTodosdBy === 'completed'?
                <>
                <input
                    type="text"
                    placeholder="is complited?"
                    value={toSearchState}
                    onChange={(e) => setToSearchState(e.target.value)}
                />
                <button onClick={() => searchTodos(searchTodosdBy, toSearchState == 'true')}>search</button>
                <button onClick={() => { cancel(); }}>cancel</button><br />
                </>
                :searchTodosdBy === 'finished' ?
                <>
                  <button onClick={() => { cancelSearch(); }}>cancel search</button><br />

                </>
                :<>
                <button onClick={()=>setSearchTodosBy('id')}>search by id:</button>
                <button onClick={()=>setSearchTodosBy('title')}>search by title:</button>
                <button onClick={()=>setSearchTodosBy('completed')}>search by state:</button>
                </>
                
            }
          </div>

          <div className="actions item-actions">
              <h2>Select todos for user {userId}:</h2>
              <button onClick={()=>handleSelectTodos('serially')} >Show serially</button>
              <button onClick={()=>handleSelectTodos('alphabetical')}>View in alphabetical order</button>
              <button onClick={()=>handleSelectTodos('completion')}>View by task completion</button>
              <button onClick={()=>handleSelectTodos('random')}>Show in random order</button>
          </div>
          {todos.map((todo, index) => (
              <div key={todo.id} className="item">
                <div className="item-content">
                  <p>{todo.id}.  {todo.title}
                    <input 
                    type="checkbox" 
                    defaultChecked={todo.completed}
                    value={completed} onChange={()=>{updateTodo( todo,event.target.checked, todo.title)}}
                    />
                  </p>
                </div>
                  { <>
                    <div className="actions item-actions">
                      <button onClick={() => deleteTodo(todo.id)}>delete todo</button>
                      {toUpdateTodoId === todo.id ? 
                      <>
                          <input
                              type="text"
                              placeholder="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                          />
                          <button onClick={() => { updateTodo(todo,todo.completed, title); }}>update</button>
                          <button onClick={() => { cancel(); }}>cancel</button>
                      </>
                          : <button onClick={() => setToUpdateTodoId(todo.id)}>update todo</button>
                      }
                    </div>
                  </>}
              </div>
          ))}
          <div className="section add-section">
          {isToAddTodo ?
          <>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
              type="text"
              placeholder="is complited?"
              value={completed}
              onChange={(e) => setCompleted(e.target.value)}
          />
          <button onClick={() => addNewTodo()}>add</button>
          <button onClick={() => { cancel(); }}>cancel</button><br />
          </>
          : <button onClick={() => setIsToAddTodo(true)}>add todo</button>
          }
      </div>
    </div>
    </div>
  </>

  );
};

export default Todos;