'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<'따뜻하게' | '담백하게' | '명료하게'>('따뜻하게');
  const [length, setLength] = useState<'짧게' | '보통' | '길게'>('보통');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const run = async () => {
    if (!prompt.trim()) return alert('사연을 입력해 주세요!');
    setLoading(true);
    setResult('');
    setError('');

    try {
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `
사용자 사연: """${prompt}"""
톤: ${style}
길이: ${length}
출력: 독자가 공감하기 쉬운 한국어 문장으로 리라이팅
`
        })
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(`API 오류 (${res.status}) ${t}`);
      }
      const data = await res.json();
      // 응답 형태에 맞춰 출력 (당신의 route.ts에서 반환하는 필드명에 맞게 조정)
      setResult(data?.text || data?.result || JSON.stringify(data, null, 2));
    } catch (e: any) {
      setError(e?.message || '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{maxWidth: 820, margin: '40px auto', padding: '0 20px', fontFamily: 'system-ui, Apple SD Gothic Neo, sans-serif'}}>
      <h1 style={{fontSize: 36, fontWeight: 800, marginBottom: 8}}>시니어 스토리 리라이팅 앱</h1>
      <p style={{color:'#aaa', marginBottom: 24}}>AI가 당신의 사연을 따뜻하고 명료하게 다듬어 드립니다.</p>

      <label style={{fontWeight:700}}>사연</label>
      <textarea
        value={prompt}
        onChange={e=>setPrompt(e.target.value)}
        placeholder="사연을 붙여넣고 리라이팅을 실행해 보세요."
        rows={10}
        style={{width:'100%', padding:12, borderRadius:8, border:'1px solid #333', marginTop:8}}
      />

      <div style={{display:'flex', gap:12, marginTop:12, flexWrap:'wrap'}}>
        <div>
          <div style={{fontWeight:700, marginBottom:6}}>톤</div>
          <select value={style} onChange={e=>setStyle(e.target.value as any)} style={{padding:'8px 10px', borderRadius:8, background:'#111', border:'1px solid #333'}}>
            <option value="따뜻하게">따뜻하게</option>
            <option value="담백하게">담백하게</option>
            <option value="명료하게">명료하게</option>
          </select>
        </div>
        <div>
          <div style={{fontWeight:700, marginBottom:6}}>길이</div>
          <select value={length} onChange={e=>setLength(e.target.value as any)} style={{padding:'8px 10px', borderRadius:8, background:'#111', border:'1px solid #333'}}>
            <option value="짧게">짧게</option>
            <option value="보통">보통</option>
            <option value="길게">길게</option>
          </select>
        </div>
      </div>

      <button
        onClick={run}
        disabled={loading}
        style={{
          marginTop:16, padding:'12px 16px', borderRadius:10, background:'#fff', color:'#000',
          fontWeight:800, border:'none', cursor:'pointer', opacity: loading?0.7:1
        }}
      >
        {loading ? '리라이팅 중…' : '리라이팅 실행'}
      </button>

      {error && (
        <div style={{marginTop:16, color:'#ff6b6b', whiteSpace:'pre-wrap'}}>
          ⚠️ {error}
        </div>
      )}

      {result && (
        <div style={{marginTop:20}}>
          <div style={{fontWeight:700, marginBottom:8}}>결과</div>
          <div style={{whiteSpace:'pre-wrap', background:'#0b0b0b', border:'1px solid #333', padding:16, borderRadius:12, lineHeight:1.7}}>
            {result}
          </div>
        </div>
      )}
    </main>
  );
}
