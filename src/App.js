import React from 'react';
import './styles/app.global.scss'; // global styles
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './containers/Main/Main';
import { Provider } from 'react-redux';
import store from './redux/store';
import Book from './containers/Book/Book';
import Learn from './containers/Learn/Learn';
import Games from './containers/Games/Games';
import Stats from './containers/Stats/Stats';
import Settings from './containers/Settings/Settings';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path={'/book'}>
						<Book />
					</Route>
					<Route path={'/learn'}>
						<Learn />
					</Route>
					<Route path={'/games'}>
						<Games />
					</Route>
					<Route path={'/stats'}>
						<Stats />
					</Route>
					<Route path={'/settings'}>
						<Settings />
					</Route>
					<Route exact path="/" component={Main} />
				</Switch>
				<Menu />
				{window.location.pathname !== '/game' ? <Footer /> : null}
			</BrowserRouter>
		</Provider>
	);
};

export default App;
