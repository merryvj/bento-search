import React, { useEffect, useState } from 'react';
import Summary from './components/Summary';
import Article from './components/Article';
import LocaleInput from './components/LocaleInput';
import './App.css';

interface ApiResponse {
  title: string;
  url: string;
  publishedDate: string;
  author: string | null;
  id: string;
  score: number;
}

function App() {
  const [locale, setLocale] = useState<string>("New York City");
  const [data, setData] = useState<ApiResponse[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [queries, setQueries] = useState<string[]>([]);

  useEffect(() => {
    fetchSearchResults();
  }, [locale]);

  const fetchSearchResults = async() => {
    fetch('/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city: locale })
    })
      .then(response => response.json())
      .then(data => {
        const results = data.results;
        setData(results);
        fetchContent(results);
      })
      .catch(error => console.log(error));
  }

  const fetchSummary = async(extracts:string[]) => {
    fetch('/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: extracts })
    })
      .then(response => response.json())
      .then(data => {
        setSummary(data);
        fetchSuggestedQueries(data);
      })
      .catch(error => console.log(error));
  };

  const fetchContent = async(results:ApiResponse[]) => {
    const ids = results.map((item: ApiResponse) => item.id);
    fetch('/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: ids })
    })
      .then(response => response.json())
      .then(data => {
        const extracts = data.contents.map((item: { extract: string }) => item.extract);
        fetchSummary(extracts);
      })
      .catch(error => console.log(error));
  };

  const fetchSuggestedQueries = async(extract:string) => {
    fetch('/suggested', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({content: extract})
    })
      .then(response => response.json())
      .then(data => {
        setQueries(data);
      })
      .catch(error => console.log(error));
  };


  return (
    <div className="App">
      <LocaleInput onSubmit={(locale) => setLocale(locale)}/>
      
      <Summary summary={summary}>
        <div className='flex gap-4'>
          {queries.length > 0 && queries.map((query: string) => (
            <div className='p-4 bg-slate-300 rounded-3xl'>{query}</div>
          ))}
        </div>
        {data.map((item: ApiResponse) => (
          <Article key={item.id} title={item.title} url={item.url}/>
        ))}
      </Summary>

    </div>
  );
}

export default App;
