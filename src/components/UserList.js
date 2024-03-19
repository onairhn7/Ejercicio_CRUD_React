// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    // Agrega los demás campos del usuario según la API
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await axios.post('https://api.escuelajs.co/api/v1/users', newUser);
      fetchUsers();
      setNewUser({
        name: '',
        email: '',
        phone: '',
        // Reinicia los demás campos del nuevo usuario
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleEditUser = async (id, updatedUser) => {
    try {
      await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, updatedUser);
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://api.escuelajs.co/api/v1/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.avatar} alt={user.name} />
            <p>{user.name}</p>
            {/* Agrega los demás atributos del usuario según la API */}
            <button onClick={() => setEditingUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Create User</h2>
      <input
        type="text"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        placeholder="Name"
      />
      {/* Agrega los demás campos del usuario según la API */}
      <button onClick={handleCreateUser}>Create</button>
      {editingUser && (
        <>
          <h2>Edit User</h2>
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
          />
          {/* Agrega los demás campos del usuario según la API */}
          <button onClick={() => handleEditUser(editingUser.id, editingUser)}>Save</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default UserList;

