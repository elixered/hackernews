import React from 'react'
import '../App.css'
function NewsCard({ article }) {
    if (!article.title) return null;
    return (
        <div className='news-card'>
            <h3><a href={article.url}>{article.title}</a></h3>
            <p>{article.points} points  | by {article.author} </p>
            <p>Creation date: {article.created_at.toString().slice(0, 10)}</p>
        </div>
    )
}

export default NewsCard