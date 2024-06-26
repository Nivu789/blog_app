import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import { persistStore, persistReducer ,FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import followSlice from './followerSlice'

const persistConfig = {
    key: 'root',
    storage,
  }

  const rootReducer = combineReducers({
    auth:authSlice,
    follow:followSlice
  })

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

export default store