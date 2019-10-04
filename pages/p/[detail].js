import { db } from '../../lib/db';
import { auth } from "../../lib/db";

import React from 'react';

import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';

import Head from 'next/head'

export default class Detail extends React.Component {
    // constructorにStripeのカード登録に必要なデータのStateを用意
    constructor(props) {
        super(props);
        this.state = {
            number     : '4242424242424242',
            cvc        : '111',
            exp_month  : 1,
            exp_year   : 2020,
            address_zip: '00000',
            userId     : '',
        };
    }
    // submitNewCreditCardに使用するauthUserのuidをstateに取得
    componentDidMount() {
        auth.onAuthStateChanged(authUser => {
          if (authUser) {
            this.setState({
              userId: authUser.uid
            });

          } else {
            router.push("/");
          }
        });
      }
    // 入力されたカード情報をStripeに送信
    submitNewCreditCard = async (evt) => {
        evt.preventDefault();
        await 
        Stripe.setPublishableKey(functions.config().stripe.apykey);
        Stripe.card.createToken({
                number: this.state.number,
                cvc: this.state.cvc,
                exp_month: this.state.exp_month,
                exp_year: this.state.exp_year,
                address_zip: this.state.address_zip
            }, (response) => {
                if (response.error) {
                    this.newCreditCard.error = response.error.message;
            } else {
                db.collection('stripe_customers').doc(this.state.userId).collection('tokens').add({token: response.id}).then(() => {
                    console.log("Done!")
                    this.setState({
                        number: '',
                        cvc: '',
                        exp_month: 1,
                        exp_year: 2020,
                        address_zip: ''
                    });
                });
            }
            });
    }
    // カード情報登録フォーム関係の関数
    onChangeNumber       = (evt) => {
        this.setState({ number: evt.target.value });
    }
    onChangeCvc          = (evt) => {
        this.setState({ ccv: evt.target.value });
    }
    onChangeExp_month    = (evt) => {
        this.setState({ exp_month: evt.target.value });
    }
    onChangeExp_year     = (evt) => {
        this.setState({ exp_year: evt.target.value });
    }
    onChangeZip          = (evt) => {
        this.setState({ zip: evt.target.value });
    }
    // 単発決済関係の関数
    submitNewCharge () {
        db.collection('stripe_customers').doc(this.state.userId).collection('charges').add({
            source: this.state.source,
            amount: parseInt(this.newCharge.amount)
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
            <>
                <Head>
                    <script src="https://js.stripe.com/v2/"></script>
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
                <div>
                <form onSubmit={this.submitNewCreditCard}>
                    <div>
                        <label htmlFor="number">カード番号</label><br />
                        <input type="text" name="number"
                            defaultValue={this.state.number} onChange={this.onChangeNumber} />
                    </div>
                    <div>
                        <label htmlFor="cvc">CVC</label><br />
                        <input type="text" name="cvc"
                            defaultValue={this.state.cvc} onChange={this.onChangeCvc} />
                    </div>
                    <div>
                        <label htmlFor="exp_month">有効期限(月)</label><br />
                        <input type="text" name="exp_month"
                            defaultValue={this.state.exp_month} onChange={this.onChangeExp_month} />
                    </div>
                    <div>
                        <label htmlFor="exp_year">有効期限(年)</label><br />
                        <input type="text" name="exp_year"
                            defaultValue={this.state.exp_year} onChange={this.onChangeExp_year} />
                    </div>
                    <div>
                        <label htmlFor="address_zip">郵便番号</label><br />
                        <input type="text" name="address_zip"
                            defaultValue={this.state.address_zip} onChange={this.onChangeAddress_zip} />
                    </div>
                    <button type="submit">カード登録</button>
                </form>
                <form onSubmit={this.submitNewCharge}>
                    <button type="submit">入会</button>
                </form>
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
            </>
          );
      }
}