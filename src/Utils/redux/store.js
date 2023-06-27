import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { postReducers } from "./slices/posts";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userReducers } from "./slices/users";

const rootReducer = combineReducers({
    posts: postReducers,
    users: userReducers
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)
export default store