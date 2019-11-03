import { firebase } from "../lib/db";
import withAuth     from "../lib/helpers/withAuth";

import React        from 'react';

import Header       from '../components/shared/Header';
import Footer       from '../components/shared/Footer';

import { makeStyles } from '@material-ui/core/styles';
import Table          from '@material-ui/core/Table';
import TableBody      from '@material-ui/core/TableBody';
import TableCell      from '@material-ui/core/TableCell';
import TableHead      from '@material-ui/core/TableHead';
import TableRow       from '@material-ui/core/TableRow';


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
    img: {
        width: '20%'
    },
    ul: {
        listStyle: 'none'
    }
  }));


const MyPage = () => {
    const classes = useStyles();
    const user = firebase.auth().currentUser;

    return(
        <div>
            <>
                <Header />
                <h2>アカウント情報</h2>
                <ul className={classes.ul}>
                    <li><img src={user.photoURL} className={classes.img}/></li>
                    <li>{user.displayName}</li>
                    <li>{user.email}</li>
                </ul>
                <Footer />
            </>
        </div>
    )
}


export default withAuth(MyPage);