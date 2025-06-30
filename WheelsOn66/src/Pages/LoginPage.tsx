import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage({ onLogin }: { onLogin: (token: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data.user.isAdmin) {
        onLogin(res.data.token);
      } else {
        setError('Accès réservé aux administrateurs');
      }
    } catch {
      setError('Identifiants invalides');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: '100px auto' }}>
      <h2>Connexion Admin</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Connexion</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}