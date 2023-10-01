import React, { useState, useEffect } from 'react';

interface SummaryProps {
  summary: string;
  children: React.ReactNode;
}

const Summary: React.FC<SummaryProps> = ({ summary, children}) => {
    const [text, setText] = useState<string>("");

    useEffect(() => {
        setText(summary);
    }, [summary])
    
  return <div className='text-3xl p-8 m-8 bg-slate-100 rounded-2xl flex flex-col gap-8'>
    {text}
    {children}
    </div>;
};

export default Summary;