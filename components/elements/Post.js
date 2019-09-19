const Post = () => (
    <div className="post">
        <h4>Post's Title</h4>
        <p>
            post's body. post's body. post's body. post's body.
            post's body. post's body. post's body. post's body.
            post's body. post's body. post's body. post's body.
        </p>
        <style jsx>{`
            .post {
                width: 40%;
                border: 1px solid black;
                background-color: gray;
            }
        `}</style>
    </div>
);

export default Post;