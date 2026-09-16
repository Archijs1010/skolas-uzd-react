import { createContext, useContext, useState, useEffect } from 'react'
import * as authService from '../services/auth'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (token) {
            authService.getUser()
                .then(data => setUser(data))
                .catch(() => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    setToken(null)
                    setUser(null)
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [token])

    const login = async (email, password) => {
        const data = await authService.login({ email, password })
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setToken(data.token)
        setUser(data.user)
        return data
    }

    const register = async (name, email, password, password_confirmation) => {
        const data = await authService.register({ name, email, password, password_confirmation })
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setToken(data.token)
        setUser(data.user)
        return data
    }

    const logout = async () => {
        await authService.logout()
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
