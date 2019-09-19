import React from 'react';
import Link from 'next/link';

class Footer extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Link href='/site-rules'>
                    <a>サイト規約</a>
                </Link>
                <Link href='/contact'>
                    <a>お問い合わせ</a>
                </Link>
            </React.Fragment>
        )
    }
}

export default Footer;