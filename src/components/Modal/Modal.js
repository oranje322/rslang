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
				<div className={classes.Modal}>
					<span className={classes.closeBtn} onClick={this.props.close}></span>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Modal;
