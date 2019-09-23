import React from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import SiteDesctiption from '../components/index/Site-description';
import ArtistsGridList from '../components/index/Artists-grid-list';
import Wallpaper from '../components/index/Wallpaper';

export default function Index() {
    return (
    <div>
        <Header />

        {/* トップ画像 */}
        <Wallpaper />
        {/* サイトの説明 */}
        <SiteDesctiption />
        {/* 人気なアーティストの一覧 */}
        <ArtistsGridList />

        <Footer />
    </div>
    );
}
