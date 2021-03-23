import React, { isValidElement, useState } from 'react';
import classes from './Main.module.scss';
import emoji from '../../assets/img/emoji.png';
import { Container, Box, Grid } from '@material-ui/core';
import Header from '../../components/Header';
import CardGame from '../../components/MainCard/cardGame';
import CardOne from '../../components/MainCard/cardOne';
import CardStatistic from '../../components/MainCard/cardStatistic';
import Footer from '../../components/Footer';


const Main = () => {	
	return (
		<>
		<Header />
		<Container maxWidth='lg'>
			<Box  pt={5} display="flex" justifyContent="center">
				<img src={emoji} alt='Emoji' />
			</Box>
			<Box pt={3} display="flex" justifyContent="center">
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
		<Footer />
		</>
	);
};

export default Main;
