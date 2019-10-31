import withAuthMember from "../../../lib/helpers/withAuthMember";
import { db } from '../../../lib/db';
import Link from "next/link";

import React, { useEffect, useState }  from 'react'; 
import { useRouter } from 'next/router'


const MemberOnly = props => {
  const [postsState, setPostsState] = useState([]);
  const router = useRouter()
  useEffect(() => {
    async function fetchData() {
      const result = 
      await 
      db.collection("fanPages")
      .doc(router.query.fanpage)
      .collection("posts")
      .get()
      .then(snapshot => {
        let posts = [];
        snapshot.forEach(doc => {
          posts.push({ key: doc.id, value: doc.data() });
        });
        setPostsState(posts);
      });
  }
  fetchData();
  }, []);

  return (
    <>
      <h1>pages/posts/index</h1>
      <ul>
        {postsState.map(post => {
          return (
            <li key={post.key}>
              <h3>{post.value.title}</h3>
              <ul>
                <li key={post.key}>
                  <p>{post.value.body}</p>
                </li>
              </ul>
              <p>
                {props.currentUser.uid == post.value.createdBy ? (
                  <Link
                    href="/p/[fanpage]/edit"
                    as={`/p/${post.key}/edit`}
                  >
                    <a>EDIT</a>
                  </Link>
                ) : (
                  "READ ONLY"
                )}
              </p>
            </li>
          );
        })}
      </ul>
      <p>
        {props.currentUser.uid == "aE91BXgT8fZaDiikdTRF4dmRzhF2" ? (
          <Link
            href="/p/[fanpage]/add"
            as={`/p/add`}
          >
            <a>ADD POST</a>
          </Link>
        ) : (
          "READ ONLY"
        )}
      </p>
    </>
  );
};

export default withAuthMember(MemberOnly);