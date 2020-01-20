import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { authReducer } from './auth/reducers';

// Root reducer
const rootReducer = combineReducers({
  auth: authReducer
});

export type AppState = ReturnType<typeof rootReducer>;

// Store
const store = createStore(rootReducer, composeWithDevTools({})(
  applyMiddleware(thunk)
));

export default store;