import React, { useEffect, useState } from 'react';
import './styles/app.global.scss'; // global styles
import { Route, Switch } from 'react-router-dom';
import Main from './containers/Main/Main';
import Book from './containers/Book/Book';
import Learn from './containers/Learn/Learn';
import Games from './containers/Games/Games';
import Stats from './containers/Stats/Stats';
import Words from './containers/Words/Words';
import Audiocall from './containers/Audiocall/Audiocall';
import Sprint from './containers/Sprint/Sprint';
import Mygame from './containers/Mygame/Mygame';
import Settings from './containers/Settings/Settings';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import { useLocation } from 'react-router';
import Vocabulary from './containers/Learn/Vocabulary/Vocabulary';
import SavannahMain from './containers/Savannah/SavannahMain/SavannahMain';

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

	return (<>
			<Switch>
				<Route path={'/book/module:module/page:page'}>
					<Words/>
				</Route>
				<Route exact path={'/book'}>
					<Book/>
				</Route>
				<Route exact path={'/learn'}>
					<Learn/>
				</Route>
				<Route path={'/learn/:active/page:page'} component={Vocabulary}/>
				<Route path={'/learn/:hard/page:page'} component={Vocabulary}/>
				<Route path={'/learn/:delete/page:page'} component={Vocabulary}/>
				<Route path='/games/mygame' component={Mygame}/>
				<Route path='/games/savannah' component={Savannah}/>
				<Route path='/games/audiocall' component={Audiocall}/>
				<Route path='/games/sprint' component={Sprint}/>
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
			{/*{window.location.pathname !== '/game' ? <Footer/> : null}*/}
		</>
	);
};

export default App;
