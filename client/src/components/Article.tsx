import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ArticleProps {
  title: string;
  url: string
}

const Article: React.FC<ArticleProps> = ({title, url}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [screenshot, setScreenshot] = useState<any>(null);
    const [imageLoaded, setImageLoaded] = useState(true);
    const [isLoading, setIsLoading] = useState(false); // New state variable for loading

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
    <div className='flex flex-col gap-3' >
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

            <div className='absolute inset-0 p-8 bg-gradient-to-t from-black/75 flex items-end transition-opacity duration-300' 
                style={{opacity: (isHovered || isLoading) ? 1 : 0}}>
                <div className='text-white text-xl'>{title}</div>
            </div>

          </div>
          <div className='flex gap-3'>
              <div className='w-28px rounded-full bg-white overflow-hidden'><img className='h-full w-full object-contain' src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=32`}/>
              </div>
              <h4 className='text-xl font-semibold'>{domain}</h4>
          </div>
      </div>
    )
  }

export default Article;