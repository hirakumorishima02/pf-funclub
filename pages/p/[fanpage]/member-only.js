import withAuthMember from "../../../lib/helpers/withAuthMember";
import { db } from '../../../lib/db';
import Link from "next/link";

const MemberOnly = ({posts}) => {
  console.log(posts);
  return (
    <>
      <h1>pages/posts/index</h1>
      <ul>
        {/* {props.posts.map(post => {
          return (
            <li key={post.id}>
              <Link href="/posts/[post]" as={`/posts/${post.id}`}>
                <a>{post.title}</a>
              </Link>
              <ul>
                <li>{post.title}</li>
                <li>{post.body}</li>
              </ul>
            </li>
          );
        })} */}
      </ul>
    </>
  );
};

MemberOnly.getInitialProps = async () => {
  const result = await db
    .collection("fanPages")
    .doc("tDL9HvH3jXppwA95CRy1")
    .collection("posts")
    .get()
    .then(snapshot => {
      let data = [];
      snapshot.forEach(doc => {
        data.push(
          Object.assign(
            {
              id: doc.id
            },
            doc.data()
          )
        );
      });
      return data;
    }).catch(error => {
      return []
    })
  return { posts: result };
};

export default withAuthMember(MemberOnly);