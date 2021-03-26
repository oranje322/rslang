import React from 'react';
import style from './FooterBackground.module.scss';
import Amigos from '@assets/img/Amigos.png';
import Tree from '@assets/img/Tree.png';
import Vector from '@assets/img/Vector.png';

const FooterBackground = () => {
	return (		
			<div className={style.footerBackground}>
					<img className={style.amigos}src={Amigos} alt='amigos' />
					<img className={style.tree}src={Tree} alt='tree' />
					<img className={style.vector} src={Vector} alt='Vector' />
			</div>		
	);
};

export default FooterBackground;