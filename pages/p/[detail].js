import { db } from '../../lib/db';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';
import React from 'react';

export default class Detail extends React.Component {
    static async getInitialProps({query}) {
        // URLクエリパラメータ取得
        console.log(query.detail)
        let result = await new Promise((resolve, reject) => {
            db.collection("fanPages")
            .doc("JNTwv1d5W0g1yXQr667j")
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
                console.log(error)
              reject([])
            })
          })
          return {detail: result}
        }

      render() {
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
}