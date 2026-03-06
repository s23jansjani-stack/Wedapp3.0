'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function GuestPage() {
  const router = useRouter();
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGuests() {
      try {
        const res = await fetch('/api/guests');
        const data = await res.json();
        setGuests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchGuests();
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--card-bg)', height: '100dvh', position: 'relative' }}>
      <div className="page-header">
        <button className="btn-small" onClick={() => router.push('/')}>Atpakaļ</button>
      </div>

      <div className="guest-container">
        {loading ? (
          <div className="empty-state">
            <p>Ielādē viesus...</p>
          </div>
        ) : guests?.length === 0 ? (
          <div className="empty-state">
            <h3>Saraksts ir tukšs</h3>
            <p>Esi pirmais, kurš pievienojas!</p>
          </div>
        ) : (
          <div className="guest-track">
            {guests.map((guest) => (
              <div key={guest.id} className="guest-card">
                <div className="guest-image-container">
                  <img
                    src={guest.image_url} 
                    alt={guest.name} 
                    className="guest-image"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Nav+Bilde'; }}
                  />
                </div>
                <div className="guest-info">
                  <h2 className="guest-name">{guest.name}</h2>
                  <div className="guest-q">Par mani</div>
                  <p className="guest-a">{guest.bio.split('\n').map((l, i) => <span key={i}>{l}<br/></span>)}</p>
                  <div className="guest-q">Visvairāk gaidu</div>
                  <p className="guest-a">{guest.answers.split('\n').map((l, i) => <span key={i}>{l}<br/></span>)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
