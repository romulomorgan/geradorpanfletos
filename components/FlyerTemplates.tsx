
import React from 'react';
import { FlyerData } from '../types';

interface TemplateProps {
  data: FlyerData;
  id: string;
  seed: number;
}

const getDesignSystem = (seed: number, index: number) => {
  const systems = [
    { name: 'Cosmos', main: '#fbbf24', accent: '#38bdf8', bg: '#020617' },
    { name: 'Energetic', main: '#22d3ee', accent: '#a855f7', bg: '#080111' },
    { name: 'Institutional', main: '#ffffff', accent: '#94a3b8', bg: '#0f172a' },
    { name: 'Impact', main: '#ef4444', accent: '#fbbf24', bg: '#000000' }
  ];
  const sysIndex = Math.floor((seed * 10 + index) % systems.length);
  return systems[sysIndex];
};

const AutoFitTitle: React.FC<{ text: string; color?: string; shadow?: string; className?: string }> = ({ text, color = "white", shadow, className }) => {
  const cleanText = text.toUpperCase().replace(/\n/g, ' ').trim();
  return (
    <div className={`w-full h-24 flex items-center justify-center overflow-hidden ${className}`}>
      <svg viewBox="0 0 500 120" preserveAspectRatio="xMidYMid meet" className="w-full h-full px-4">
        <defs>
          {shadow && (
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          )}
        </defs>
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill={color}
          textLength="460" 
          lengthAdjust="spacingAndGlyphs"
          style={{ 
            fontFamily: "'Montserrat', sans-serif", 
            fontWeight: 900,
            filter: shadow ? 'url(#glowEffect)' : 'none',
            fontSize: '100px'
          }}
          className="italic"
        >
          {cleanText}
        </text>
      </svg>
    </div>
  );
};

const LogoProcessor: React.FC<{ src: string | null }> = ({ src }) => (
  <div className="h-16 w-full flex justify-center items-center mb-4">
    {src ? (
      <img src={src} className="max-h-full max-w-[70%] object-contain mix-blend-lighten" />
    ) : (
      <div className="w-16 h-0.5 bg-white/10" />
    )}
  </div>
);

const QRCodeProcessor: React.FC<{ src: string | null; color?: string }> = ({ src, color = "white" }) => {
  if (!src) return null;
  return (
    <div className="p-1 bg-white rounded-md shrink-0 ml-4">
      <img src={src} className="w-12 h-12 object-contain" style={{ mixBlendMode: 'multiply' }} />
    </div>
  );
};

export const CosmosTemplate: React.FC<TemplateProps> = ({ data, id, seed }) => {
  const ds = getDesignSystem(seed, 0);
  return (
    <div id={id} className="relative w-[400px] h-[560px] bg-black overflow-hidden flex flex-col p-8 border border-white/5"
         style={{ background: `radial-gradient(circle at 50% 10%, ${ds.main}33, ${ds.bg} 85%)` }}>
      <LogoProcessor src={data.logo} />
      <div className="flex-1 flex flex-col items-center justify-start text-center pt-4">
        <span className="text-[8px] tracking-[1em] text-white/40 uppercase mb-4 font-black">EXCLUSIVO</span>
        <AutoFitTitle text={data.title} shadow={ds.main} color="white" />
        <div className="h-0.5 w-12 bg-white/30 my-6 shadow-[0_0_10px_white]" />
        <p className="text-[11px] uppercase tracking-[0.25em] font-black max-w-[90%] italic leading-tight" style={{ color: ds.main }}>
          {data.subtitle}
        </p>
      </div>
      <div className="mt-auto space-y-4">
        <div className="bg-white/5 border border-white/10 py-3 rounded-xl text-center backdrop-blur-sm">
          <span className="text-[12px] font-black text-white tracking-[0.4em] uppercase italic px-2 block">{data.date}</span>
        </div>
        <div className="bg-black/60 p-5 rounded-2xl border border-white/10 flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <span className="text-[8px] text-white/40 uppercase block font-bold mb-1 italic">LOCAL</span>
            <span className="text-[10px] font-black text-white block uppercase italic leading-tight break-words">{data.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[24px] font-black italic text-white leading-none whitespace-nowrap">{data.price}</span>
            </div>
            <QRCodeProcessor src={data.qrCode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const EnergeticTemplate: React.FC<TemplateProps> = ({ data, id, seed }) => {
  const ds = getDesignSystem(seed, 1);
  return (
    <div id={id} className="relative w-[400px] h-[560px] bg-[#02010a] overflow-hidden flex flex-col p-10 border-t-[12px]"
         style={{ borderColor: ds.main }}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(${ds.main} 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />
      <LogoProcessor src={data.logo} />
      <div className="z-10 flex-1 flex flex-col items-center justify-center text-center">
        <AutoFitTitle text={data.title} color="white" className="drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        <div className="h-1.5 w-16 mx-auto my-8 bg-white" />
        <p className="text-white text-[12px] font-black uppercase tracking-[0.35em] italic px-4">{data.subtitle}</p>
      </div>
      <div className="z-10 mt-auto flex items-end justify-between border-b-2 border-white/20 pb-6 gap-3">
        <div className="flex-1 min-w-0">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] mb-1 block" style={{ color: ds.main }}>CONFIRMAÇÃO</span>
          <span className="text-[10px] font-black text-white uppercase block leading-tight break-words">{data.location}</span>
          <span className="text-[14px] font-black text-white mt-2 block italic tracking-wider">{data.date}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-4xl font-black text-white tracking-tighter italic leading-none whitespace-nowrap">{data.price}</span>
          </div>
          <QRCodeProcessor src={data.qrCode} />
        </div>
      </div>
    </div>
  );
};

export const InstitutionalTemplate: React.FC<TemplateProps> = ({ data, id, seed }) => {
  const ds = getDesignSystem(seed, 2);
  return (
    <div id={id} className="relative w-[400px] h-[560px] bg-white overflow-hidden flex flex-col p-12 text-black">
      <div className="absolute left-0 top-0 w-4 h-full bg-black" />
      <div className="flex justify-start mb-10"><LogoProcessor src={data.logo} /></div>
      <div className="flex-1">
        <AutoFitTitle text={data.title} color="black" />
        <div className="w-14 h-2 bg-black my-8" />
        <p className="text-black text-[13px] font-black leading-snug uppercase tracking-widest border-l-4 border-black pl-5 italic">
          {data.subtitle}
        </p>
      </div>
      <div className="mt-auto grid grid-cols-2 gap-6 pt-10 border-t-2 border-black/5">
        <div>
          <span className="text-[9px] font-black text-black/30 uppercase block mb-1 italic">DATA E HORA</span>
          <span className="text-[11px] font-black uppercase tracking-tighter whitespace-normal">{data.date}</span>
        </div>
        <div>
          <span className="text-[9px] font-black text-black/30 uppercase block mb-1 italic">LOCALIZAÇÃO</span>
          <span className="text-[11px] font-black uppercase block leading-tight break-words">{data.location}</span>
        </div>
        <div className="col-span-2 mt-6 flex justify-between items-center gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black italic tracking-tighter whitespace-nowrap">{data.price}</span>
            <span className="text-[10px] font-black text-black/40 uppercase">{data.contact}</span>
          </div>
          <QRCodeProcessor src={data.qrCode} />
        </div>
      </div>
    </div>
  );
};

export const ImpactTemplate: React.FC<TemplateProps> = ({ data, id, seed }) => {
  const ds = getDesignSystem(seed, 3);
  return (
    <div id={id} className="relative w-[400px] h-[560px] bg-black overflow-hidden flex flex-col">
      <div className="bg-white text-black p-10 flex flex-col h-[280px] justify-center items-center">
        <AutoFitTitle text={data.title} color="black" />
        <div className="mt-6"><LogoProcessor src={data.logo} /></div>
      </div>
      <div className="p-10 flex-1 flex flex-col text-white" style={{ backgroundColor: ds.bg }}>
        <p className="text-[15px] font-black uppercase mb-8 leading-none italic" style={{ color: ds.main }}>{data.subtitle}</p>
        <div className="mt-auto space-y-6">
          <div className="flex justify-between items-end border-b-4 border-white pb-3 gap-4">
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-black uppercase block tracking-tighter italic whitespace-normal">{data.date}</span>
              <span className="text-[9px] text-white/50 uppercase block font-bold leading-tight break-words">{data.location}</span>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black italic tracking-tighter leading-none whitespace-nowrap" style={{ color: ds.main }}>{data.price}</span>
              <QRCodeProcessor src={data.qrCode} />
            </div>
          </div>
          <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">{data.contact}</p>
        </div>
      </div>
    </div>
  );
};
