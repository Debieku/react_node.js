import cors from 'cors';
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Todos from './components/Todos';
import Posts from './components/Posts';
import Info from './components/Info';
import Comments from './components/Comments';
import Register from './components/Register';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="users/:userId">
          <Route path="home" element={<Home />}>
            <Route path="info" element={<Info />} />
            <Route path='todos' element={<Todos />} />
            <Route path="posts" element={<Posts />} >
              <Route path=":podtId/comments" element={<Comments />} />
            </Route>
          </Route>
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
