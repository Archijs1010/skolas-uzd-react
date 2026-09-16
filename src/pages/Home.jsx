import { useState, useEffect } from 'react'
import api from '../services/api'

const Home = () => {
    const [message, setMessage] = useState('Loading...')

    useEffect(() => {
        api.get('/hello')
            .then(response => setMessage(response.data.message))
            .catch(() => setMessage('Neizdevās savienoties ar Laravel'))
    }, [])

    return (
        <div>
            <h1>React Frontend</h1>
            <p>{message}</p>
        </div>
    )
}

export default Home
