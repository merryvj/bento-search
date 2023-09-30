import React from 'react';

interface SummaryProps {
  summary: string;
}

const Summary: React.FC<SummaryProps> = ({ summary }) => {
  return <div className='text-3xl p-4 m-8 bg-slate-100 rounded-2xl'>
    {summary}
    </div>;
};

export default Summary;