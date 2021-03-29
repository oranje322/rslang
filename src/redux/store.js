import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { settingsReducer } from './reducers/settingsReducer';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const reducers = combineReducers({
	auth: authReducer,
	settings: settingsReducer
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