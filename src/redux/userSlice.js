import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    return data.users;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId, { dispatch }) => {
    await fetch(`https://dummyjson.com/users/${userId}`, {
        method: 'DELETE',
    });
    return userId;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ userId, userData }, { dispatch }) => {
    await fetch(`https://dummyjson.com/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
});

const userSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        loading: false,
        error: null,
        message: null,
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        clearMessage: (state) => {
            state.message = null;
        },
    },
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
            });
    },
});

export const { setMessage, clearMessage } = userSlice.actions;

export const selectUsers = (state) => state.users.list;
export const selectLoading = (state) => state.users.loading;
export const selectError = (state) => state.users.error;
export const selectMessage = (state) => state.users.message;

export default userSlice.reducer;
