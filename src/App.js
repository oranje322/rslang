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
import Words from './containers/Words/Words';
import Audiocall from './containers/Audiocall/Audiocall';
import Savannah from './containers/Savannah/Savannah';
import Sprint from './containers/Sprint/Sprint';
import Mygame from './containers/Mygame/Mygame';

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
					<Route path='/games/mygame' component={Mygame} />
					<Route path='/games/savannah' component={Savannah} />
					<Route path='/games/audiocall' component={Audiocall} />
					<Route path='/games/sprint' component={Sprint} />
					<Route path={'/games'}>
						<Games />
					</Route>
					<Route path={'/stats'}>
						<Stats />
					</Route>
					<Route path={'/settings'}>
						<Settings />
					</Route>
					<Route path={'/words'}>
						<Words />
					</Route>					
					<Route path="/" component={Main} />
				</Switch>
				{/* <Menu /> почему не так? */}
			</BrowserRouter>
		</Provider>
	);
};

export default App;
