import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUser, selectUsers, selectLoading, selectError  } from '../../redux/userSlice';
import './Table.css';
import EditModal from '../EditModal/EditModal';

const Table = () => {
    const [editUser, setEditUser] = useState(null);
    const dispatch = useDispatch();
    const users = useSelector(selectUsers); 
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const handleEdit = (user) => {
        setEditUser(user);
    };

    const handleUpdate = (updatedUser) => {
        dispatch(updateUser({ userId: updatedUser.id, userData: updatedUser }));
        setEditUser(null);
    };

    const handleDelete = (userId) => {
        dispatch(deleteUser(userId));
    };

    const handleCancel = () => {
        setEditUser(null);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="user_list">
            {editUser && (
                <EditModal user={editUser} onUpdate={handleUpdate} onCancel={handleCancel} />
            )}
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className="btn" onClick={() => handleEdit(user)}>Edit</button>
                                    <button className="btn" onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
