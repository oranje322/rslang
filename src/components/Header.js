import React, { useState } from 'react';
import Auth from '../containers/Auth/Auth';
import Modal from './Modal/Modal';
import logo from '../assets/img/logo.png';
import { AppBar, Button, Container, Toolbar, Box, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Header = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
	const [isMenuOpen, setisMenuOpen] = useState(false);
	const [isLogoOpen, setisLogoOpen] = useState(true);

	const onCloseAuthHandler = () => {
		setIsAuthOpen(false);
	};

	const onOpenAuthHandler = () => {
		setIsAuthOpen(true);
	};

    return (
        <AppBar color='inherit' position='fixed'>
        <Container maxWidth='lg'>
            <Toolbar>
            <Box flexGrow={1} ml={1}>
                {isLogoOpen && <img src={logo} alt='logo' />}
                {isMenuOpen && (<IconButton><MenuIcon /></IconButton>)}
            </Box>				
            <Box mr={1}>
                <Button variant="contained" color="inherit" onClick={onOpenAuthHandler}>Войти</Button>
            </Box>
            </Toolbar>
            <Modal isModalShown={isAuthOpen} close={onCloseAuthHandler}>
                <Auth />
            </Modal>				
        </Container>
    </AppBar>
    )
};

export default Header;