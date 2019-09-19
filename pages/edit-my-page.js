const EditMyPage = () => (
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
            <button type="submit">編集完了</button>
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

export default EditMyPage;