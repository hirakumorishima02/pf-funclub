import React from 'react';
import Link from 'next/link';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { db } from '../lib/db';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  popularArtists: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
}));

const Test = ({fanPages}) => {
    const classes = useStyles();
    return (
        <div>
            <div>
                <h3>人気なアーティスト一覧</h3>
                {/* アーティスト画像の表示 */}
                <div className={classes.popularArtists}>
                {fanPages.map(fanPage =>
                <GridList className={classes.gridList} cols={2.5}>
                    <GridListTile>
                        <Link href="/detail">
                        <img src="../static/popular-artist-img.jpg" />
                        </Link>
                        <GridListTileBar title={fanPage.artistName} />
                    </GridListTile>
                </GridList>
                    )}
            </div>
            </div>
            </div>
            );
        }
Test.getInitialProps = async() => {
    let result = await 
      // awaitする
        db.collection('fanPages')
        .get()
        .then(snapshot => {
          let data = []
          snapshot.forEach((doc) => {
            data.push(
              Object.assign({
                id: doc.id
              }, doc.data())
            )
          })
          // 48行目のresultにdataが入る
          return data
        }).catch(error => {
          // 48行目のresultにdataが入る
          return []
        })
      return {fanPages: result}
}

export default Test;
