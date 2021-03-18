import React from 'react';
import './styles/app.global.scss'; // global styles
import classes from './App.module.scss'; // App styles

const App = () => {
	return (
		<div>
			<p className={classes.text}>Hello</p>
		</div>
	);
};

export default App;
