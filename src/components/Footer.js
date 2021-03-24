import React, { useState } from 'react';
import { Container, Typography, Box, Grid, CardMedia, Card, IconButton } from '@material-ui/core';
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
                            <IconButton color="inherit" href="https://github.com/oranje322"><GitHubIcon /></IconButton>
                            <IconButton color="inherit" href="https://github.com/kristinand"><GitHubIcon /></IconButton>
                            <IconButton color="inherit" href="https://github.com/ya-stefaniya"><GitHubIcon /></IconButton>
                            <IconButton color="inherit" href="https://github.com/zaruba2004"><GitHubIcon /></IconButton>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">                        
                        <IconButton color="inherit" href="https://rs.school/js/">
                            <Card className={classes.root}>
                                <CardMedia component="img" 
                                image='https://rs.school/images/rs_school_js.svg'
                                title="RSschol"/>
                            </Card>
                        </IconButton>
                        <Typography variant="body1">2021</Typography>
                    </Box>
                </Grid>
            </Container>
        </footer>

    )
};

export default Footer;