import { db } from '../../lib/db';
import React from 'react';

export default class Detail extends React.Component {
    static async getInitialProps({query}) {
        console.log(query);
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
                <div>
                    <h1>{detail.artistName}</h1>
                    <p>
                        {detail.body}
                    </p>
                    <ul>
                        <li>{detail.category}</li>
                        <li>{detail.monthlyFee}</li>
                        <li>{detail.pageName}</li>
                    </ul>
                </div>
            </React.Fragment>
          );
      }
}