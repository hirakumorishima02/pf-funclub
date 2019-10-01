import { db } from '../../lib/db';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';
import React from 'react';

export default class Detail extends React.Component {
    static async getInitialProps({query}) {
        let result = await
            db.collection("fanPages")
            .doc(query.detail)
            .get()
            .then(function(doc) {
                if (doc.exists) {
                    return doc.data();
                } else {
                    console.log('not exists');
                }
            }).catch(error => {
                console.log(error)
                return []
            })
          return {detail: result}
        }

      render() {
          const detail = this.props.detail;
        return (
            <React.Fragment>
                <Header />
                <div>
                    <h2>{detail.pageName}</h2>
                    <h4>概要</h4>
                    <p>{detail.body}</p>
                    <h4>アーティスト名　</h4>
                    <p>{detail.artistName}</p>
                    <h4>月額</h4>
                    <p>{detail.monthlyFee}円</p>
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