import { db } from '../lib/db';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import React from 'react';

 class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        };
    }
    registerPost = async (evt) => {
        evt.preventDefault();
        db.collection("posts").add({
            title: this.state.title,
            state: this.state.body,
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    onChangeTitle = (evt) => {
        this.setState({ title: evt.target.value });
    }
     onChangeBody = (evt) => {
        this.setState({ body: evt.target.value });
    }
     render() {
        return (
            <React.Fragment>
                <Header />
                <div className="post-forms">
                    <form onSubmit={this.registerPost}>
                        <label htmlFor="title">タイトル</label><br/>
                        <input name="title" value={this.state.title} onChange={this.onChangeTitle} /><br/>
                        <label htmlFor="body">本文</label><br/>
                        <textarea name="body" value={this.state.body} onChange={this.onChangeBody}></textarea><br/>
                        <button type="submit">投稿</button>
                    </form>
                    <Footer />
                </div>
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
}
 export default CreatePost;