import React from 'react';
import './styles/app.global.scss'; // global styles
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './containers/Main/Main';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={Main} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
