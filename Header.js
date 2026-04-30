import React from 'react';

const LANG_LABELS = {
  en: 'ENGLISH', ja: '日本語', es: 'ESPAÑOL',
  pt: 'PORTUGUÊS', fr: 'FRANÇAIS', zh: '中文',
};

const styles = {
  header: {
    padding: '2.5rem 2rem 1.5rem',
    borderBottom: '0.5px solid rgba(184,150,62,0.2)',
    display: 'flex',
    alignItems: 'baseline',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    fontSize: '28px',
    letterSpacing: '0.15em',
    color: '#1A1814',
  },
  logoAccent: {
    color: '#B8963E',
  },
  tagline: {
    fontSize: '10px',
    letterSpacing: '0.2em',
    color: '#6B6560',
    textTransform: 'uppercase',
  },
  langBadge: {
    marginLeft: 'auto',
    fontSize: '9px',
    letterSpacing: '0.15em',
    color: '#B8963E',
    border: '0.5px solid rgba(184,150,62,0.2)',
    padding: '4px 10px',
    borderRadius: '2px',
    background: '#FFFFFF',
    transition: 'all 0.3s',
    fontFamily: "'DM Mono', monospace",
  },
};

function Header({ detectedLang }) {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        OSU<span style={styles.logoAccent}>WAY</span>
      </div>
      <div style={styles.tagline}>Japanese Luxury Watch Search</div>
      <div style={styles.langBadge}>
        {detectedLang ? LANG_LABELS[detectedLang] || detectedLang.toUpperCase() : 'AUTO DETECT'}
      </div>
    </header>
  );
}

export default Header;
