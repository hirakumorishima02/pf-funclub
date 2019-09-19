const CreatePost = () => (
    <div className="post-forms">
        <h2>新規投稿</h2>
        <form>
            <div>
                <label for="title">タイトル</label><br />
                <input type="text" name="title" />
            </div>
            <div>
                <label for="body">本文</label><br />
                <textarea type="text" name="body" />
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
)

export default CreatePost;