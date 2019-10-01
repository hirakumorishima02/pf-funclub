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
  }));


const MyPage = () => {
    const classes = useStyles();
    const user = firebase.auth().currentUser;

    return(
        <div>
            <>
                <Header />
                <h2>アカウント情報</h2>
                <ul>
                    <li><img src={user.photoURL} /></li>
                    <li>{user.displayName}</li>
                    <li>{user.email}</li>
                </ul>

                <h4>登録中のファンページ</h4>
                <Table classNmae={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ファンページ名</TableCell>
                            <TableCell>解約ボタン</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>〇〇ファンクラブ</TableCell>
                            <TableCell><button>解約</button></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>〇〇のために頑張る会</TableCell>
                            <TableCell><button>解約</button></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>FC 〇〇</TableCell>
                            <TableCell><button>解約</button></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Footer />
            </>
            <style jsx>{`
                img {
                    width: 20%;
                }
                ul {
                    list-style: none;
                }
            `}</style>
        </div>
    )
}


export default withAuth(MyPage);