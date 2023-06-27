import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../axios/axios";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const { data } = await axios.get('users')
    return data
})

const initialState = {
    data: null,
    status: 'loading'
}

const postsSlice = createSlice({
    name: 'Users',
    initialState,
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.status = "loading";
            state.data = null
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.data = action.payload
        },
        [fetchUsers.rejected]: (state) => {
            state.status = "error";
            state.data = null
        }
    }
})


export const userReducers = postsSlice.reducer