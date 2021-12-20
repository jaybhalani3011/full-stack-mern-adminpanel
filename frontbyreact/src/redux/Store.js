import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { rootReducer } from './RootReducer';
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
const loggerMiddleware = createLogger();
// const persistConfig = {
//     key: 'root',
//     storage,
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
    // persistedReducer,
    rootReducer,
    compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
// let persistor = persistStore(store)
// export { store, persistor };
export default store;