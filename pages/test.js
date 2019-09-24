import React from 'react';
import Link from 'next/link';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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

const Test = ({artistName}) => {
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
Test.getInitialProps = () => {
    const fanPages = this.props.fanPages
    let result = new Promise((resolve, reject) => {
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
          resolve(data)
        }).catch(error => {
          reject([])
        })
      })
      return {fanPages: result}
}

export default Test;
