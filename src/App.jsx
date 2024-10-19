import React, { useState } from 'react';
import {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from './features/usersApi.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [formData, setFormData] = useState({ name: '', email: '', id: null });

  // Handle Form Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update user
      try {
        await updateUser({ id: formData.id, ...formData }).unwrap();
        toast.success('User updated successfully');
      } catch (error) {
        toast.error('Error updating user');
      }
    } else {
      // Add user
      try {
        await addUser(formData).unwrap();
        toast.success('User added successfully');
      } catch (error) {
        toast.error('Error adding user');
      }
    }
    setFormData({ name: '', email: '', id: null });
  };

  // Handle Edit Click
  const handleEditClick = (user) => {
    setFormData({ name: user.name, email: user.email, id: user.id });
  };

  // Handle Delete User
  const handleDeleteClick = async (id) => {
    try {
      await deleteUser(id).unwrap();
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  return (
    <div className="App">
      <h2>CRUD Table with RTK Query and Toastify Notifications</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">{formData.id ? 'Update User' : 'Add User'}</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEditClick(user)}>Edit</button>
                  <button onClick={() => handleDeleteClick(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;