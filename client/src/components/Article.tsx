// Set up this component
import React, { useState, useEffect } from 'react';

interface ArticleProps {
  title: string;
}

const Article: React.FC<ArticleProps> = ({title }) => {
  return (
    <div className='p-4 bg-slate-300 rounded-xl' >
        {title}
    </div>
  )
}

export default Article;
