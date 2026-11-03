import { useEffect, useRef, useState } from 'react';
import { MAX_INPUT, previewReply, requestReply } from './chat-api';
import { chatEndpoint } from './config';

export function TwinIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 17 9-9m-3 13 10-10M4 5l1-1m14 2 1-1M2 21l1-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}
function safeHref(raw) {
  if (/^#[a-z0-9-]+$/i.test(raw)) return raw;
  try { const u = new URL(raw); if (['https:', 'mailto:'].includes(u.protocol)) return u.href; } catch { /* Render unsafe links as text. */ }
  return null;
}
function Inline({ text, onNavigate }) {
  return text.split(/(\[[^\]\n]+\]\([^\s)]+\)|\*\*[^*\n]+\*\*|`[^`\n]+`)/g).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) { const href = safeHref(link[2]); return href ? <a key={i} href={href} onClick={() => href.startsWith('#') && onNavigate()} target={href.startsWith('https:') ? '_blank' : undefined} rel="noreferrer">{link[1]}</a> : <span key={i}>{link[1]}</span>; }
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
    return part;
  });
}
export function MessageText({ text, onNavigate }) {
  return text.split(/(```[\s\S]*?```)/g).map((block, i) => {
    if (block.startsWith('```')) return <pre key={i}><code>{block.replace(/^```[^\n]*\n?/, '').replace(/```$/, '')}</code></pre>;
    return block.split(/\n\s*\n/).filter(Boolean).map((paragraph, j) => {
      const lines = paragraph.split('\n');
      if (lines.every(l => /^\s*([-*]|\d+\.)\s/.test(l))) {
        const List = /^\s*\d+\./.test(lines[0]) ? 'ol' : 'ul';
        return <List key={`${i}-${j}`}>{lines.map((l, k) => <li key={k}><Inline text={l.replace(/^\s*([-*]|\d+\.)\s+/, '')} onNavigate={onNavigate}/></li>)}</List>;
      }
      return <p key={`${i}-${j}`}><Inline text={paragraph} onNavigate={onNavigate}/></p>;
    });
  });
}
const sessionKey = `saleh-twin:${chatEndpoint || 'preview'}`;
function loadConversation() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(sessionKey) || '[]');
    return Array.isArray(saved) && saved.length <= 48 && saved.every(m => ['user', 'assistant'].includes(m.role) && typeof m.content === 'string' && m.content.length <= (m.role === 'user' ? MAX_INPUT : 20000)) ? saved : [];
  } catch { return []; }
}
const suggestions = ['Which projects should I explore?', 'How does Baseerah work?', 'Tell me about his experience', 'How can I contact Saleh?'];
export default function Chat({ open, setOpen }) {
  const dialog = useRef(null), input = useRef(null), bottom = useRef(null), scroll = useRef(null);
  const lock = useRef(false), controller = useRef(null), timer = useRef(null), pending = useRef(null), follow = useRef(true);
  const [messages, setMessages] = useState([]), [draft, setDraft] = useState(''), [busy, setBusy] = useState(false), [error, setError] = useState('');
  const [storageReady, setStorageReady] = useState(false);
  const [contactConsent, setContactConsent] = useState(false);
  const endpoint = chatEndpoint;
  const preview = !endpoint;
  useEffect(() => {
    setMessages(loadConversation());
    setStorageReady(true);
  }, []);
  useEffect(() => {
    const node = dialog.current;
    if (open && !node.open) { node.showModal(); input.current?.focus(); }
    else if (!open && node.open) node.close();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  useEffect(() => { if (open && follow.current && (messages.length || busy || error)) bottom.current?.scrollIntoView({ block: 'end', behavior: 'instant' }); else if (open && !messages.length && scroll.current) scroll.current.scrollTop = 0; }, [messages, busy, error, open]);
  useEffect(() => {
    if (!storageReady) return;
    try { if (!messages.length) sessionStorage.removeItem(sessionKey); else if (messages.at(-1).role === 'assistant') sessionStorage.setItem(sessionKey, JSON.stringify(messages.slice(-48))); } catch { /* Chat works in memory if storage is unavailable. */ }
  }, [messages, storageReady]);
  useEffect(() => () => { controller.current?.abort(); clearTimeout(timer.current); }, []);
  useEffect(() => { if (input.current) { input.current.style.height = 'auto'; input.current.style.height = `${Math.min(input.current.scrollHeight, 120)}px`; } }, [draft]);
  const close = () => setOpen(false);
  function reset() {
    controller.current?.abort(); controller.current = null; clearTimeout(timer.current); lock.current = false; pending.current = null;
    setMessages([]); setError(''); setBusy(false); setDraft(''); setContactConsent(false); input.current?.focus();
  }
  async function send(text = draft, retry = false) {
    if (lock.current || (error && !retry) || !text.trim() || text.trim().length > MAX_INPUT) return;
    const content = text.trim();
    const history = retry ? pending.current?.history : [...messages, { role: 'user', content }];
    if (!history) return;
    const id = retry ? pending.current.id : crypto.randomUUID();
    const consent = retry ? pending.current.contactConsent : contactConsent;
    pending.current = { history, id, contactConsent: consent }; follow.current = true; lock.current = true; setBusy(true); setError('');
    if (!retry) { setMessages(history); setDraft(''); }
    const abort = new AbortController(); controller.current = abort;
    let timedOut = false;
    timer.current = setTimeout(() => { timedOut = true; abort.abort(); }, 30000);
    try {
      const reply = preview ? previewReply(content) : await requestReply({ endpoint, development: process.env.NODE_ENV === 'development' || ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname), messages: history, requestId: id, signal: abort.signal, contactConsent: consent });
      if (abort.signal.aborted) return;
      setMessages([...history, { role: 'assistant', content: reply }]); pending.current = null;
    } catch (e) {
      if (timedOut) setError('The assistant took too long to respond. Please retry or email Saleh.');
      else if (!abort.signal.aborted) setError(e instanceof SyntaxError ? 'The assistant returned an unreadable response. Please retry.' : e instanceof TypeError ? 'The assistant is unreachable. Please retry or email Saleh.' : e.message);
    } finally {
      if (controller.current === abort) { clearTimeout(timer.current); controller.current = null; lock.current = false; setBusy(false); }
    }
  }
  return <dialog ref={dialog} className="chat" data-ui aria-labelledby="chat-title" onCancel={e => { e.preventDefault(); close(); }} onClose={close} onClick={e => { if (e.target === dialog.current) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close(); } }}>
    <header className="chat-header"><TwinIcon/><div><h2 id="chat-title">Saleh’s digital twin</h2><p>{preview ? 'Portfolio preview · Not a live AI' : 'AI twin · Powered by DeepSeek'}</p></div><button className="icon-button" onClick={close} aria-label="Close assistant">×</button></header>
    <div className="chat-tools"><span>Ask about the person behind the code.</span><button onClick={reset} disabled={!messages.length && !busy}>New chat</button></div>
    <div className="chat-body" ref={scroll} onScroll={() => { const n = scroll.current; follow.current = n.scrollHeight - n.scrollTop - n.clientHeight < 100; }}>
      {!messages.length && <div className="chat-welcome"><TwinIcon/><h3>A little more context.</h3><p>I’m Saleh’s AI Digital Twin. Ask about his projects, experience or technical background.</p>{preview && <p className="preview-note">You’re exploring curated portfolio answers. The live AI backend is not connected.</p>}<div className="suggestions">{suggestions.map(q => <button key={q} onClick={() => send(q)} disabled={busy}>{q}<span aria-hidden="true">↗</span></button>)}</div></div>}
      <div role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" aria-busy={busy}>{messages.map((message, i) => <article className={`message ${message.role}`} key={i}><span className="message-author">{message.role === 'user' ? 'You' : preview ? 'Portfolio preview' : 'AI digital twin'}</span><MessageText text={message.content} onNavigate={close}/></article>)}</div>
      {busy && <p className="thinking" role="status">Finding the relevant details<span aria-hidden="true">…</span></p>}
      {error && <div className="chat-error" role="alert"><p>{error}</p><button onClick={() => send(pending.current?.history.at(-1).content || '', true)}>Retry answer</button><a href="mailto:salehomair1424@gmail.com">Email Saleh</a></div>}
      <div ref={bottom}/>
    </div>
    <form className="composer" onSubmit={e => { e.preventDefault(); send(); }}><label className="sr-only" htmlFor="chat-input">Your question</label><div className="input-row"><textarea ref={input} id="chat-input" placeholder="Ask about Saleh’s work…" rows="1" maxLength={MAX_INPUT} value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); send(); } }} aria-describedby="chat-help"/><button type="submit" className="send-button" disabled={busy || !draft.trim() || Boolean(error)} aria-label="Send question"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" stroke="currentColor" strokeWidth="1.8"/></svg></button></div><p id="chat-help">{error ? 'Retry the unanswered question or start a new chat.' : `${draft.length}/${MAX_INPUT} · Shift + Enter for a new line`}</p>{!preview && <label className="contact-consent"><input type="checkbox" checked={contactConsent} onChange={e => setContactConsent(e.target.checked)} disabled={busy || Boolean(error)}/>Save my contact details for Saleh if I share them.</label>}</form>
  </dialog>;
}
