import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './components/LogIn';
import Home from './components/Home';
import Todos from './components/Todos';
import Posts from './components/Posts';
import Info from './components/Info';
import Comments from './components/Comments';
function App() {
  const [count, setCount] = useState(0)

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
        {/* <Route path="register" element={<Register />} />
        <Route path="finishRegister" element={<FinishRegister />} /> */}
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
