// Set up this component
import React, { useState, useEffect } from 'react';

interface ArticleProps {
  title: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Article: React.FC<ArticleProps> = ({title, onClick}) => {
  return (
    <div className='p-4 bg-slate-300 rounded-xl' onClick={onClick}>
        {title}
    </div>
  )
}

export default Article;
