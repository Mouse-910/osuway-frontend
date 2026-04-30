import React, { useState } from 'react';

const SUGGESTIONS = [
  'Rolex Submariner',
  'ロレックス ブルー文字盤',
  'Omega menos de ¥500,000',
  'montre de luxe vintage',
  'Grand Seiko 自動巻',
  'IWC Portugieser',
];

const styles = {
  section: {
    padding: '2rem',
    borderBottom: '0.5px solid rgba(184,150,62,0.2)',
  },
  wrap: {
    display: 'flex',
    border: '0.5px solid #B8963E',
    borderRadius: '2px',
    overflow: 'hidden',
    background: '#FFFFFF',
  },
  input: {
    flex: 1,
    fontSize: '13px',
    padding: '14px 18px',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: '#1A1814',
    fontFamily: "'DM Mono', monospace",
  },
  btn: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '13px',
    letterSpacing: '0.1em',
    padding: '14px 28px',
    background: '#B8963E',
    color: '#FFFFFF',
    border: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background 0.15s',
  },
  hint: {
    marginTop: '10px',
    fontSize: '10px',
    letterSpacing: '0.08em',
    color: '#6B6560',
  },
  suggestions: {
    marginTop: '12px',
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
};

function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (query.trim()) onSearch(query.trim());
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleSuggestion = (s) => {
    setQuery(s);
    onSearch(s);
  };

  return (
    <section style={styles.section}>
      <div style={styles.wrap}>
        <input
          style={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Search in any language — 日本語でも、en español, em português..."
          disabled={isLoading}
        />
        <button
          style={{
            ...styles.btn,
            background: isLoading ? '#6B6560' : '#B8963E',
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? '...' : 'Search'}
        </button>
      </div>
      <div style={styles.hint}>
        Type in any language — Claude responds automatically in the same language.
      </div>
      <div style={styles.suggestions}>
        {SUGGESTIONS.map((s) => (
          <SuggestionChip key={s} label={s} onClick={() => handleSuggestion(s)} />
        ))}
      </div>
    </section>
  );
}

function SuggestionChip({ label, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: '10px',
        letterSpacing: '0.08em',
        color: hovered ? '#FFFFFF' : '#B8963E',
        border: '0.5px solid rgba(184,150,62,0.2)',
        padding: '5px 12px',
        borderRadius: '2px',
        cursor: 'pointer',
        background: hovered ? '#B8963E' : '#FFFFFF',
        transition: 'all 0.15s',
        userSelect: 'none',
      }}
    >
      {label}
    </span>
  );
}

export default SearchBar;
