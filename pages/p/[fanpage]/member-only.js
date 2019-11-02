import withAuthMember from "../../../lib/helpers/withAuthMember";
import { db } from '../../../lib/db';
import Link from "next/link";

import React, { useEffect, useState }  from 'react'; 
import { useRouter } from 'next/router'

const MemberOnly = props => {
  const [postsState, setPostsState] = useState([]);
  const [ownerState, setOwnerState] = useState([]);
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

  async function fetchOwnerAndTitle() {
    const result = 
    await 
    db.collection("fanPages")
    .doc(router.query.fanpage)
    .get()
    .then(snapshot => {
      let ownerId = snapshot.data().userId;
      let pageName = snapshot.data().pageName;
      setOwnerState({ownerId,pageName})
    });
  }
  fetchOwnerAndTitle()
  }, []);

  return (
    <>
      <h1>{ownerState.pageName}</h1>
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
                    href="/p/[fanpage]/[post]/edit"
                    as={`/p/${router.query.fanpage}/${post.key}/edit`}
                  >
                    <a>EDIT</a>
                  </Link>
                ) : (
                  ""
                )}
              </p>
            </li>
          );
        })}
      </ul>
      <p>
        {props.currentUser.uid == ownerState.ownerId ? (
          <Link
            href="/p/[fanpage]/add"
            as={`/p/${router.query.fanpage}/add`}
          >
            <a>ADD POST</a>
          </Link>
        ) : (
          ""
        )}
      </p>
    </>
  );
};

export default withAuthMember(MemberOnly);