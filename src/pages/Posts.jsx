import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import * as postsService from '../services/posts'

const Posts = () => {
    const { user, logout } = useAuth()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        loadPosts()
    }, [])

    const loadPosts = async () => {
        try {
            const data = await postsService.getPosts()
            setPosts(data)
        } catch {
            setError('Neizdevās ielādēt ierakstus')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        try {
            await postsService.createPost({ title, body, user_id: user.id })
            setTitle('')
            setBody('')
            loadPosts()
        } catch (err) {
            const data = err.response?.data
            if (data?.errors) {
                const firstError = Object.values(data.errors)[0][0]
                setError(firstError)
            } else {
                setError(data?.message || 'Neizdevās izveidot ierakstu')
            }
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Vai tiešām dzēst?')) return

        try {
            await postsService.deletePost(id)
            setPosts(posts.filter(p => p.id !== id))
        } catch {
            setError('Neizdevās dzēst ierakstu')
        }
    }

    const handleLogout = async () => {
        await logout()
    }

    if (loading) {
        return <div>Ielāde...</div>
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Ieraksti</h1>
                <div>
                    <span>Sveicināts, {user?.name}!</span>
                    <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
                        Iziet
                    </button>
                </div>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <div>
                    <label>Virsraksts</label>
                    <br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Teksts</label>
                    <br />
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Pievienot</button>
            </form>

            <div>
                {posts.length === 0 ? (
                    <p>Nav ierakstu</p>
                ) : (
                    posts.map(post => (
                        <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <small>Autors: {post.user?.name || 'Nezināms'}</small>
                            <br />
                            <button onClick={() => handleDelete(post.id)}>Dzēst</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Posts
