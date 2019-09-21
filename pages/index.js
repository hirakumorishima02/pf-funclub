import { loadFirebase } from '../lib/db'
import React from 'react'

 export default class Index extends React.Component {
  static async getInitialProps() {
    let firebase = await loadFirebase()
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
    // console.log(result)
    return {posts: result}
  }
  render() {
    const posts = this.props.posts
    return (
      <ul>
        {posts.map(post => <li key="{post.id}">{post.title}</li>)}
      </ul>
    );
  }
}

// console.log(firebase)
// const Index = () => (
//   <div>test</div>
// );

// export default Index;