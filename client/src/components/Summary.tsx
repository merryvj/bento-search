import React from 'react';

interface SummaryProps {
  summary: string;
  children: React.ReactNode;
}

const Summary: React.FC<SummaryProps> = ({ summary, children}) => {
  return <div className='text-3xl p-8 m-8 bg-slate-100 rounded-2xl flex flex-col gap-8'>
    {summary}
    {children}
    </div>;
};

export default Summary;