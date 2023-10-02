// Set up this component
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

interface ArticleProps {
  title: string;
  url: string
}


const Article: React.FC<ArticleProps> = ({title, url}) => {

    const [screenshot, setScreenshot] = useState<any>(null);

    useEffect(() => {
        captureScreenshot();
    })
    const captureScreenshot = async () => {
        try {
          const response = await axios.get(`/capture?url=${encodeURIComponent(url)}`, {
            responseType: 'arraybuffer',
          });
    
          const data = new Uint8Array(response.data);
          const blob = new Blob([data], { type: 'image/png' });
          const imageUrl = URL.createObjectURL(blob);
    
          setScreenshot(imageUrl);
        } catch (error) {
          console.error('Error capturing screenshot:', error);
        }
      };

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
        <img src={screenshot}/>
    </div>
  )
}

export default Article;
