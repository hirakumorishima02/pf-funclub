import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function SiteDesctiption() {
    return (
        <div className="site-features">
        <h3>サイトの特徴</h3>
        <Grid container>
            {/* 特徴1 */}
            <Grid item sm={4}>
                <h4>特徴１</h4>
                <p>
                    サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　
                    サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　
                    サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　
                </p>
            </Grid>
            {/* 特徴2 */}
            <Grid item sm={4}>
            <h4>特徴2</h4>
                <p>
                    サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　
                    サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　
                    サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　
                </p>
            </Grid>
            {/* 特徴3 */}
            <Grid item sm={4}>
            <h4>特徴3</h4>
                <p>
                    サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　
                    サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　
                    サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　サイトの特徴です。　
                </p>
            </Grid>
        </Grid>
    </div>
    )
}