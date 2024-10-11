import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import userSlice from './user/userSlice';
import cartSlice from './cart/cart'

const rootReducer = combineReducers({
    user: userSlice,
    cart: cartSlice,
})

const persistConfig = {
    key:'root',
    storage,
    whitelist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    })
});

export const persistor = persistStore(store)

