import React from 'react';
import Link from 'next/link';

class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <ul>
                    <li>
                        <Link href='/site-rule'>
                            <a>サイト規約</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/contact'>
                            <a>お問い合わせ</a>
                        </Link>
                    </li>
                </ul>
                <style jsx>{`
                    .footer {
                        height: 200px;
                        margin-top: 20px;
                        border-top: solid 1px gray;
                    }
                `}</style>
            </div>
        )
    }
}

export default Footer;