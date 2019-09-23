import FanPage from '../components/elements/FanPage';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import React from 'react'

export default function SearchResult() {
    return (
        <React.Fragment>
            <Header />
            <div>
                <h2>検索結果</h2>
                <FanPage />
                <FanPage />
                <FanPage />
                <FanPage />
            </div>
            <Footer />
        </React.Fragment>
    );
}