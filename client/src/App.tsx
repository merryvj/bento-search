import React, { useEffect, useState } from 'react';
import Summary from './components/Summary';
import Article from './components/Article';

interface ApiResponse {
  title: string;
  url: string;
  publishedDate: string;
  author: string | null;
  id: string;
  score: number;
}

const data: ApiResponse[] = [
  {
    title:
      'State of emergency issued for New York as heavy rain and intense floods pummel city – live',
    url: 'https://www.theguardian.com/us-news/live/2023/sep/29/new-york-rain-flash-flooding-weather-live',
    publishedDate: '2023-09-29',
    author: 'Maya Yang',
    id: 'YZHDHVqV10mctWeEdS135g',
    score: 0.1559472233057022,
  },
  {
    title: 'New York City’s not-so-sudden migrant surge, explained',
    url: 'https://www.vox.com/policy/2023/9/26/23875580/new-york-city-migrant-crisis-influx-eric-adams',
    publishedDate: '2023-09-26',
    author: 'Fabiola Cineas',
    id: 'tbtbzbx8Bxbbq3V6xB-5TQ',
    score: 0.15488514304161072,
  },
  {
    title:
      'New York declares state of emergency amid heavy rainfall and flash flooding',
    url: 'https://www.theguardian.com/us-news/2023/sep/29/new-york-flash-flooding-rain-weather-state-emergency-mta',
    publishedDate: '2023-09-29',
    author: 'Gloria Oladipo; Maya Yang',
    id: 'rUdvVSZvyP97NYVN9iAefw',
    score: 0.154513418674469,
  },
  {
    title:
      'New York City reels after flash flooding chaos and powerful downpours',
    url: 'https://www.theguardian.com/us-news/2023/sep/30/new-york-city-flash-flooding-aftermath',
    publishedDate: '2023-09-30',
    author: 'Victoria Bekiempis',
    id: 'A2ePcZiIgytM7eGkjbEqOg',
    score: 0.15387725830078125,
  },
  {
    title:
      'New York City in state of emergency as torrential rain floods subways, roads and basements',
    url: 'https://www.cnn.com/2023/09/29/weather/new-york-city-northeast-rain-flood-forecast-climate-friday/index.html',
    publishedDate: '2023-09-29',
    author: 'Eric Zerkel; Mary Gilbert; Aya Elamroussi',
    id: 'pv6owX4QNk23vYDGxY87xg',
    score: 0.14855387806892395,
  },
  {
    title: 'Why So Many Migrants Are Coming to New York',
    url: 'https://www.newyorker.com/news/q-and-a/why-so-many-migrants-are-coming-to-new-york',
    publishedDate: '2023-09-15',
    author: 'Condé Nast; Isaac Chotiner',
    id: 'sHCq-_830pdfBxWCdgEpgw',
    score: 0.1482926905155182,
  },
  {
    title: 'New York City’s Floods and Torrential Rainfall Explained',
    url: 'https://www.scientificamerican.com/article/new-york-citys-floods-and-torrential-rainfall-explained/',
    publishedDate: '2023-09-29',
    author: 'Andrea Thompson',
    id: 'BZxiZqtM9gFUrT_d1B6o2g',
    score: 0.14476636052131653,
  },
  {
    title: 'Rain Eases, but Officials Warn That Flood Risks Remain',
    url: 'https://www.nytimes.com/live/2023/09/29/nyregion/nyc-rain-flash-flooding',
    publishedDate: '2023-09-29',
    author: 'Michael Wilson; Hurubie Meko',
    id: 'c1A0Sz8I26UIjd0Y5_Xs-w',
    score: 0.1444111317396164,
  },
  {
    title:
      'NYC flooding live updates: Millions at risk of flooding in tri-state area',
    url: 'https://www.nbcnews.com/news/us-news/live-blog/new-york-flooding-live-updates-rcna118055',
    publishedDate: '2023-09-29',
    author: 'NBC News',
    id: 'sGUjE0aoried0IW0uew_rw',
    score: 0.14364264905452728,
  },
  {
    title:
      'One-year-old dies at New York City daycare and three children hospitalized',
    url: 'https://www.theguardian.com/us-news/2023/sep/16/child-daycare-death-new-york-city',
    publishedDate: '2023-09-16',
    author: 'Guardian staff; Agencies',
    id: 'DxZrPty1t_BpJ2dUuwes9A',
    score: 0.14357279241085052,
  },
];
function App() {
  // const [data, setData] = useState<ApiResponse[]>([]);

  const [summary, setSummary] = useState<string>("");

  // useEffect(() => {
  //   fetch('/api')
  //     .then(response => response.json())
  //     .then(data => setData(data.results))
  //     .catch(error => console.log(error));
  // }, []);
  useEffect(() => {
    fetch('/summary')
      .then(response => response.json())
      .then(data => setSummary(data.result))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <Summary summary={summary}>
        {data.map((item: ApiResponse) => (
          <Article key={item.id} title={item.title}/>
        ))}
      </Summary>

    </div>
  );
}

export default App;
