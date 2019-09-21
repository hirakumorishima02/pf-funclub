import { loadFirebase } from '../lib/db'
import React from 'react'

 export default class Posts extends React.Component {
  static async getInitialProps() {
    // db.jsのfirebaseのDB接続ファンクション
    let firebase = await loadFirebase()
    // DBのpostsコレクション内を全て取得した結果 = result
    let result = await new Promise((resolve, reject) => {
      firebase.firestore().collection('posts')
      .get()
      .then(snapshot => {
        let data = []
        snapshot.forEach((doc) => {
          data.push(
            Object.assign({
              id: doc.id
            }, doc.data())
          )
        })
        // console.log(data)
        resolve(data)
      }).catch(error => {
        reject([])
      })
    })
    console.log(result)
    return {posts: result}
  }
  render() {
    const posts = this.props.posts
    return (
        <React.Fragment>
                {posts.map(post =>
                    <div className="post" key={post.id}>
                        <h2>
                            {post.title}
                        </h2>
                        <p>
                            {post.body}
                        </p>
                    </div>
                    )}
            <style jsx>{`
            .post {
                width: 40%;
                border: 1px solid black;
                background-color: gray;
                margin-bottom: 10px;
            }
            `}</style>
        </React.Fragment>
    );
  }
}