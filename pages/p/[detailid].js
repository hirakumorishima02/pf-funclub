import { useRouter } from 'next/router';
import { db } from '../../lib/db';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';
import React from 'react';

export default function Post() {
  const router = useRouter();
//   console.log(router.query.detailid)

  // FiresotreのDBに接続し、fanPagesコレクションの"JNTwv1d5W0g1yXQr667j"ドキュメントを参照
  const fanPageRef = db.collection("fanPages").doc("JNTwv1d5W0g1yXQr667j");
        fanPageRef.get().then(function(doc) {
        if(doc.exists) {
              console.log(doc.data());
            return doc.data(); // {artistName: "test1", body: "test1", category: "singer", monthlyFee: "1000", pageName: "test1"}
        } else {
            console.log("not exists");
        }
    }).catch(function(error) {
        console.log(error);
    });

  return (
    <React.Fragment>
        <Header />
        <div>
            {/* {fanPageRef.map(ref =>
            <h3>{ref.artistName}</h3> // test1と出力
            <p>{ref.body}</p> // test1と出力
            <p>Category:{ref.category}</p> // singerと出力
            （以下略)Z
             )} */}
            <p>
                ファンクラブの説明です。　ファンクラブの説明です。　ファンクラブの説明です。　
                ファンクラブの説明です。　ファンクラブの説明です。　ファンクラブの説明です。　
                ファンクラブの説明です。　ファンクラブの説明です。　ファンクラブの説明です。　
                ファンクラブの説明です。　ファンクラブの説明です。　ファンクラブの説明です。　
            </p>
            <img src="../static/fan-img.png" className="fan-img" />
            <button>入会</button>
        </div>
        <Footer />
        <style jsx>{`
            div {
                margin: 0 auto;
                width: 80%;
                height: 80%;
            }
            .fan-img {
                display: block;
            }
        `}</style>
    </React.Fragment>
  );
}