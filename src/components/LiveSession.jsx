import { Link } from 'react-router-dom';
import LiveAvatar from './LiveAvatar';
import './LiveSession.css';

export default function LiveSession() {
  return (
    <section className="live section" id="demo" aria-labelledby="live-title">
      <div className="container">
        <div className="section-header">
           <span className="badge">True Realtime Voice</span>
           <h2 id="live-title" className="section-title">
             The Virtual Human <span className="gradient-text">Platform</span>
           </h2>
           <p className="section-subtitle">
             We rebuilt the entire experience. It's no longer just a landing page. Launch the full-screen immersive WebRTC Voice App.
           </p>
        </div>

        <div className="live__board glass-card" style={{ padding: '60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', overflow: 'hidden' }}>
            
            {/* Visual Preview of the 3D Avatar */}
            <div style={{ width: '100%', maxWidth: '400px', height: '300px', margin: '0 auto', pointerEvents: 'none', position: 'relative' }}>
                <LiveAvatar aiVolume={0} status="ai-thinking" />
            </div>
            
            <Link to="/app" className="btn btn-primary" style={{ padding: '20px 48px', fontSize: '1.25rem', borderRadius: '40px', display: 'inline-flex', alignItems: 'center', gap: '12px', zIndex: 10 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                Launch Live App ➚
            </Link>
        </div>
      </div>
    </section>
  )
}
