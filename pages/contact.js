import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import React from 'react';

const Contact = () => (
    <React.Fragment>
        <div>
            <Header />
            <h2>お問い合わせ</h2>
            <div>
                <label for="name">お名前</label><br />
                <input type="text" name="name" />
            </div>
            <div>
                <label for="email">メールアドレス</label><br />
                <input type="text" name="mailaddress" />
            </div>
            <div>
                <label for="body">お問い合わせ内容</label><br />
                <textarea type="text" name="body" />
            </div>
            <button type="submit">送信</button>
            <Footer />
        </div>
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

export default Contact;