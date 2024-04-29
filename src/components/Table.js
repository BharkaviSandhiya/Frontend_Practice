import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUser } from '../../src/redux/userSlice';
import './Table.css';

const Table = () => {
    const [editUser, setEditUser] = useState(null);
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.list);
    const loading = useSelector(state => state.users.loading);
    const error = useSelector(state => state.users.error);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleEdit = (user) => {
        const editedUser = { ...user };
        setEditUser(editedUser);
    };

    const handleUpdate = () => {
        if (!editUser) return;
        dispatch(updateUser({ userId: editUser.id, userData: editUser }));
        setEditUser(null);
    };
    

    const handleDelete = (userId) => {
        dispatch(deleteUser(userId));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="user_list">
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
                                <td>
                                    {editUser && editUser.id === user.id ? (
                                        <input
                                            type="text"
                                            value={editUser.firstName}
                                            onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}
                                        />
                                    ) : (
                                        user.firstName
                                    )}
                                </td>
                                <td>
                                    {editUser && editUser.id === user.id ? (
                                        <input
                                            type="text"
                                            value={editUser.lastName}
                                            onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
                                        />
                                    ) : (
                                        user.lastName
                                    )}
                                </td>
                                <td>
                                    {editUser && editUser.id === user.id ? (
                                        <input
                                            type="text"
                                            value={editUser.email}
                                            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                        />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td>
                                    {editUser && editUser.id === user.id ? (
                                        <>
                                            <button className="btn" onClick={() => handleUpdate()}>Update</button>
                                            <button className="btn" onClick={() => setEditUser(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <button className="btn" onClick={() => handleEdit(user)}>Edit</button>
                                    )}
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