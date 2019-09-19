import React from 'react';
import Link from 'next/link';

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <Link href='/site-rules'>
                    <a>サイト規約</a>
                </Link>
                <Link href='/contact'>
                    <a>お問い合わせ</a>
                </Link>
                <style jsx>{`
                    .footer {
                        height: 200px;
                    }
                `}</style>
            </div>
        )
    }
}

export default Footer;