import { db } from "../../../../lib/db";
import Link from "next/link";
import Header          from '../../../../components/shared/Header';
import Footer          from '../../../../components/shared/Footer';
import { useState } from "react";
import { useRouter } from 'next/router'

const PostEditPage = ({ post }) => {
  const router = useRouter()
  const [postState, setPostState] = useState({
    id: post.id,
    title: post.title,
    body: post.body,
    createdBy: post.createdBy
  });

  const handleTitle = event => {
    const changedContents = {
      title: event.target.value
    };
    setPostState({ ...Object.assign(postState, changedContents) });
  };

  const handleBody = event => {
    const changedContents = {
      body: event.target.value
    };
    setPostState({ ...Object.assign(postState, changedContents) });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await
      db.collection("fanPages")
      .doc(router.query.fanpage)
      .collection("posts")
      .doc(router.query.post)
        .set({
          title: postState.title,
          body: postState.body,
          createdBy: postState.createdBy
        });

      alert(`${postState.title} が編集されました。`);
    } catch (e) {
      console.log(e.message);
      alert(`${postState.title} は編集されませんでした。もう一度、編集し直してください。`);
    }
  };

  return (
    <>
      <Header />
      <h1>編集</h1>
      <Link href="/p/[fanpage]/member-only" as={`/p/${router.query.fanpage}/member-only`}>
        <a>ファンページに戻る</a>
      </Link>
      <h2>POST DETAIL</h2>
      <ul>
        <li>
          TITLE:
          <input
            type="text"
            value={postState.title}
            onChange={handleTitle}
          ></input>
        </li>
        <li>
          BODY:
          <textarea
            defaultValue={postState.body}
            onChange={handleBody}
          ></textarea>
        </li>
      </ul>
      <button type="submit" onClick={handleSubmit}>
        UPDATE
      </button>
      <Footer />
    </>
  );
};
PostEditPage.getInitialProps = async ({ query }) => {
  const result = await
    db.collection("fanPages")
    .doc(query.fanpage)
    .collection("posts")
    .doc(query.post)
    .get()
    .then(snapshot => {
      return { id: snapshot.id, ...snapshot.data() };
    });
  return { post: result };
};

export default PostEditPage;