import React from 'react';
import classes from './Hearts.module.scss';

const Hearts = props => {
	const fullHeart = '❤';

	return (
		<div className={classes.hearts}>
			{new Array(props.hearts).fill(fullHeart).map((heart) => {
				return (
					<span key={Math.random()}>
						{heart}
					</span>
				);
			})}
		</div>
	);
};

export default Hearts;
