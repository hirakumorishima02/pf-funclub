import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        backgroundColor: '#3f51b5',
    },
    control: {
      padding: theme.spacing(2),
    },
  }));


export default function SiteDesctiption() {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    return (
    <div className="site-features">
        <Grid container className={classes.root} spacing={2} justify="center">
            <Grid item xs={4} md={3}>
                <Paper className={classes.paper}>
                    <h4>特徴</h4>
                    <p>
                        特徴の説明　特徴の説明　特徴の説明　特徴の説明　
                        特徴の説明　特徴の説明　特徴の説明　特徴の説明　
                        特徴の説明　特徴の説明　特徴の説明　特徴の説明　
                        特徴の説明　特徴の説明　特徴の説明　特徴の説明　
                    </p>
                </Paper>
            </Grid>
            <Grid item xs={4} md={3}>
                <Paper className={classes.paper}>
                    <h4>特徴</h4>
                    <p>
                        特徴の説明　特徴の説明　特徴の説明　特徴の説明　
                        特徴の説明　特徴の説明　特徴の説明　特徴の説明　
                        特徴の説明　特徴の説明　特徴の説明　特徴の説明　
                        特徴の説明　特徴の説明　特徴の説明　特徴の説明　
                    </p>
                </Paper>
            </Grid>
            <Grid item xs={4} md={3}>
                <Paper className={classes.paper}>
                    <h4>特徴</h4>
                    <p>
                        特徴の説明　特徴の説明　特徴の説明　特徴の説明　
                        特徴の説明　特徴の説明　特徴の説明　特徴の説明　
                        特徴の説明　特徴の説明　特徴の説明　特徴の説明　
                        特徴の説明　特徴の説明　特徴の説明　特徴の説明　
                    </p>
                </Paper>
            </Grid>
        </Grid>
    </div>
    )
}