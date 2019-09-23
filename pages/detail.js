import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import React from 'react';

const Detail = () => (
    <React.Fragment>
        <Header />
        <div>
            <h3>〇〇を応援する会</h3>
            <p>
                ファンクラブの説明です。　ファンクラブの説明です。　ファンクラブの説明です。　
                ファンクラブの説明です。　ファンクラブの説明です。　ファンクラブの説明です。　
                ファンクラブの説明です。　ファンクラブの説明です。　ファンクラブの説明です。　
                ファンクラブの説明です。　ファンクラブの説明です。　ファンクラブの説明です。　
            </p>
            <img src="../static/fan-img.png" className="fan-img" />
            <button>入会</button>
        </div>
        <Footer />
        <style jsx>{`
            div {
                margin: 0 auto;
                width: 80%;
                height: 80%;
            }
            .fan-img {
                display: block;
            }
        `}</style>
    </React.Fragment>
);

export default Detail;