import React, { useEffect, useState } from 'react';
import './styles/app.global.scss'; // global styles
import { Route, Switch } from 'react-router-dom';
import Main from './containers/Main/Main';
import Book from './containers/Book/Book';
import Learn from './containers/Learn/Learn';
import Games from './containers/Games/Games';
import Stats from './containers/Stats/Stats';
import Settings from './containers/Settings/Settings';
import Words from './containers/Words/Words';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import { useLocation } from 'react-router';

const App = () => {
	const [menuVisible, setMenuVisible] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/') {
			setMenuVisible(false);
		} else {
			setMenuVisible(true);
		}
	}, [location, menuVisible]);

	return (
		<>
			<Switch>
				<Route path={'/book'}>
					<Book/>
				</Route>
				<Route path={'/learn'}>
					<Learn/>
				</Route>
				<Route path={'/games'}>
					<Games/>
				</Route>
				<Route path={'/stats'}>
					<Stats/>
				</Route>
				<Route path={'/settings'}>
					<Settings/>
				</Route>
				<Route path={'/words'}>
					<Words/>
				</Route>
				<Route exact path="/" component={Main}/>
			</Switch>
			{
				menuVisible && <Menu/>
			}
			{location.pathname !== '/games' ? <Footer/> : null}
		</>
	);
};

export default App;
