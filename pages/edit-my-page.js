import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import React from 'react';

const EditMyPage = () => (
    <React.Fragment>
        <Header />
        <div>
            <h2>アカウント情報の編集</h2>
                <div>
                    <label for="name">アカウント名</label><br />
                    <input type="text" name="name" />
                </div>
                <div>
                    <label for="body">自己紹介文</label><br />
                    <textarea type="text" name="body" />
                </div>
                <button type="submit">アカウント情報の編集完了</button>
        </div>
        <Footer />
        <style jsx>{`
            .post-forms {
                width: 80%;
                height: 50%;
                margin: 0 auto;
            }
            input, textarea {
                width: 70%;
            }
            textarea {
                height: 100px;
            }
        `}</style>
    </React.Fragment>
);

export default EditMyPage;