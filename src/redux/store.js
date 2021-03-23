import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const reducers = combineReducers({
	auth: authReducer
});

const configureStore = () => (
	createStore(
		reducers,
		composeEnhancers(
			applyMiddleware(thunk)
		)
	)
);

const store = configureStore();

export default store;