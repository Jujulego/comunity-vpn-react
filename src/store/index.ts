import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { authReducer } from './auth/reducers';
import { usersReducer } from './users/reducers';

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer
});

export type AppState = ReturnType<typeof rootReducer>;

// Store
export const store = createStore(rootReducer,
  composeWithDevTools({})(
    applyMiddleware(thunk)
  )
);

export const persistor = persistStore(store);