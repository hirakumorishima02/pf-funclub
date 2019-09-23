import React from 'react';
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

export default function ArtistsGridList() {
        const classes = useStyles();
        return (
            <div>
                <h3>人気なアーティスト一覧</h3>
                {/* アーティスト画像の表示 */}
                <div className={classes.popularArtists}>
                    <GridList className={classes.gridList} cols={2.5}>
                        <GridListTile>
                            <img src="../static/popular-artist-img.jpg" />
                            <GridListTileBar title={"Test"} />
                        </GridListTile>
                        <GridListTile>
                            <img src="../static/popular-artist-img.jpg" />
                            <GridListTileBar title={"Test"} />
                        </GridListTile>
                        <GridListTile>
                            <img src="../static/popular-artist-img.jpg" />
                            <GridListTileBar title={"Test"} />
                        </GridListTile>
                    </GridList>
                </div>
            </div>
        );
    }