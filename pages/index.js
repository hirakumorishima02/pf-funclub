import { db } from '../lib/db';
import React  from 'react';
import Link   from 'next/link';

import Header          from '../components/shared/Header';
import Footer          from '../components/shared/Footer';
import SiteDesctiption from '../components/index/Site-description';
import Wallpaper       from '../components/index/Wallpaper';

import GridList        from '@material-ui/core/GridList';
import GridListTile    from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import { makeStyles }  from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

  popularArtists: {
    display:         'flex',
    flexWrap:        'wrap',
    justifyContent:  'space-around',
    overflow:        'hidden',
    backgroundColor: theme.palette.background.paper,
  },

  gridList: {
    flexWrap:  'nowrap',
    transform: 'translateZ(0)',
  },

}));

const Index = ({fanPages}) => {
    const classes = useStyles();

    return (
        <>
            <Header />
            <Wallpaper />
            <SiteDesctiption />

            <div>
                <h3>アーティスト一覧</h3>
                <div className={classes.popularArtists}>
                    <GridList cellHeight={160} className={classes.gridList} cols={3}>
                        {fanPages.map(fanPage =>
                            <GridListTile key={fanPage.id} cols={fanPage.cols || 1}>
                                <Link href="/p/[detailid]" as={`/p/${fanPage.id}`}>
                                    <img src="../static/popular-artist-img.jpg" />
                                </Link>
                                <GridListTileBar title={fanPage.artistName} />
                            </GridListTile>
                        )}
                    </GridList>
                </div>
            </div>

            <Footer />
        </>
    );
}

Index.getInitialProps =

    async() => {
        let result =
                await
                    db.collection('fanPages')
                    .get()
                    .then(snapshot => {
                        let data = []
                        snapshot.forEach((doc) => {
                            data.push(
                            Object.assign({id: doc.id}, doc.data()))})
                        return data
                    }).catch(error => {
                        return []
    })

    return {fanPages: result}

};

export default Index;