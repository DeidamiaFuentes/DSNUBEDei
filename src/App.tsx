import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LogInPage from './pages/LogInPage'
import HomePage from './pages/HomePage'
import LinkPasswordPage from './pages/LinkPasswordPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage/>} />
          <Route path="/login" element={<LogInPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/linkpassword" element={<LinkPasswordPage/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  
  )
}

export default App
