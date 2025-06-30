import React, { useState } from 'react';
import LoginPage from './Pages/LoginPage';
import UserListPage from './Pages/UserListPage';
import TripListPage from './Pages/TripListPage';
import './App.css';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [page, setPage] = useState<'users' | 'trips'>('users');

  if (!token) return <LoginPage onLogin={setToken} />;

  return (
    <div>
      <nav>
        <button onClick={() => setPage('users')}>Utilisateurs</button>
        <button onClick={() => setPage('trips')}>Planifications</button>
        <button onClick={() => setToken(null)}>Déconnexion</button>
      </nav>
      {page === 'users' && <UserListPage token={token} />}
      {page === 'trips' && <TripListPage token={token} />}
    </div>
  );
}
