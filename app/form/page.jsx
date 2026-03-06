'use client';

import { useState } from 'next';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function FormPage() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(selected);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', e.target.name.value);
    formData.append('bio', e.target.bio.value);
    formData.append('answers', e.target.answers.value);

    try {
      const response = await fetch('/api/guests', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push('/guest');
      } else {
        const err = await response.json();
        alert(`Kļūda: ${err.error}`);
      }
    } catch (error) {
      alert('Neizdevās saglabāt datus!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100dvh' }}>
      <div className="page-header">
        <button className="btn-small" onClick={() => router.push('/')}>Atpakaļ</button>
      </div>

      <div className="scrollable-page">
        <h2 className="form-title">Pievienoties sarakstam</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={`image-upload-container ${preview ? 'has-image' : ''}`}>
            <input 
              type="file" 
              accept="image/*" 
              className="image-upload-input" 
              onChange={handleFileChange} 
              required 
            />
            {!preview ? (
              <div>
                <div className="upload-icon">📷</div>
                <p>Pievienot bildi</p>
              </div>
            ) : (
              <img src={preview} className="image-preview" alt="Preview" />
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="name">Tavs vārds</label>
            <input type="text" id="name" name="name" className="form-control" required placeholder="Ieraksti savu vārdu" />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="bio">Pastāsti par sevi (Kā tu pazīsti jauno pāri? Ar ko tu nodarbojies? Hobiji?)</label>
            <textarea id="bio" name="bio" className="form-control" required placeholder="Nedaudz par sevi..."></textarea>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="answers">Ko Tu visvairāk gaidi no kāzām - ceremoniju, bāru, vakariņas, dejošana, utt.?</label>
            <textarea id="answers" name="answers" className="form-control" required placeholder="Es visvairāk gaidu..."></textarea>
          </div>

          <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
            {loading ? <div className="loader" style={{margin: '0 auto'}}></div> : <span>Saglabāt</span>}
          </button>
        </form>
      </div>
    </div>
  );
}
