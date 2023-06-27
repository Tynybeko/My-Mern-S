import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../axios/axios";
import lodash from 'lodash'


const _ = lodash
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('posts')
    return data
})
const initialState = {
    data: null,
    status: 'loading'
}

const postsSlice = createSlice({
    name: 'Posts',
    initialState,
    reducers: {
        postChecked(state, params) {
            state.data.map(item => {
                if (params.payload.id == item.id) {
                    item.checked = params.payload.status
                }
            })
        },
        postFavorite(state, params) {
            state.data.map(item => {
                if (params.payload.id == item.id) {
                    item.favorite = params.payload.status
                }
            })
        },
        deleteChecked (state) {
            state.data = state.data.filter(item => !item.checked)
        },
        nameFilter(state, params) {
            state.data.sort((a, b) => a.title.localeCompare(b.title))
            if (params.payload) {
                state.data.reverse()
            }
        },
        idFilter(state, params) {
            state.data.sort((a, b) => a.id - b.id)
            if (params.payload) {
                state.data.reverse()
            }
        },
        filter(state, params) {
            state.data = lodash.orderBy(state.data, )
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.status = "loading";
            state.data = null
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.data = action.payload
        },
        [fetchPosts.rejected]: (state) => {
            state.status = "error";
            state.data = null
        }
    }
})


export const postReducers = postsSlice.reducer
export const postMethods = postsSlice.actions