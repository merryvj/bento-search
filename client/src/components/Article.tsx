// Set up this component
import React, { useState, useEffect } from 'react';

interface ArticleProps {
  title: string;
  url: string
}

const Article: React.FC<ArticleProps> = ({title, url}) => {
  return (
    <div className='p-4 bg-slate-300 rounded-xl' >
        <div className='flex gap-2'>
            <div className='w-40px rounded-full bg-white overflow-hidden'><img className='h-full w-full object-contain' src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=32`}/>
            </div>
            <span>www.newyorktimes.com</span>
        </div>
        <h3 className='text-3xl'>
        {title}
        </h3>
    </div>
  )
}

export default Article;
