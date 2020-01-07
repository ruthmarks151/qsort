import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function BigInfoPage({title, body, primaryText, primaryLink, secondaryText, secondaryLink}:
                                        { title: string, body: string[], primaryLink?: string, primaryText?: string, secondaryLink?: string, secondaryText?: string }) {
    const classes = useStyles();
    return <div className={classes.heroContent}>
        <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                {title}
            </Typography>
            {body.map(s => <Typography variant="h5" align="center" color="textSecondary" paragraph>
                {s}
            </Typography>)}
            <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                    {primaryText && primaryLink &&
                    <Grid item>
                        <Link to={primaryLink} style={{textDecoration: 'none'}}>
                            <Button variant="contained" color="primary">
                                {primaryText}
                            </Button>
                        </Link>
                    </Grid>
                    }
                    {secondaryText && secondaryLink &&
                    <Grid item>
                        {(secondaryLink.startsWith("http")) ?
                            <a href={secondaryLink} target="_blank" style={{textDecoration: 'none'}}>
                                <Button variant="outlined" color="primary">
                                    {secondaryText}
                                </Button>
                            </a>
                            :
                        <Link to={secondaryLink} style={{textDecoration: 'none'}}>
                            <Button variant="outlined" color="primary">
                                {secondaryText}
                            </Button>
                        </Link>}
                    </Grid>
                    }
                </Grid>
            </div>
        </Container>
    </div>
}