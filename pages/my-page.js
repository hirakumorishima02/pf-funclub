import withAuth from "../lib/helpers/withAuth";
import React from 'react';
import { firebase } from "../lib/db";
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import Link from 'next/link';


class MyPage extends React.Component {
    render() {
        const user = firebase.auth().currentUser;
        console.log(user);
        return(
            <div>
            <h2>アカウント情報</h2>
            <h4>アカウント名</h4>
            {user.displayName}
            <h4>メールアドレス</h4>
            <p>
            {user.email}　
            </p>
            <img src={user.photoURL} />
            <h4>登録中のファンページ</h4>
            <ul>
                <li>〇〇ファンクラブ</li><button>解約</button>
                <li>〇〇のために頑張る会</li><button>解約</button>
                <li>FC 〇〇</li><button>解約</button>
            </ul>
            <button>アカウント情報の編集</button>
            <style jsx>{`
                div {
                    margin: 0 auto;
                    width: 80%;
                    height: 80%;
                }
            `}</style>
            </div>
        )
    }

};

export default withAuth(MyPage);