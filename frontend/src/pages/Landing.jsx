import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden" style={{ background: '#F5EFFF', color: '#2B3A3A', fontFamily: 'sans-serif' }}>

      {/* nav */}
      <nav className="flex items-center justify-between px-12 py-7" style={{ borderBottom: '1px solid #E3DDD4', background: '#F5EFFF' }}>
        <span style={{ fontSize: '22px', fontWeight: '500', letterSpacing: '-0.02em' }}>
          Too<span style={{ color: '#A294F9' }}>Due</span>
        </span>
        <div className="flex items-center gap-5">
          <Link to="/login" style={{ fontSize: '16px', color: '#8A9A8E', padding: '8px 16px', border: '1px solid #C9C0B5', borderRadius: '8px', textDecoration: 'none' }}>
            login
          </Link>
          <Link to="/register" style={{ fontSize: '16px', fontWeight: '500', background: '#A294F9', color: '#F7F3EE', padding: '10px 24px', borderRadius: '10px', textDecoration: 'none', }}>
            get started
          </Link>
        </div>
      </nav>

      {/* hero */}
      <section className="flex flex-col items-center text-center px-6 pt-32 pb-20">
        <span style={{ fontSize: '13px', fontWeight: '500', letterSpacing: '0.1em', textTransform: 'uppercase', background: '#EEEEEE', color: '#A294F9', border: '1px solid #D6CFC5', padding: '6px 18px', borderRadius: '99px', marginBottom: '2rem', display: 'inline-block' }}>
          simple by design
        </span>

        <h1 style={{ fontSize: '74px', fontWeight: '500', lineHeight: '1.1', letterSpacing: '-0.03em', maxWidth: '700px', marginBottom: '1.5rem' }}>
          your tasks,{' '}
          <span style={{ color: '#A294F9' }}>finally</span>{' '}
          under control
        </h1>

        <p style={{ fontSize: '22px', color: '#8A9A8E', maxWidth: '500px', lineHeight: '1.7', marginBottom: '2.5rem' }}>
          A minimal task manager for people who want to get things done — not manage their task manager.
        </p>

        <div className="flex items-center gap-5">
          <Link to="/register">
            <button style={{ fontSize: '17px', fontWeight: '500', background: '#A294F9', color: '#F7F3EE', padding: '14px 34px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
              start for free
            </button>
          </Link>
          <Link to="/login">
            <button style={{ fontSize: '17px', color: '#8A9A8E', background: 'transparent', border: '1px solid #C9C0B5', padding: '14px 30px', borderRadius: '12px', cursor: 'pointer' }}>
              log in
            </button>
          </Link>
        </div>

        {/* task preview card */}
        <div className="mt-20 w-full rounded-2xl p-8" style={{ maxWidth: '520px', background: '#FFFFFF', border: '1px solid #E3DDD4', boxShadow: '0 8px 20px rgba(0,0,0,0.03)' }}>
          <div className="flex items-center justify-between mb-6">
            <span style={{ fontSize: '18px', fontWeight: '500' }}>today</span>
            <span style={{ fontSize: '15px', color: '#A0B0A4' }}>2 of 5 done</span>
          </div>
          {[
            { text: 'review project proposal', done: true, tag: 'work' },
            { text: 'morning run', done: true, tag: 'personal' },
            { text: 'prepare meeting notes', done: false, tag: 'work' },
            { text: 'call the dentist', done: false, tag: 'personal' },
            { text: 'finish api docs', done: false, tag: 'work' },
          ].map((task, i, arr) => (
            <div key={i} className="flex items-center gap-4" style={{ padding: '14px 0', borderBottom: i < arr.length - 1 ? '1px solid #F0EBE5' : 'none' }}>
              <div className="rounded-full flex items-center justify-center" style={{ width: 22, height: 22, background: task.done ? '#4A7B6D' : 'transparent', border: task.done ? 'none' : '2px solid #C9C0B5' }}>
                {task.done && <svg width="12" height="12" viewBox="0 0 8 8"><polyline points="1,4 3,6 7,2" stroke="#FFFFFF" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>}
              </div>
              <span className="flex-1 text-left" style={{ fontSize: '16px', color: task.done ? '#B0C0B4' : '#2B3A3A', textDecoration: task.done ? 'line-through' : 'none' }}>
                {task.text}
              </span>
              <span style={{
                fontSize: '13px', padding: '4px 14px', borderRadius: '99px',
                background: task.tag === 'work' ? '#F0EBE5' : task.tag === 'personal' ? '#E0F0EA' : '#FFF0E0',
                color: task.tag === 'work' ? '#E06D4F' : task.tag === 'personal' ? '#4A7B6D' : '#D68B3A'
              }}>
                {task.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* divider */}
      <div style={{ width: '2px', height: '70px', background: '#E3DDD4', margin: '0 auto' }} />

      {/* features */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '4rem 1.5rem 6rem' }}>
        <p style={{ textAlign: 'center', fontSize: '14px', fontWeight: '500', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A0B0A4', marginBottom: '3rem' }}>
          why toodue
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', background: '#E3DDD4', border: '1px solid #E3DDD4', borderRadius: '20px', overflow: 'hidden' }}>
          {[
            { title: 'private by default', desc: 'Secure auth keeps every task locked to your account only.', icon: '⬡' },
            { title: 'track completion', desc: 'Check things off and watch your momentum grow daily.', icon: '◎' },
            { title: 'zero clutter', desc: 'No boards, no tags, no friction. Just your list.', icon: '▭' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#FFFFFF', padding: '2.2rem' }}>
              <div style={{ width: '52px', height: '52px', background: '#FEEEEEE', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', fontSize: '24px', color: '#A294F9' }}>
                {f.icon}
              </div>
              <p style={{ fontSize: '18px', fontWeight: '500', color: '#2B3A3A', marginBottom: '10px' }}>{f.title}</p>
              <p style={{ fontSize: '15px', color: '#8A9A8E', lineHeight: '1.65' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* footer */}
      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid #E3DDD4' }}>
        <p style={{ fontSize: '14px', color: '#A0B0A4' }}>built with focus. © TooDue 2025.</p>
      </footer>

    </div>
  )
}

export default Landing