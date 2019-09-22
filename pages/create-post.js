import { loadFirebase } from '../lib/db';
import React from 'react';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCi11PBVcuYlUfzx2MhX4ipR5lfhmieu8M",
    authDomain: "pf-fanclub.firebaseapp.com",
    databaseURL: "https://pf-fanclub.firebaseio.com",
    projectId: "pf-fanclub",
    storageBucket: "pf-fanclub.appspot.com",
    messagingSenderId: "866039919067",
    appId: "1:866039919067:web:25df27d9d882d89aa937fe"
  };
if (!firebase.apps.length) {
    var app = firebase.initializeApp(config);
}
var db = firebase.firestore(app);

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
            <div className="post-forms">
                <form onSubmit={this.registerPost}>
                    <label htmlFor="title">タイトル</label><br/>
                    <input name="title" value={this.state.title} onChange={this.onChangeTitle} /><br/>
                    <label htmlFor="body">本文</label><br/>
                    <textarea name="body" value={this.state.body} onChange={this.onChangeBody}></textarea><br/>
                    <button type="submit">投稿</button>
                </form>
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
            </div>
        )
    }
}
// const CreatePost = () => (
//     <div className="post-forms">
//         <h2>新規投稿</h2>
//         <form>
//             <div>
//                 <label htmlFor="title">タイトル</label><br />
//                 <input type="text" name="title" />
//             </div>
//             <div>
//                 <label htmlFor="body">本文</label><br />
//                 <textarea type="text" name="body" />
//             </div>
//             <button type="submit">投稿</button>
//         </form>

//     </div>
// )

export default CreatePost;