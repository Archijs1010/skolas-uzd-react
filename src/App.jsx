import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Posts from './pages/Posts'

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                    <Link to="/" style={{ marginRight: '10px' }}>Sākums</Link>
                    <Link to="/posts" style={{ marginRight: '10px' }}>Ieraksti</Link>
                    <Link to="/login">Pieteikties</Link>
                </nav>
                <div style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/posts" element={
                            <ProtectedRoute>
                                <Posts />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
