import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { adminReducer } from 'store/admin/reducers';
import { authReducer } from './auth/reducers';
import { serversReducer } from './servers/reducers';
import { usersReducer } from './users/reducers';

// Root reducer
const rootReducer = combineReducers({
  admin: adminReducer,
  auth: authReducer,
  servers: serversReducer,
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