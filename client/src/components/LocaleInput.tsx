import React, { useState, ChangeEvent, FormEvent } from 'react';

interface LocaleInputProps {
  onSubmit: (locale: string) => void;
}

const LocaleInput: React.FC<LocaleInputProps> = ({ onSubmit }) => {
  const [locale, setLocale] = useState("New York City");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocale(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(locale);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={locale} onChange={handleInputChange}
      className="p-4 bg-slate-100 text-lg"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LocaleInput;