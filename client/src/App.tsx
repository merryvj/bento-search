import React, { useEffect, useState } from 'react';
import Summary from './components/Summary';
import Article from './components/Article';
import SearchBar from './components/SearchBar';
import Preview from './components/Preview';
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
  const [search, setSearch] = useState<string>("New York City");
  const [data, setData] = useState<ApiResponse[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [queries, setQueries] = useState<string[]>([]);
  const [previewData, setPreviewData] = useState<string | null>(null);

  useEffect(() => {
    fetchSearchResults();
  }, [search]);

  const fetchSearchResults = async() => {
    fetch('/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city: search })
    })
      .then(response => response.json())
      .then(data => {
        const results = data.results;
        setData(results);
        //fetchContent(results);
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
        //fetchSummary(extracts);
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

  const fetchSimilarResults = async(url:string) => {
    fetch(`/similar?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        const results = data.results;
        setData(results);
      })
      .catch(error => console.log(error));
  }

  const fetchPreviewExtract = async(id:string) => {
    fetch(`/extract?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        const results = data.contents;
        setPreviewData(results[0].extract);
      })
      .catch(error => console.log(error));
  }




  return (
    <div className="App">
      <SearchBar onSubmit={(search) => setSearch(search)}/>
      
      <div className='grid grid-cols-3 gap-8 mt-20'>
      
      {data.map((item: ApiResponse) => (
          <Article key={item.id} title={item.title} url={item.url} handleSimilar={() => fetchSimilarResults(item.url)} handlePreview={() => fetchPreviewExtract(item.id)} />
      ))}
      {previewData && <Preview extract={previewData} onClose={() => setPreviewData(null)} />}
      </div>

    </div>
  );
}

export default App;
