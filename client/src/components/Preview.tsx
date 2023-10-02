import React, {useEffect} from 'react';

interface PreviewProps {
  extract: string | null,
  onClose: () => void;
}

const Preview: React.FC<PreviewProps> = ({extract, onClose}) => {

    const tagsToRemove = ['figure', 'figcaption', 'cite', 'script', 'style'];

    const cleanedExtract = tagsToRemove.reduce((html, tag) => {
      const regex = new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, 'g');
      return html.replace(regex, '');
    }, extract || '');

  useEffect(() => {
    // Disable scrolling on the body element when the component mounts (modal opens)
    document.body.style.overflow = 'hidden';

    // Enable scrolling again when the component unmounts (modal closes)
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className='fixed inset-0 h-full w-full bg-black/70 p-8 z-20' onClick={onClose}>
        <div className='relative flex h-full w-1/2 m-auto bg-stone-100 overflow-hidden rounded-xl' onClick={(e) => e.stopPropagation()}>
            <div className='text-2xl p-8 overflow-scroll no-scrollbar' dangerouslySetInnerHTML={{ __html: cleanedExtract || ''}}/>
        </div>
    </div>
  );
}

export default Preview;
