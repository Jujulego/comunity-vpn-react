import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Root reducer
const rootReducer = combineReducers({});

export type AppState = ReturnType<typeof rootReducer>;

// Store
const store = createStore(rootReducer, composeWithDevTools({})(
  applyMiddleware(thunk)
));

export default store;