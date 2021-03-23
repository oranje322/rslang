import React from 'react';
import './styles/app.global.scss'; // global styles
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './containers/Main/Main';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path="/" component={Main}/>
				</Switch>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
