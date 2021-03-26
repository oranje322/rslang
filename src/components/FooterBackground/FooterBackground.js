import React from 'react';
import style from './FooterBackground.module.scss';
import Decor from '@assets/img/decor.png';

const FooterBackground = () => {
	return (
		<div className={style.footerBackground}>
			<img src={Decor} alt='decor' />
		</div>
	);
};

export default FooterBackground;