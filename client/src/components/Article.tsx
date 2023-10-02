// Set up this component
import React, { useState, useEffect } from 'react';

interface ArticleProps {
  title: string;
  url: string
}

const Article: React.FC<ArticleProps> = ({title, url}) => {
  return (
    <div className='p-4 bg-slate-300 rounded-xl' >
        {title}
        <img src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=32`}/>
    </div>
  )
}

export default Article;
