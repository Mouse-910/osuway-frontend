import React, { useState } from 'react';

function Results({ state }) {
  const { status, data, error } = state;

  if (status === 'idle') return <EmptyState />;
  if (status === 'loading') return <LoadingState />;
  if (status === 'error') return <ErrorState message={error} />;
  if (status === 'done') return <ResultsView data={data} />;
  return null;
}

function EmptyState() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '64px',
        fontWeight: 300,
        fontStyle: 'italic',
        color: 'rgba(184,150,62,0.2)',
        marginBottom: '1rem',
      }}>◎</div>
      <div style={{
        fontSize: '11px',
        letterSpacing: '0.15em',
        color: '#6B6560',
        textTransform: 'uppercase',
      }}>
        Search across Japanese luxury watch retailers
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '4px' }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{
            display: 'inline-block',
            width: '5px',
            height: '5px',
            background: '#B8963E',
            borderRadius: '50%',
            animation: 'pulse 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }} />
        ))}
      </div>
      <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#6B6560' }}>
        SEARCHING INVENTORY
      </span>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div style={{ padding: '1.5rem 2rem' }}>
      <div style={{
        fontSize: '12px',
        color: '#A32D2D',
        padding: '1rem',
        border: '0.5px solid rgba(240,149,149,0.5)',
        borderRadius: '2px',
        background: 'rgba(252,235,235,0.8)',
      }}>
        Error: {message}
      </div>
    </div>
  );
}

function ResultsView({ data }) {
  const toolInfo = data.tool_calls > 0
    ? `AI · ${data.tool_calls} TOOL CALL${data.tool_calls > 1 ? 'S' : ''} · `
    : '';

  return (
    <div style={{ padding: '1.5rem 2rem', animation: 'fadeIn 0.3s ease' }}>
      <div style={{
        fontSize: '10px',
        letterSpacing: '0.12em',
        color: '#6B6560',
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span>{toolInfo}{data.total_matches} RESULTS · {(data.duration_ms / 1000).toFixed(1)}s</span>
        <span style={{ color: '#B8963E', fontSize: '9px', letterSpacing: '0.15em' }}>
          AGENTIC RAG v3
        </span>
      </div>

      {data.formatted && (
        <div style={{
          background: '#FFFFFF',
          border: '0.5px solid rgba(184,150,62,0.2)',
          borderRadius: '2px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          fontSize: '13px',
          lineHeight: '1.8',
          color: '#1A1814',
          whiteSpace: 'pre-wrap',
        }}>
          {data.formatted}
        </div>
      )}

      {data.results && data.results.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {data.results.slice(0, 20).map((watch) => (
            <WatchCard key={watch.id} watch={watch} />
          ))}
        </div>
      )}
    </div>
  );
}

function WatchCard({ watch }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const price = watch.price_jpy
    ? '¥' + Number(watch.price_jpy).toLocaleString('ja-JP')
    : '—';

  const url = watch.product_url
    ? (watch.product_url.startsWith('http')
        ? watch.product_url
        : `${watch.store_url}/products/${watch.product_url}`)
    : (watch.store_url || '#');

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFFFFF',
        border: `0.5px solid ${hovered ? '#B8963E' : 'rgba(184,150,62,0.2)'}`,
        borderRadius: '2px',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      {watch.image_url && !imgError ? (
        <img
          src={watch.image_url}
          alt={watch.title || ''}
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            height: '160px',
            objectFit: 'contain',
            background: '#F9F7F4',
            padding: '12px',
            display: 'block',
          }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '160px',
          background: '#F9F7F4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '36px',
          color: 'rgba(184,150,62,0.2)',
        }}>◎</div>
      )}

      <div style={{
        padding: '1rem',
        borderTop: '0.5px solid rgba(184,150,62,0.2)',
      }}>
        <div style={{
          fontSize: '9px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#B8963E',
          marginBottom: '4px',
        }}>
          {watch.brand || 'Watch'}
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '15px',
          color: '#1A1814',
          marginBottom: '8px',
          lineHeight: '1.4',
        }}>
          {watch.title || '—'}
        </div>
        {watch.reference_number && (
          <div style={{
            fontSize: '9px',
            color: '#6B6560',
            marginBottom: '10px',
            fontFamily: "'DM Mono', monospace",
          }}>
            Ref. {watch.reference_number}
          </div>
        )}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}>
          <div style={{ fontSize: '14px', color: '#1A1814' }}>{price}</div>
          <div style={{ fontSize: '9px', letterSpacing: '0.1em', color: '#6B6560', textTransform: 'uppercase' }}>
            {watch.store_name || ''}
          </div>
        </div>
        <LinkButton href={url} />
      </div>
    </div>
  );
}

function LinkButton({ href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        textAlign: 'center',
        fontSize: '10px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: hovered ? '#FFFFFF' : '#B8963E',
        border: '0.5px solid rgba(184,150,62,0.2)',
        padding: '7px',
        borderRadius: '2px',
        background: hovered ? '#B8963E' : 'transparent',
        transition: 'all 0.15s',
      }}
    >
      View at retailer →
    </a>
  );
}

export default Results;
