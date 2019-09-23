import React from 'react';
import Link from 'next/link';
import Button from '@material-ui/core/Button';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <Link href='/'>
                    <a>Fan Club</a>
                </Link>
                <Link href='/signup'>
                    <Button variant="contained" color="primary">
                        SIGN UP
                    </Button>
                </Link>
                <Link href='/signin'>
                    <Button variant="contained" color="secondary">
                        SIGN IN
                    </Button>
                </Link>
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