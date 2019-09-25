import { db } from '../lib/db';
import React from 'react';
import Link from 'next/link';

export default class Index extends React.Component {
  static async getInitialProps() {
    let result = await
      db.collection('fanPages')
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
        return data
      }).catch(error => {
        return []
      })
    return {datas: result}
  }

  render() {
    const datas = this.props.datas
    return (
        <div>
            <h3>Firestoreのデータ一覧</h3>
            <div>
              <ul>
              {datas.map(fanPage =>
                <li key={fanPage.id}>
                    <Link href="/p/[detailid]" as={`/p/${fanPage.id}`}>
                      <a>{fanPage.artistName}</a>
                    </Link>
                </li>
              )}
              </ul>
            </div>
        </div>
        );
        }
    }