'use client';

import DeskITPage from '../../../components/ui/DeskITPage';

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] relative overflow-hidden">
      {/* STATIC UI OVERLAYS */}
      <div className="fixed top-6 left-6 mix-blend-difference text-white pointer-events-none z-50">
         <div className="text-xs font-mono mb-1 tracking-[0.2em]">TAMMY // PORTFOLIO</div>
         <div className="h-px w-10 bg-white/50"></div>
      </div>

      <DeskITPage />
    </div>
  );
}
