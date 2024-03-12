// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.avatar || 'URL_DE_IMAGEN_POR_DEFECTO'} alt={user.name} />
            <p>{user.name}</p>
            {/* Agrega los demás atributos del usuario según la API */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
