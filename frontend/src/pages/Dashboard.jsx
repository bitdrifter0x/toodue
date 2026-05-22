import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Dashboard() {

  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const fetchTasks = async () => {
    setError('')
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, { credentials: 'include' })
      const data = await response.json()
      setTasks(data.tasks)
    } catch (error) {
      setError('Failed to load tasks')
    }
  }

  useEffect(() => { fetchTasks() }, [])

  const updateTasks = async (taskId, isCompleted) => {
    setError('')
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify({ isCompleted: !isCompleted }),
        headers: { 'Content-Type': 'application/json' }
      })
      fetchTasks()
    } catch (error) { setError('Failed to update task') }
  }

  const createTasks = async () => {
    if (!title.trim()) return
    setError('')
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ title }),
        headers: { 'Content-Type': 'application/json' }
      })
      fetchTasks()
      setTitle('')
    } catch (error) { setError('Failed to create task') }
  }

  const deleteTasks = async (taskId) => {
    setError('')
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      fetchTasks()
    } catch (error) { setError('Failed to delete task') }
  }

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, { method: 'POST', credentials: 'include' });
    navigate('/login');
    window.location.reload();
  };

  const pending = tasks.filter(t => !t.isCompleted)
  const completed = tasks.filter(t => t.isCompleted)

  return (
    <div style={{ minHeight: '100vh', background: '#F5EFFF', fontFamily: 'sans-serif', color: '#1C1C1A' }}>

      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.1rem 2.5rem', borderBottom: '0.5px solid #DDD8CE', background: '#F5EFFF' }}>
        <span style={{ fontSize: '16px', fontWeight: '500', letterSpacing: '-0.02em' }}>
          Too<span style={{ color: '#A294F9' }}>Due</span>
        </span>
        <button onClick={handleLogout} style={{ fontSize: '13px', color: '#6B6355', background: 'transparent', border: '0.5px solid #CCC7BC', padding: '7px 16px', borderRadius: '7px', cursor: 'pointer' }}>
          logout
        </button>
      </nav>

      {/* Main */}
      <div style={{ maxWidth: '580px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '500', letterSpacing: '-0.02em', marginBottom: '4px' }}>your tasks</h1>
          <p style={{ fontSize: '13px', color: '#A09585' }}>
            {pending.length} remaining · {completed.length} completed
          </p>
        </div>

        {/* Error */}
        {error && (
            <p style={{ color: '#C0392B', fontSize: '13px', marginBottom: '1rem' }}>
                {error}
            </p>
        )}

        {/* Add task input */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createTasks()}
            placeholder="add a new task..."
            style={{ flex: 1, fontSize: '14px', padding: '10px 14px', borderRadius: '8px', border: '0.5px solid #E5D9F2', background: '#FFFCF7', color: '#1C1C1A', outline: 'none' }}
          />
          <button
            onClick={createTasks}
            style={{ fontSize: '13px', fontWeight: '500', background: '#A294F9', color: '#F5F0E8', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
          >
            add
          </button>
        </div>

        {/* Pending tasks */}
        {pending.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '11px', fontWeight: '500', letterSpacing: '0.07em', textTransform: 'uppercase', color: '#A09585', marginBottom: '10px' }}>pending</p>
            <div style={{ background: '#FFFCF7', border: '0.5px solid #E5D9F2', borderRadius: '12px', overflow: 'hidden' }}>
              {pending.map((task, i) => (
                <div key={task._id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 16px', borderBottom: i < pending.length - 1 ? '0.5px solid #EDE8E0' : 'none' }}>
                  <div
                    onClick={() => updateTasks(task._id, task.isCompleted)}
                    style={{ width: '17px', height: '17px', borderRadius: '50%', border: '1.5px solid #CCC7BC', background: 'transparent', cursor: 'pointer', flexShrink: 0 }}
                  />
                  <span style={{ flex: 1, fontSize: '14px', color: '#1C1C1A' }}>{task.title}</span>
                  <button
                    onClick={() => deleteTasks(task._id)}
                    style={{ fontSize: '12px', color: '#B8A898', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed tasks */}
        {completed.length > 0 && (
          <div>
            <p style={{ fontSize: '11px', fontWeight: '500', letterSpacing: '0.07em', textTransform: 'uppercase', color: '#A09585', marginBottom: '10px' }}>completed</p>
            <div style={{ background: '#FFFCF7', border: '0.5px solid #DDD8CE', borderRadius: '12px', overflow: 'hidden' }}>
              {completed.map((task, i) => (
                <div key={task._id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '13px 16px', borderBottom: i < completed.length - 1 ? '0.5px solid #EDE8E0' : 'none' }}>
                  <div
                    onClick={() => updateTasks(task._id, task.isCompleted)}
                    style={{ width: '17px', height: '17px', borderRadius: '50%', background: '#2C2416', border: 'none', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8"><polyline points="1,4 3,6 7,2" stroke="#F5F0E8" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
                  </div>
                  <span style={{ flex: 1, fontSize: '14px', color: '#A09585', textDecoration: 'line-through' }}>{task.title}</span>
                  <button
                    onClick={() => deleteTasks(task._id)}
                    style={{ fontSize: '12px', color: '#B8A898', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {tasks.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '14px', color: '#A09585' }}>no tasks yet — add one above</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;