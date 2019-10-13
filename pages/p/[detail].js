import { db }   from '../../lib/db';
import { auth } from "../../lib/db";
import React    from 'react';

import Header       from '../../components/shared/Header';
import Footer       from '../../components/shared/Footer';
import CheckoutForm from "../../components/elements/CheckoutForm";

import Head     from 'next/head'

import { Elements, StripeProvider } from "react-stripe-elements";

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { stripe: null };
    }

    componentDidMount() {
        this.setState({
          stripe: window.Stripe(process.env.stripeKey)
        });
      }

    // 単発決済関係の関数
    submitNewCharge = async (evt) => {
        evt.preventDefault();
        await
        db.collection('stripe_customers').doc(this.state.userId).collection('charges').add({
            source: this.state.source,
            amount: parseInt(this.state.amount)
          });
    }

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
            <StripeProvider stripe={this.state.stripe}>
                <>
                    <Head>
                        <script src="https://js.stripe.com/v3/"></script>
                    </Head>
                    <Header />
                    <div>
                        <h2>{detail.pageName}</h2>
                        <h4>概要</h4>
                        <p>{detail.body}</p>
                        <h4>アーティスト名　</h4>
                        <p>{detail.artistName}</p>
                        <h4>月額</h4>
                        <p>{detail.monthlyFee}円</p>
                    </div>
                    <Elements>
                        <CheckoutForm />
                    </Elements>
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
                </>
            </StripeProvider>
          );
      }
}