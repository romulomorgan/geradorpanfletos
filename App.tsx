
import React, { useState } from 'react';
import { FlyerData } from './types';
import { CosmosTemplate, EnergeticTemplate, InstitutionalTemplate, ImpactTemplate } from './components/FlyerTemplates';

const App: React.FC = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [designSeed, setDesignSeed] = useState(0.5);
  const [data, setData] = useState<FlyerData>({
    title: 'MAGNETISMO',
    subtitle: 'TEORIA E PRÁTICA: ALIVIE SUAS DORES E RESTAURE SUA ENERGIA VITAL',
    date: '09 DE AGOSTO • 19:00',
    location: 'AUDITÓRIO CENTRAL, CAMPINA GRANDE',
    details: 'CONTEÚDO EXCLUSIVO PARA PROFISSIONAIS',
    price: 'R$ 60,00',
    contact: 'WHATSAPP: (83) 9999-9999',
    logo: null,
    qrCode: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value.toUpperCase() }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'qrCode') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateModels = () => {
    setIsGenerating(true);
    setIsGenerated(false);
    // Inova o design a cada clique usando uma nova semente aleatória
    setDesignSeed(Math.random());
    
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const downloadArt = async (id: string, name: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    try {
      // @ts-ignore
      const canvas = await html2canvas(element, { 
        scale: 4, 
        backgroundColor: null,
        useCORS: true,
        logging: false 
      });
      const link = document.createElement('a');
      link.download = `FLYER-${name}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      alert("Erro na exportação. Verifique se as imagens carregaram corretamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#020617] text-slate-400 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Sidebar de Controle */}
      <aside className="w-full lg:w-[420px] bg-[#050811] border-r border-white/5 p-8 overflow-y-auto max-h-screen scrollbar-hide">
        <header className="mb-10 border-b border-white/5 pb-6">
           <h1 className="text-2xl font-black text-white tracking-tighter italic">FLYER<span className="text-emerald-500">GENIUS</span></h1>
           <p className="text-[9px] uppercase tracking-[0.4em] text-white/20">Design Generativo v3.0</p>
        </header>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <label className="flex flex-col items-center justify-center h-24 border border-white/5 rounded-2xl bg-white/[0.02] cursor-pointer hover:bg-white/5 transition-all group">
                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'logo')} />
                <span className="text-[8px] font-black uppercase text-white/40 tracking-widest group-hover:text-emerald-500">{data.logo ? "LOGO OK" : "SUBIR LOGO"}</span>
             </label>
             <label className="flex flex-col items-center justify-center h-24 border border-white/5 rounded-2xl bg-white/[0.02] cursor-pointer hover:bg-white/5 transition-all group">
                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'qrCode')} />
                <span className="text-[8px] font-black uppercase text-white/40 tracking-widest group-hover:text-emerald-500">{data.qrCode ? "QR OK" : "QR CODE"}</span>
             </label>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase text-white/20 tracking-widest pl-2">Título do Evento</label>
              <input name="title" value={data.title} onChange={handleInputChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white outline-none focus:border-emerald-500/50 transition-all font-bold text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase text-white/20 tracking-widest pl-2">Subtítulo Artístico</label>
              <textarea name="subtitle" value={data.subtitle} onChange={handleInputChange} rows={2} className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-xs outline-none focus:border-emerald-500/50" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase text-white/20 tracking-widest pl-2">Data / Hora</label>
              <input name="date" value={data.date} onChange={handleInputChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-[10px] font-bold" />
            </div>
            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase text-white/20 tracking-widest pl-2">Investimento</label>
              <input name="price" value={data.price} onChange={handleInputChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-[10px] font-bold" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[8px] font-black uppercase text-white/20 tracking-widest pl-2">Local</label>
            <input name="location" value={data.location} onChange={handleInputChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-[10px]" />
          </div>

          <div className="space-y-1">
            <label className="text-[8px] font-black uppercase text-white/20 tracking-widest pl-2">Contato</label>
            <input name="contact" value={data.contact} onChange={handleInputChange} className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-[10px]" />
          </div>

          <button 
            onClick={generateModels}
            disabled={isGenerating}
            className="w-full py-5 bg-emerald-600 text-white font-black uppercase tracking-[0.4em] text-[10px] rounded-full hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-emerald-900/40"
          >
            {isGenerating ? "VISTORIANDO DESIGN..." : "INOVAR E GERAR 4 MODELOS"}
          </button>
        </div>
      </aside>

      {/* Workspace de Preview */}
      <main className="flex-1 overflow-y-auto bg-black p-10 flex flex-col items-center">
        {isGenerating ? (
          <div className="h-full flex flex-col items-center justify-center opacity-50">
             <div className="w-12 h-12 border-2 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin mb-6"></div>
             <p className="text-[10px] font-black tracking-[0.5em] uppercase animate-pulse">Recalculando Tipografia e Cores...</p>
          </div>
        ) : isGenerated ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-24 py-10 w-full max-w-7xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col items-center gap-6 group">
              <CosmosTemplate data={data} id="f-cosmos" seed={designSeed} />
              <button onClick={() => downloadArt('f-cosmos', 'COSMOS')} className="opacity-40 group-hover:opacity-100 transition-opacity text-[10px] font-black uppercase tracking-[0.3em] bg-white/5 px-6 py-2 rounded-full hover:bg-white/10 text-white">Baixar Cosmos</button>
            </div>
            <div className="flex flex-col items-center gap-6 group">
              <EnergeticTemplate data={data} id="f-energetic" seed={designSeed} />
              <button onClick={() => downloadArt('f-energetic', 'ENERGETIC')} className="opacity-40 group-hover:opacity-100 transition-opacity text-[10px] font-black uppercase tracking-[0.3em] bg-white/5 px-6 py-2 rounded-full hover:bg-white/10 text-white">Baixar Energetic</button>
            </div>
            <div className="flex flex-col items-center gap-6 group">
              <InstitutionalTemplate data={data} id="f-institutional" seed={designSeed} />
              <button onClick={() => downloadArt('f-institutional', 'INSTITUTIONAL')} className="opacity-40 group-hover:opacity-100 transition-opacity text-[10px] font-black uppercase tracking-[0.3em] bg-white/5 px-6 py-2 rounded-full hover:bg-white/10 text-white">Baixar Institutional</button>
            </div>
            <div className="flex flex-col items-center gap-6 group">
              <ImpactTemplate data={data} id="f-impact" seed={designSeed} />
              <button onClick={() => downloadArt('f-impact', 'IMPACT')} className="opacity-40 group-hover:opacity-100 transition-opacity text-[10px] font-black uppercase tracking-[0.3em] bg-white/5 px-6 py-2 rounded-full hover:bg-white/10 text-white">Baixar Impact</button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center">
             <div className="text-[150px] leading-none mb-4 opacity-[0.03] font-black italic tracking-tighter select-none">DESIGN</div>
             <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20">Aguardando Parâmetros</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
