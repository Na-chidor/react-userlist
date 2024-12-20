import React, { useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 22 },
  ]);

  const handleEdit = (id, updatedInfo) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, ...updatedInfo } : user
      )
    );
  };

  const renderEditForm = (user) => {
    const [formData, setFormData] = useState({ name: user.name, age: user.age });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: name === 'age' ? parseInt(value, 10) : value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleEdit(user.id, formData);
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <button type="submit">Save</button>
      </form>
    );
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} (Age: {user.age}) 
            <button onClick={() => handleEdit(user.id)}>Edit</button>
            {renderEditForm(user)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
