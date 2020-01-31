import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { adminReducer } from './admin/reducers';
import { authReducer } from './auth/reducers';
import { errorsReducer } from './errors/reducers';
import { serversReducer } from './servers/reducers';
import { usersReducer } from './users/reducers';

import { GLOBAL_RESET } from './constants';

// Root reducer
const rootReducer = combineReducers({
  admin: adminReducer,
  auth: authReducer,
  errors: errorsReducer,
  servers: serversReducer,
  users: usersReducer
});

export type AppState = ReturnType<typeof rootReducer>;

// App reducer
const appReducer: Reducer<AppState> = (state, action) => {
  if (action.type === GLOBAL_RESET) {
    state = undefined;
  }

  return rootReducer(state, action);
};

// Store
export const store = createStore(appReducer,
  composeWithDevTools({})(
    applyMiddleware(thunk)
  )
);

export const persistor = persistStore(store);