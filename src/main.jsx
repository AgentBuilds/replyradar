import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const sample = [
  { time: '09:12', text: 'Thanks for sharing this perspective.', target: 'Thread A', note: 'First reply in the sample' },
  { time: '09:14', text: 'Thanks for sharing this perspective.', target: 'Thread A', note: 'Same phrase · 2 minutes later' },
  { time: '09:18', text: 'Is there a source for the original claim?', target: 'Thread B', note: 'Different phrase · 4 minutes later' },
];

function App() {
  const [status, setStatus] = useState('loading');
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    setStatus('loading');
    fetch('/api/health', { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error('API unavailable');
        const data = await response.json();
        if (data.status !== 'ok') throw new Error('Invalid health response');
        setStatus('ready');
      })
      .catch(() => { if (controller.signal.reason?.message !== 'cleanup') setStatus('error'); })
      .finally(() => clearTimeout(timeout));
    return () => { clearTimeout(timeout); controller.abort(new Error('cleanup')); };
  }, [revision]);

  return <>
    <a className="skip-link" href="#workspace">Skip to evidence</a>
    <header className="topbar">
      <a className="brand" href="/" aria-label="ReplyRadar home"><span className="brand-mark" aria-hidden="true">R<span /></span>ReplyRadar</a>
      <span className="badge">Read-only workspace</span>
    </header>
    <main id="workspace">
      <div className="intro"><div><p className="eyebrow">COMMUNITY INTELLIGENCE / SAMPLE BOARD</p><h1>Follow the evidence.</h1><p className="lede">Look closer at reply behavior. Keep context in view.</p></div><span className="edition">WORKSPACE 001<br />SCAFFOLD PREVIEW</span></div>
      <section className="notice" aria-label="Sample data notice"><span className="notice-icon" aria-hidden="true">i</span><p><strong>A safe place to start.</strong> This board contains synthetic examples, not live Bluesky posts. Behavioral patterns are prompts for investigation, never proof of automation.</p></section>
      <div className="board">
        <section className="timeline" aria-labelledby="timeline-title">
          <div className="section-heading"><div><p className="eyebrow">01 / EVIDENCE</p><h2 id="timeline-title">Reply timeline</h2></div><span className="badge">Synthetic sample</span></div>
          <p className="section-description">Three example replies, arranged in time. No account is being assessed.</p>
          {sample.length ? <ol className="events">{sample.map((reply, index) => <li key={reply.time}>
            <div className="time"><span className="dot" aria-hidden="true" /><time dateTime={`2026-10-01T${reply.time}:00Z`}>{reply.time}</time><span>UTC</span></div>
            <article><div className="reply-meta"><span>Sample reply {String(index + 1).padStart(2, '0')}</span><span>{reply.target}</span></div><p className="reply-text">“{reply.text}”</p><p className="reply-note">{reply.note}</p></article>
          </li>)}</ol> : <p className="empty">No sample replies available.</p>}
          <div className="timeline-footer">EXAMPLE WINDOW <span>01 OCT 2026 · 09:12–09:18 UTC</span></div>
        </section>
        <aside className="context" aria-labelledby="context-title"><p className="eyebrow">02 / READING THE SIGNALS</p><h2 id="context-title">Patterns need context.</h2>
          <dl><div><dt>Posting intervals</dt><dd>Compare the gaps between replies. Regular timing can have many explanations.</dd></div><div><dt>Repeated phrases</dt><dd>Notice shared wording. Repetition alone does not establish automated behavior.</dd></div><div><dt>Reply concentration</dt><dd>See which threads receive attention, and consider the surrounding conversation.</dd></div></dl>
          <p className="scope-note">Signal computation and public post import will arrive in later MVP tasks.</p>
        </aside>
      </div>
      <section className="connection" aria-labelledby="connection-title"><div><h2 id="connection-title">Workspace connection</h2><p role="status" aria-live="polite">{status === 'loading' ? 'Checking the local API…' : status === 'ready' ? 'API connected · Read-only mode' : 'API unavailable. Check the server and try again.'}</p></div><button type="button" disabled={status === 'loading'} onClick={() => setRevision(value => value + 1)}>{status === 'loading' ? 'Checking…' : status === 'error' ? 'Retry connection' : 'Check connection'}<span aria-hidden="true"> ↗</span></button></section>
    </main><footer className="page-footer"><span>ReplyRadar / Evidence, with care.</span><span>Local preview · v0.1.0</span></footer>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
