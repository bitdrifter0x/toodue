import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/dashboard');
        window.location.reload();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden" style={{ background: '#F5EFFF' }}>
      
      {/* Left side - Login Form (30%) */}
      <div className="w-[30%] flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <span style={{ fontSize: '24px', fontWeight: '500', letterSpacing: '-0.02em' }}>
              Too<span style={{ color: '#A294F9' }}>Due</span>
            </span>
          </div>

          <h1 className="text-2xl font-semibold mb-2" style={{ color: '#2B3A3A' }}>Welcome back</h1>
          <p className="text-sm mb-6" style={{ color: '#8A9A8E' }}>Log in to manage your tasks</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" style={{ color: '#2B3A3A' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1"
                style={{ borderColor: '#D6CFC5', background: '#FFFFFF' }}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1" style={{ color: '#2B3A3A' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1"
                style={{ borderColor: '#D6CFC5', background: '#FFFFFF' }}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg font-medium transition"
              style={{ background: '#A294F9', color: '#FFFFFF' }}
            >
              Log in
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: '#8A9A8E' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#A294F9' }}>Sign up</Link>
          </p>
        </div>
      </div>

      {/* Right side - Dashboard Preview (70%) */}
      <div className="w-[70%] flex items-center justify-end p-8 relative overflow-hidden" style={{ background: '#E5D9F2' }}>
        {/* Gradient fade overlay on the right edge */}
        <div 
          className="absolute top-0 right-0 w-1/2 h-full pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, transparent, #E5D9F2 60%, #E5D9F2)'
          }}
        />
        
        {/* Massive card - shifted right, only left portion visible */}
        <div className="w-[140%] max-w-none rounded-2xl p-8" style={{ background: '#FFFFFF', border: '1px solid #E3DDD4', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', transform: 'translateX(20%)' }}>
          
          {/* Mock Task List */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span style={{ fontSize: '20px', fontWeight: '500', color: '#2B3A3A' }}>Today's tasks</span>
              <span style={{ fontSize: '14px', color: '#A0B0A4' }}>4 of 8 done</span>
            </div>
            
            {[
              { text: 'Review project proposal', done: true },
              { text: 'Morning run', done: true },
              { text: 'Prepare meeting notes', done: true },
              { text: 'Call the dentist', done: true },
              { text: 'Write documentation', done: false },
              { text: 'Deploy to production', done: false },
              { text: 'Team sync meeting', done: false },
              { text: 'Update README', done: false },
            ].map((task, i) => (
              <div key={i} className="flex items-center gap-4 py-3">
                <div style={{ width: '24px', height: '24px', background: task.done ? '#4A7B6D' : 'transparent', border: task.done ? 'none' : '2px solid #D0C4B0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {task.done && <svg width="14" height="14" viewBox="0 0 8 8"><polyline points="1,4 3,6 7,2" stroke="#FFFFFF" strokeWidth="1.5" fill="none" /></svg>}
                </div>
                <span style={{ fontSize: '16px', color: task.done ? '#B0C0B4' : '#2B3A3A', textDecoration: task.done ? 'line-through' : 'none' }}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>

          {/* Mock Add Task Button */}
          <div className="pt-5" style={{ borderTop: '1px solid #F0EBE5' }}>
            <button style={{ fontSize: '15px', color: '#A294F9', fontWeight: '500' }}>+ Add new task</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;