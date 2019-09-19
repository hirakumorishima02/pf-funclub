const Contact = () => (
    <div>
        <h2>お問い合わせ</h2>
        <div>
            <label for="name">お名前</label><br />
            <input type="text" name="name" />
        </div>
        <div>
            <label for="mailaddress">メールアドレス</label><br />
            <input type="text" name="mailaddress" />
        </div>
        <div>
            <label for="body">お問い合わせ内容</label><br />
            <textarea type="text" name="body" />
        </div>
        <button type="submit">送信</button>
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
    </div>
);

export default Contact;