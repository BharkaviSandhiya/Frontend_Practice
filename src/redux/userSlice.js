import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await fetch('https://dummyjson.com/users');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return data.users;
    } catch (error) {
        console.error('Error fetching users:', error.message);
        throw error;
    }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId, { dispatch }) => {
    try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
        return userId;
    } catch (error) {
        console.error('Error deleting user:', error.message);
        throw error;
    }
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ userId, userData }, { dispatch }) => {
    try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        return userData;
    } catch (error) {
        console.error('Error updating user:', error.message);
        throw error;
    }
});

const userSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        loading: false,
        error: null,
        message: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.list = state.list.filter(user => user.id !== action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.list.findIndex(user => user.id === action.payload.id);
                state.list[index] = action.payload;
            });
    },
});

export const selectUsers = (state) => state.users.list;
export const selectLoading = (state) => state.users.loading;
export const selectError = (state) => state.users.error;

export default userSlice.reducer;
