import React from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import { auth, firebase } from "../../lib/db";

class Header extends React.Component {
    handleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
        auth
          .signInWithPopup(provider)
          .then(() => {
            alert("You are signed In");
          })
          .catch(err => {
            alert("OOps something went wrong check your console");
            console.log(err);
          });
      };
      handleSignout = () => {
        auth
          .signOut()
          .then(function() {
            alert("Logout successful");
          })
          .catch(function(error) {
            alert("OOps something went wrong check your console");
            console.log(err);
          });
      };

    render() {
        return (
            <div className="header">
                <Link href='/'>
                    <a>Fan Club</a>
                </Link>
                    <Button variant="contained" color="primary" onClick={this.handleSignIn}>
                        SIGN IN
                    </Button>
                    <Button variant="contained" color="secondary" onClick={this.handleSignout}>
                        SIGN OUT
                    </Button>
                    <Button href="/my-page" variant="contained">
                        My Page
                    </Button>
                <form className="serch-form">
                    <input type="text" placeholder="Serch Artists" />
                    <button type="submit">Search</button>
                </form>
                <style jsx>{`
                    .header {
                        height: 80px;
                    }
                    .serch-form {
                        display: inline-block;
                    }
                `}</style>
            </div>
        )
    }
}

export default Header;