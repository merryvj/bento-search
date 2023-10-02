import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState("New York City");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <nav className='fixed w-full z-10'>
      <form onSubmit={handleSubmit}>
      <div className='flex gap-2 justify-between px-4 py-3 bg-white w-1/4 rounded-lg'>
       <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        <input type="text" value={query} onChange={handleInputChange}
        className="text-lg outline-none bg-transparent font-semibold w-full"
        />
      </div>
    </form>
    </nav>
  );
};

export default SearchBar;