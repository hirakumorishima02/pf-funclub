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
                <Link href='/make-fan-page'>
                    <a>Fan Clubの作成</a>
                </Link>
                <Link href='/my-page'>
                    <a>マイページ</a>
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
                    <Link href="/SearchResult">
                        <button type="submit">Search</button>
                    </Link>
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