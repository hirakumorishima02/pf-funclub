import { db }   from '../../../lib/db';
import { auth } from "../../../lib/db";
import React    from 'react';

import Header       from '../../../components/shared/Header';
import Footer       from '../../../components/shared/Footer';
import CheckoutForm from "../../../components/elements/CheckoutForm";
import Payable      from "../../../components/elements/Payable";

import Head   from 'next/head'
import Link   from 'next/link';

import { Elements, StripeProvider } from "react-stripe-elements";

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stripe  : null,
            isLogin : false,
            user    : {}
        };
    }

    async componentDidMount() {
        await auth.onAuthStateChanged(authUser => {
            if (authUser) {
              const state = Object.assign(this.state, {
                stripe: window.Stripe(process.env.stripeKey),
                isLogin: true,
                user: authUser
              });
              this.setState(state);
            } else {
              this.setState({
                isLogin: false,
                user: {}
              });
            }
          });
      }

    static async getInitialProps({query}) {
        let result = await
            db.collection("fanPages")
            .doc(query.fanpage)
            .get()
            .then(snapshot => {
                return { id: snapshot.id, ...snapshot.data() };
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
                    {this.state.isLogin
                    ?
                    <>
                    <Elements>
                        <CheckoutForm　currentUid={this.state.user.uid} />
                    </Elements>
                    <h5>使用するクレジットカードの選択</h5>
                    <Payable detail={this.props.detail} currentUid={this.state.user.uid} />
                    <button>
                        <Link href="/p/[fanpage]/member-only" as={`/p/${detail.id}/member-only`}>
                            会員ページへ
                        </Link>
                    </button>
                    </>
                    : "Please Login"}
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