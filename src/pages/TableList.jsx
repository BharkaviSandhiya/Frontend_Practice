import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TableList = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/users/${userId}`);
                const data = await response.json();
                setUser(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, [userId]);

    return (
        <div className="detail">
            <div>
                <h2>User Detail</h2>
                <table className="table">
                    <tbody>
                        <tr>
                            <td><strong>First Name:</strong></td>
                            <td>{user?.firstName}</td>
                        </tr>
                        <tr>
                            <td><strong>Last Name:</strong></td>
                            <td>{user?.lastName}</td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>{user?.email}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableList;
