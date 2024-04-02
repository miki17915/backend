import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Welcome from './Welcome.jsx';
import Greating from './Greating.jsx';
import Login from "./LogIn.jsx";
import Home from './Home.jsx';
import Signup from './Signup.jsx';
import Liked from './Liked.jsx';
import Bookmark from './bookmark.jsx';
import DisLike from './dislike.jsx';
import DeletedM from './deletedm.jsx';
import Profile from './Profile.jsx';
import Signup2 from './Signup2.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/greating" element={<Greating />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup2" element={<Signup2 />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Liked" element={<Liked />} />
      <Route path="/bookmark" element={<Bookmark />} />
      <Route path="/dislike" element={<DisLike />} />
      <Route path="/deletedm" element={<DeletedM />} />
      <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
