import React from 'react';
import Link from 'next/link';

class Header extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Link href='/'>
                    <a>サイト名</a>
                </Link>
                <Link href='/signup'>
                    <a>SIGN UP</a>
                </Link>
                <Link href='/signin'>
                    <a>SIGN IN</a>
                </Link>
            </React.Fragment>
        )
    }
}

export default Header;