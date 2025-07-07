import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LogInPage from './pages/LogInPage'
import HomePage from './pages/HomePage'
import LinkPasswordPage from './pages/LinkPasswordPage'
import PostPage from './pages/PostPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogInPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/linkpassword" element={<LinkPasswordPage/>} />
        <Route path="/posts" element={<PostPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
