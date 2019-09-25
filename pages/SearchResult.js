import FanPage from '../components/elements/FanPage';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import Link from 'next/link';
import React from 'react'

export default function SearchResult() {
    return (
        <React.Fragment>
            <Header />
            <div>
                <h2>検索結果</h2>
                <Link href="/detail">
                    <FanPage />
                </Link>
            </div>
            <Footer />
        </React.Fragment>
    );
}