import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await register(name, email, password, passwordConfirmation)
            navigate('/posts')
        } catch (err) {
            const data = err.response?.data
            if (data?.errors) {
                const firstError = Object.values(data.errors)[0][0]
                setError(firstError)
            } else {
                setError(data?.message || 'Reģistrācija neizdevās')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Reģistrēties</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Vārds</label>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <div>
                    <label>Apstiprināt paroli</label>
                    <br />
                    <input
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Gaida...' : 'Reģistrēties'}
                </button>
            </form>
            <p>
                Jau ir konts? <Link to="/login">Pieteikties</Link>
            </p>
        </div>
    )
}

export default Register
