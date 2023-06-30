import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../axios/axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('posts')
    return data
})


const initialState = {
    data: null,
    status: 'loading'
}


function favoriteSort(arr, key) {
    let fav = []
    let noFav = []
    for (let a = 0; a < arr.length; a++) {
        if (arr[a].favorite) {
            fav.push(arr[a])
        } else {
            noFav.push(arr[a])
        }
    }
    if (!key) {
        return [...fav, ...noFav]
    } else {
        return [fav, noFav]
    }
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
        favoriteFilter(state, params) {
            state.data = favoriteSort(state.data)

        },
        postsFavoriteChecker(state, params) {
            state.data.map(item => {
                if (item.checked) {
                    item.favorite = true
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
        postSingle(state, params) {
            state.data.map(item => {
                if (item.id == params.payload.id) {
                    item.single = params.payload.state
                }
            })
        },
        usernameFilter(state, params) {
            if (params.payload.check) {
                const [fav, nofav] = favoriteSort(state.data, '123')
                if (params.payload.state !== 'up') {
                    state.data = [...fav.sort((a, b) => params.payload.data.find(item => item.id == b.userId).name.localeCompare(params.payload.data.find(item => item.id == a.userId).name)),
                    ...nofav.sort((b, a) => params.payload.data.find(item => item.id == a.userId).name.localeCompare(params.payload.data.find(item => item.id == b.userId).name)).reverse()]
                } else {
                    state.data = [...fav.sort((a, b) => params.payload.data.find(item => item.id == a.userId).name.localeCompare(params.payload.data.find(item => item.id == b.userId).name)),
                    ...nofav.sort((a, b) => params.payload.data.find(item => item.id == a.userId).name.localeCompare(params.payload.data.find(item => item.id == b.userId).name))]
                }
            } else {
                state.data.sort((a, b) => params.payload.data.find(item => item.id == a.userId).name.localeCompare(params.payload.data.find(item => item.id == b.userId).name))
                if (params.payload.state === 'up') {
                    state.data.reverse()
                }
            }
        },
        updatePost(state, params) {
            state.data.map(item => {
                if (item.id == params.payload.id) {
                    item.title = params.payload.data.title
                    item.body = params.payload.data.body
                }
            })
        },
        deletePost(state, params) {
            state.data.splice(state.data.findIndex(elem => elem.id == params.payload), 1)
        },
        postsDeleteChecked(state) {
            state.data = state.data.filter(item => !item.checked)
        },
        titleFilter(state, params) {
            if (params.payload.check) {
                const [fav, nofav] = favoriteSort(state.data, '123')
                if (params.payload.state !== 'up') {
                    state.data = [...fav.sort((b, a) => a.title.localeCompare(b.title)),
                    ...nofav.sort((b, a) => a.title.localeCompare(b.title))]
                } else {
                    state.data = [...fav.sort((a, b) => a.title.localeCompare(b.title)),
                    ...nofav.sort((a, b) => a.title.localeCompare(b.title))]
                }
            } else {
                state.data.sort((a, b) => a.title.localeCompare(b.title))
                if (params.payload.state === 'up') {
                    state.data.reverse()
                }
            }
        },
        idFilter(state, params) {
            if (params.payload.check) {
                const [fav, nofav] = favoriteSort(state.data, '123')
                if (params.payload.state !== 'up') {
                    state.data = [...fav.sort((b, a) => a.title.localeCompare(b.title)),
                    ...nofav.sort((b, a) => a.title.localeCompare(b.title))]
                } else {
                    state.data = [...fav.sort((a, b) => a.title.localeCompare(b.title)),
                    ...nofav.sort((a, b) => a.title.localeCompare(b.title))]
                }
            } else {
                state.data.sort((a, b) => a.id - b.id)
                if (params.payload.state === 'up') {
                    state.data.reverse()
                }
            }

        },
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