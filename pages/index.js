import { db } from '../lib/db';
import React from 'react';
import Link from 'next/link';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import SiteDesctiption from '../components/index/Site-description';
import Wallpaper from '../components/index/Wallpaper';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   popularArtists: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     backgroundColor: theme.palette.background.paper,
//   },
//   gridList: {
//     flexWrap: 'nowrap',
//     transform: 'translateZ(0)',
//   },
// }));

export default class Index extends React.Component {
  static async getInitialProps() {
    let result = await new Promise((resolve, reject) => {
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

  render() {
    // const classes = useStyles();
    const fanPages = this.props.fanPages
    console.log(fanPages)
    return (
    <div>
        <Header />

        {/* トップ画像 */}
        <Wallpaper />
        {/* サイトの説明 */}
        <SiteDesctiption />
        {/* 人気なアーティストの一覧 */}
        <div>
            <h3>人気なアーティスト一覧</h3>
            {/* アーティスト画像の表示 */}
            <div>
                {fanPages.map(fanPage =>
                <GridList>
                    <GridListTile>
                        <Link href="/p/[detailid]" as={`/p/${fanPage.id}`}>
                        <img src="../static/popular-artist-img.jpg" />
                        </Link>
                        <GridListTileBar title={fanPage.artistName} />
                    </GridListTile>
                </GridList>
                    )}
            </div>
        </div>

        <Footer />
        </div>
        );
        }
    }

{/* <div className={classes.popularArtists}>
<GridList className={classes.gridList} cols={2.5}> */}