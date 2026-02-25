'use client';
import PortfolioPage from '@/components/ui/PortfolioPage';

export default function Home() {
  return (
    <div className="h-screen w-full bg-black relative overflow-hidden">
      {/* STATIC UI OVERLAYS */}
      <div className="fixed top-6 left-6 mix-blend-difference text-white pointer-events-none z-50">
         <div className="text-xs font-mono mb-1 tracking-[0.2em]">TAMMY // PORTFOLIO</div>
         <div className="h-px w-10 bg-white/50"></div>
      </div>

      {/* PORTFOLIO PAGE */}
      <PortfolioPage />
    </div>
  );
}
