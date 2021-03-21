import React, { Component } from 'react';
import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.isModalShown !== this.props.isModalShown || nextProps.children !== this.props.children;
	}

	render() {
		return (
			<div className={classes.wrapper}>
				<Backdrop isModalShown={this.props.isModalShown} clicked={this.props.close} />
				<div
					className={classes.Modal}
					style={{
						opacity: this.props.isModalShown ? '1' : '0',
						transform: this.props.isModalShown ? 'translateY(0)' : 'translateY(-100vh)',
					}}>
					<span className={classes.closeBtn} onClick={this.props.close}></span>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Modal;
