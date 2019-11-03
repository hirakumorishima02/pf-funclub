import { firestore } from "../../../lib/db";
import Link from "next/link";
import { useState } from "react";
import withAuth from "../../../lib/helpers/withAuth";
import { useRouter } from 'next/router'
import Header          from '../../../components/shared/Header';
import Footer          from '../../../components/shared/Footer';

const PostEditPage = props => {
  const router = useRouter()
  const [postState, setPostState] = useState({
    title: "",
    body: "",
    createdBy: props.currentUser.uid
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
      firestore
      .collection("fanPages")
      .doc(router.query.fanpage)
      .collection("posts")
      .add({
        title: postState.title,
        body: postState.body,
        createdBy: postState.createdBy
      });

      alert(`投稿しました。: ${postState.title}`);
    } catch (e) {
      console.log(e.message);
      alert(`投稿が失敗しました。 : ${postState.title} `);
    }
  };

  return (
    <>
      <Header />
      <h1>投稿</h1>
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
        ADD
      </button>
      <Footer />
    </>
  );
};

export default withAuth(PostEditPage);