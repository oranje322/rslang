import React, { useState } from 'react';
import { Container, Typography, Box, Link, Grid, CardMedia, Card } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 70,
    },
}));

const Footer = () => {
    const [isFooterVisible, setIsFooterVisible] = useState(true);
    const classes = useStyles();

    return (
        <footer >
            <Container maxWidth="lg">
                <Grid container
                    direction="row"
                    justify="space-between"
                    alignItems="center">
                    <Box display="flex" justifyContent="flex-start">
                            <Link color="inherit" href="https://github.com/oranje322"><GitHubIcon /></Link>
                            <Link color="inherit" href="https://github.com/kristinand"><GitHubIcon /></Link>
                            <Link color="inherit" href="https://github.com/ya-stefaniya"><GitHubIcon /></Link>
                            <Link color="inherit" href="https://github.com/zaruba2004"><GitHubIcon /></Link>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">                        
                        <Link color="inherit" href="https://rs.school/js/">
                            <Card className={classes.root}>
                                <CardMedia component="img" 
                                image='https://rs.school/images/rs_school_js.svg'
                                title="RSschol"/>
                            </Card>
                        </Link>
                        <Typography variant="body1">2012</Typography>
                    </Box>
                </Grid>
            </Container>
        </footer>


        // <footer className={"footer"}>
		// 	<div className={"footer-content"}>
		// 		<div className="git-block">
		// 			<a href="https://github.com/oranje322" target="_blank" rel="noreferrer"> &#9996; @oranje322</a>
		// 			<a href="https://github.com/kristinand" target="_blank" rel="noreferrer">&#129310; @kristinand</a>
		// 			<a href="https://github.com/ya-stefaniya" target="_blank" rel="noreferrer"> &#128588; @ya-stefaniya</a>
		// 			<a href="https://github.com/Jears017" target="_blank" rel="noreferrer">&#129311; @Jears017</a>
		// 		</div>
		// 		<div className="course-block">
		// 			<a className={'course-link'} href={'https://rs.school/js/'} target="_blank" rel="noreferrer">
		// 				<img className={"footer-img"} src="https://rs.school/images/rs_school_js.svg" alt="rsschhol"/>
		// 				<span className="footer-text">/2021</span>
		// 			</a>
		// 		</div>
		// 	</div>
		// </footer>
    )
};

export default Footer;