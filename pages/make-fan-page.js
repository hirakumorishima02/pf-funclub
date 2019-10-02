import { db }   from '../lib/db';
import React    from 'react';
import withAuth from "../lib/helpers/withAuth";

import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';


class MakeFunPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName  : '',
            artistName: '',
            body      : '',
            monthlyFee: '',
            category  : ''
        };
    }
    handleMakeFanPage = async (evt) => {
        evt.preventDefault();
        db.collection("fanPages").add({
            pageName: this.state.pageName,
            artistName: this.state.artistName,
            body: this.state.body,
            monthlyFee: this.state.monthlyFee,
            category: this.state.category
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    onChangePagename    = (evt) => {
        this.setState({ pageName: evt.target.value });
    }
    onChangeArtistName  = (evt) => {
        this.setState({ artistName: evt.target.value });
    }
    onChangeBody        = (evt) => {
        this.setState({ body: evt.target.value });
    }
     onChangeMonthlyFee = (evt) => {
        this.setState({ monthlyFee: evt.target.value });
    }
    onChangeCategory    = (evt) => {
        this.setState({ category: evt.target.value });
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                <div>
                    <h2>ファンページの作成</h2>
                    <form onSubmit={this.handleMakeFanPage}>
                        <div>
                            <label htmlFor="pageName">ファンページ名</label><br />
                            <input type="text" name="pageName"
                             value={this.state.pageName} onChange={this.onChangePagename} />
                        </div>
                        <div>
                            <label htmlFor="artistName">アーティスト名</label><br />
                            <input type="text" name="artistName"
                             value={this.state.artistName} onChange={this.onChangeArtistName} />
                        </div>
                        <div>
                            <label htmlFor="body">ファンページの紹介</label><br />
                            <textarea type="text" name="body" value={this.state.body} onChange={this.onChangeBody} />
                        </div>
                        <div>
                            <label htmlFor="monthlyFee">月額料金</label><br />
                            <input type="text" name="monthlyFee"
                             value={this.state.monthlyFee} onChange={this.onChangeMonthlyFee} />
                        </div>
                        <div>
                            <label htmlFor="category">カテゴリー</label><br />
                            <select name="category" value={this.state.category} onChange={this.onChangeCategory}>
                                <option>選択してください。</option>
                                <option value="singer">歌手</option>
                                <option value="calligrapher">書道家</option>
                                <option value="dancer">ダンサー</option>
                            </select>
                        </div>
                        <button type="submit">投稿</button>
                    </form>
                </div>
                <Footer />
                <style jsx>{`
                    .post-forms {
                        width: 80%;
                        height: 50%;
                        margin: 0 auto;
                    }
                    input, textarea {
                        width: 70%;
                    }
                    textarea {
                        height: 100px;
                    }
                `}</style>
            </React.Fragment>
        )
    }
};

export default withAuth(MakeFunPage);