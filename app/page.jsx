'use client';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="landing-body">
      <div className="landing-container">
        <header className="landing-header">
          <h1>Jānis & Anete</h1>
        </header>

        <div className="carousel-container">
          <div className="carousel-empty" style={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#888',
            fontStyle: 'italic',
            textAlign: 'center',
            padding: '20px'
          }}>
            Tavs attēls tiks pievienots šeit.
          </div>
        </div>

        <div className="landing-subheading">
          <p>28.08.2026</p>
        </div>

        <div className="landing-actions">
          <button className="btn btn-secondary" onClick={() => router.push('/guest')}>Tikai paskatīšos</button>
          <button className="btn btn-primary" onClick={() => router.push('/form')}>Piedalīšos</button>
        </div>
      </div>
    </main>
  );
}
