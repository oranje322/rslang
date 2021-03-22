import React, { isValidElement, useState } from 'react';
import classes from './Main.module.scss';
import emoji from '../../assets/img/emoji.png';
import levelImg from '../../assets/img/levelImg.png';
import {  Button, Container, Box, Typography, 
	Card, CardActions, CardContent, CardMedia, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../../components/Header';
import CardGame from '../../components/Modal/MainCard/cardGame';
import CardOne from '../../components/Modal/MainCard/cardOne';
import CardStatistic from '../../components/Modal/MainCard/cardStatistic';

const useStyles = makeStyles({
	root: {
	  maxWidth: 300,
	  margin: 10
	}
  });

const Main = () => {
	const classes = useStyles();
	
	return (
		<>
		<Header />
		<Container maxWidth='lg'>
			<Box pt={15} display="flex" justifyContent="center">
				<img src={emoji} alt='Emoji' />
			</Box>
			<Box pt={5} display="flex" justifyContent="center">
				<h1>Узнавайте и тренируйте новые слова с RSlang</h1>
			</Box>
		</Container>
		<Container maxWidth='lg'>
			<Grid container spacinng={4} justify="center"> 
				<CardOne />
				<CardGame />
				<CardStatistic />			
			</Grid>			
		</Container>
		</>
	);
};

export default Main;
