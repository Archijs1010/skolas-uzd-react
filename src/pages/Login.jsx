import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await login(email, password)
            navigate('/posts')
        } catch (err) {
            setError(err.response?.data?.message || 'Pieteikšanās neizdevās')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Pieteikties</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Parole</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Gaida...' : 'Pieteikties'}
                </button>
            </form>
            <p>
                Nav konta? <Link to="/register">Reģistrēties</Link>
            </p>
        </div>
    )
}

export default Login
