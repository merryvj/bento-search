import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ArticleProps {
  title: string;
  url: string,
  handleSimilar: (event: React.MouseEvent<HTMLButtonElement>) => void;  
  handlePreview: (event: React.MouseEvent<HTMLButtonElement>) => void;  
}

const Article: React.FC<ArticleProps> = ({title, url, handleSimilar, handlePreview}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [screenshot, setScreenshot] = useState<any>(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // New state variable for loading

    const domain = new URL(url).hostname.replace(/^www\./, '');

    useEffect(() => {
        captureScreenshot();
    }, []);
    

    const captureScreenshot = async () => {
        setIsLoading(true); // Set loading to true before starting the request
        try {
          const response = await axios.get(`/capture?url=${encodeURIComponent(url)}`, {
            responseType: 'arraybuffer',
          });
    
          const data = new Uint8Array(response.data);
          const blob = new Blob([data], { type: 'image/png' });
          const imageUrl = URL.createObjectURL(blob);
    
          setScreenshot(imageUrl);
          setImageLoaded(true);
        } catch (error) {
          console.error('Error capturing screenshot:', error);
        } finally {
          setIsLoading(false); // Set loading to false after the request is done
        }
      };

  return (
    <div className='flex flex-col gap-3'>
        <div className='relative rounded-md overflow-hidden' 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
          <div className='relative bg-stone-300 h-80'>
            {isLoading ? (
              <div className='absolute inset-0'></div> // Replace this with your loading placeholder
            ) : imageLoaded && (
              <img
                className='rounded-md'
                src={screenshot}
                alt='screenshot of the website'
              />
            )}
            </div>

            <div className='absolute inset-0 p-4 bg-gradient-to-t from-black/75 flex flex-col justify-between transition-opacity duration-300' 
                style={{opacity: (isHovered || isLoading) ? 1 : 0}}>
                <div className='flex justify-between transition-opacity duration-300' style={{opacity: isHovered ? 1 : 0}}>
                    <div className='flex gap-2'>
                        <button className='px-4 py-2 bg-stone-100 rounded-full font-semibold' onClick={handleSimilar}>Find similar</button>
                        <button className='px-4 py-2 bg-stone-100 rounded-full font-semibold' onClick={handlePreview}>Preview</button>
                    </div>
                    <a className='px-3 py-2 bg-stone-100 rounded-full font-semibold' href={url} target="_blank" rel="noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </a>   
                </div>

                <div className='text-white text-xl font-semibold'>{title}</div>
            </div>

          </div>
          <div>
          <div className='flex gap-3'>
              <div className='w-28px rounded-full bg-white overflow-hidden'><img className='h-full w-full object-contain' src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=32`}/>
              </div>
              <h4 className='text-xl font-semibold'>{domain}</h4>
          </div>
          </div>
      </div>
    )
  }

export default Article;