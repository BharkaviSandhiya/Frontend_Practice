import React, { useState } from 'react';
import './EditModal.css'

const EditModal = ({ user, onUpdate, onCancel }) => {
    const [editedUser, setEditedUser] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleUpdate = () => {
        onUpdate(editedUser);
    };

    return (
        <div className="edit-modal">
            <div className="edit-card">
                <h2>Edit User</h2>
                <label>
                    First Name:
                    <input type="text" name="firstName" value={editedUser.firstName} onChange={handleChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={editedUser.lastName} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={editedUser.email} onChange={handleChange} />
                </label>
                <div className="button-container">
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
