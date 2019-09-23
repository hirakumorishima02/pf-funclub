const MakeFunPage = () => (
    <div>
        <h2>ファンページの作成</h2>
        <form>
            <div>
                <label for="title">ファンページ名</label><br />
                <input type="text" name="title" />
            </div>
            <div>
                <label for="title">アーティスト名</label><br />
                <input type="text" name="title" />
            </div>
            <div>
                <label for="body">ファンページの紹介</label><br />
                <textarea type="text" name="body" />
            </div>
            <div>
                <label for="title">月額料金</label><br />
                <input type="text" name="title" />
            </div>
            <div>
                <label for="title">カテゴリー</label><br />
                <select>
                    <option disabled>選択してください。</option>
                    <option>歌手</option>
                    <option>書道家</option>
                    <option>ダンサー</option>
                </select>
            </div>
            <button type="submit">投稿</button>
        </form>
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

export default MakeFunPage;