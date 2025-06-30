import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Trip = {
  _id: string;
  user: { name: string; email: string };
  destination: string;
  createdAt: string;
};

export default function TripListPage({ token }: { token: string }) {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    axios.get('/api/admin/trips', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setTrips(res.data));
  }, [token]);

  return (
    <div>
      <h2>Planifications</h2>
      <table>
        <thead>
          <tr>
            <th>Utilisateur</th><th>Email</th><th>Destination</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {trips.map(t => (
            <tr key={t._id}>
              <td>{t.user?.name}</td>
              <td>{t.user?.email}</td>
              <td>{t.destination}</td>
              <td>{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}