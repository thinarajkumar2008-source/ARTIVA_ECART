import React from 'react';
import { Palette, Sparkles } from 'lucide-react';

const SceneFallback = ({ title = "Artisan Studio View", subtitle = "3D Graphics Fallback Mode" }) => {
  return (
    <div 
      className="scene-fallback-container"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '340px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, rgba(108, 43, 217, 0.08) 0%, rgba(255, 107, 154, 0.05) 100%)',
        borderRadius: '24px',
        border: '1px solid #EFE7E2',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem',
        textAlign: 'center'
      }}
    >
      <div 
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #6C2BD9 0%, #FF6B9A 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(108, 43, 217, 0.25)',
          marginBottom: '1rem'
        }}
      >
        <Palette size={34} />
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#27213C', marginBottom: '0.35rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.88rem', color: '#777386', maxWidth: '340px' }}>
        {subtitle}
      </p>

      {/* Decorative floating paint dots */}
      <div style={{ position: 'absolute', top: '15%', left: '15%', width: '12px', height: '12px', borderRadius: '50%', background: '#FFD166', opacity: 0.8 }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: '16px', height: '16px', borderRadius: '50%', background: '#8BE0C4', opacity: 0.8 }} />
      <div style={{ position: 'absolute', top: '25%', right: '25%', width: '10px', height: '10px', borderRadius: '50%', background: '#FF8264', opacity: 0.8 }} />
    </div>
  );
};

export default SceneFallback;
