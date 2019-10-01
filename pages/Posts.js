import { db } from '../lib/db';
import React  from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const handleDelete = (id) => {
  db.collection('posts')
  .doc(id)
  .delete()

  .then(function() {
    console.log("Document successfully deleted!");
  })

  .catch(function(error) {
    console.error("Error removing document: ", error);
  });
}

const useStyles = makeStyles(theme => ({
  card: {
    width: '50%',
    marginBottom: '20px'
  }
}));

const Posts = ({posts}) => {
  const classes = useStyles();
  return (
    <>
      <Header />
        <Link href='/create-post'>
          <a>新規投稿</a>
        </Link>
        <div>
          {posts.map(post =>
            <Card className={classes.card} key={post.id}>
              <CardHeader title={post.title} />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.body}
                </Typography>
              </CardContent>
              <button onClick={handleDelete.bind(this, post.id)}>削除</button>
            </Card>
          )}
        </div>
      <Footer />
      <style jsx>{`
        .post {
          width: 40%;
          border: 1px solid black;
          background-color: gray;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
}

Posts.getInitialProps =

  async() => {
    let result = await new Promise((resolve, reject) => {
      db.collection('posts')
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
        resolve(data)
      }).catch(error => {
        reject([])
      })
    })
    return {posts: result}
  }

export default Posts;