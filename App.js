import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Results from './components/Results';

const EDGE_URL = process.env.REACT_APP_EDGE_FUNCTION_URL ||
  'https://kvxzaehzxfrrafawqpwo.supabase.co/functions/v1/search-watches';

function App() {
  const [state, setState] = useState({
    status: 'idle', // idle | loading | done | error
    data: null,
    error: null,
    detectedLang: null,
  });

  const search = useCallback(async (query) => {
    if (!query.trim()) return;

    setState({ status: 'loading', data: null, error: null, detectedLang: null });

    try {
      const res = await fetch(EDGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Search failed');

      setState({
        status: 'done',
        data,
        error: null,
        detectedLang: data.detected_lang || null,
      });
    } catch (err) {
      setState({
        status: 'error',
        data: null,
        error: err.message,
        detectedLang: null,
      });
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header detectedLang={state.detectedLang} />
      <SearchBar onSearch={search} isLoading={state.status === 'loading'} />
      <Results state={state} />
    </div>
  );
}

export default App;
