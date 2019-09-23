import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import React from 'react';
import Link from 'next/link';

const MyPage = () => (
    <React.Fragment>
        <Header />
        <div>
            <h2>アカウント情報</h2>
            <h4>アカウント名</h4>
            〇〇　タロー
            <h4>自己紹介文</h4>
            <p>  自己紹介文です。　自己紹介文です。　自己紹介文です。　自己紹介文です。　
                自己紹介文です。　自己紹介文です。　自己紹介文です。　自己紹介文です。　
                自己紹介文です。　自己紹介文です。　自己紹介文です。　自己紹介文です。　
                自己紹介文です。　自己紹介文です。　自己紹介文です。　自己紹介文です。　
            </p>
            <h4>登録中のファンページ</h4>
            <ul>
                <li>〇〇ファンクラブ</li><button>解約</button>
                <li>〇〇のために頑張る会</li><button>解約</button>
                <li>FC 〇〇</li><button>解約</button>
            </ul>

                <button>アカウント情報の編集</button>

        </div>
        <Footer />
        <style jsx>{`
            div {
                margin: 0 auto;
                width: 80%;
                height: 80%;
            }
        `}</style>
    </React.Fragment>

);

export default MyPage;