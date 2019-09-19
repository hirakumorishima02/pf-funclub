import React from 'react';

export default function Wallpaper() {
    return (
        <div>
            <img src="../../static/top-img.jpg" className="top-img"></img>
            <style jsx>{`
                .top-img {
                    width: 100%;
                }
            `}</style>
        </div>
    )
}