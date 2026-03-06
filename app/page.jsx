'use client';

import { useRouter } from 'next/navigation';

const CAROUSEL_IMAGES = [
  '/images/1-WhatsApp-Image-2026-03-06-at-18.12.49-resized-1772813841948.jpeg',
  '/images/2-WhatsApp-Image-2026-03-06-at-18.12.50-1-resized-1772813841950.jpeg',
  '/images/3-WhatsApp-Image-2026-03-06-at-18.12.50-2-resized-1772813841955.jpeg',
  '/images/4-WhatsApp-Image-2026-03-06-at-18.12.50-3-resized-1772813844180.jpeg',
  '/images/5-WhatsApp-Image-2026-03-06-at-18.12.50-4-resized-1772813841944.jpeg',
  '/images/6-WhatsApp-Image-2026-03-06-at-18.12.50-5-resized-1772813841950.jpeg',
  '/images/7-WhatsApp-Image-2026-03-06-at-18.12.50-6-resized-1772813841950.jpeg',
  '/images/8-WhatsApp-Image-2026-03-06-at-18.12.50-7-resized-1772813842672.jpeg',
  '/images/9-WhatsApp-Image-2026-03-06-at-18.12.50-resized-1772813841951.jpeg',
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="landing-body">
      <div className="landing-container">
        <header className="landing-header">
          <h1>Jānis & Anete</h1>
        </header>

        <div className="carousel-container">
          <div className="carousel-track">
            {CAROUSEL_IMAGES.map((src, i) => (
              <div
                key={i}
                className="carousel-item"
                style={{ backgroundImage: `url('${src}')` }}
              />
            ))}
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
