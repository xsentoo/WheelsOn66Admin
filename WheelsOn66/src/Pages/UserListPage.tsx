import React, { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
  _id: string;
  name: string;
  email: string;
  isBlocked?: boolean;
  isAdmin?: boolean;
};

export default function UserListPage({ token }: { token: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsers(res.data));
  }, [token, refresh]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Supprimer cet utilisateur ?')) {
      await axios.delete(`/api/admin/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setRefresh(r => !r);
    }
  };

  const handleBlock = async (id: string, block: boolean) => {
    await axios.put(`/api/admin/users/${id}/block`, { block }, { headers: { Authorization: `Bearer ${token}` } });
    setRefresh(r => !r);
  };

  return (
    <div>
      <h2>Utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th><th>Email</th><th>Admin</th><th>Bloqué</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.isAdmin ? 'Oui' : 'Non'}</td>
              <td>{u.isBlocked ? 'Oui' : 'Non'}</td>
              <td>
                <button onClick={() => handleBlock(u._id, !u.isBlocked)}>
                  {u.isBlocked ? 'Débloquer' : 'Bloquer'}
                </button>
                <button onClick={() => handleDelete(u._id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}