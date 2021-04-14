import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { settingsReducer } from './reducers/settingsReducer';
import { wordsReducer } from './reducers/wordsReducer';
import { sprintReducer } from './reducers/sprintReducer';
import { gamesReducer } from './reducers/gamesReducer';
import { statsReducer } from './reducers/statsReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const reducers = combineReducers({
	auth: authReducer,
	settings: settingsReducer,
	words: wordsReducer,
	sprint: sprintReducer,
	games: gamesReducer,
	stats: statsReducer
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