'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Lenis from 'lenis';
import Link from 'next/link';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function DeskITPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const lenis = new Lenis({
        wrapper: wrapperRef.current, 
        content: contentRef.current, 
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <motion.div
        ref={wrapperRef}
        initial={{ y: '100vh', borderRadius: "40px" }}
        animate={{ y: 0, borderRadius: "0px", transition: { duration: 1.2, ease: EASE } }}
        exit={{ y: '100vh' }}
        className="fixed inset-0 z-100 overflow-y-auto font-sans no-scrollbar bg-[#FAFAFA] text-black"
    >
      <div ref={contentRef} className="max-w-[1920px] mx-auto px-6 md:px-12 pt-8 pb-32 min-h-screen">
          

          {/* <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 mb-12 mt-4 text-black/50">
             <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link> */}

          {/* PAGE TITLE */}
          <div className="mb-10">
              <div className="flex flex-col gap-8 text-sm md:text-base pt-2">
                  <div>
                      <div className="text-black mb-1 text-[85px] font-[500]">DeskIT</div>
                      <div className="font-[400] text-[20px]">Helpdesk Management Solution</div>
                  </div>
                  <div>
                      <div className="text-black/50 mb-1 text-[20px] tracking-wider font-[400]">Role</div>
                      <div className="font-[400] text-[40px]">UI/UX Designer</div>
                  </div>
                  <div>
                      <div className="text-black/50 mb-1 text-[20px] tracking-wider font-[400]">Platform</div>
                      <div className="font-[400] text-[40px]">DeskIT — Internal Helpdesk Ticketing System</div>
                  </div>
              </div>
          </div>

          {/* HERO IMAGE */}
          <div className="w-full h-[504px] bg-[#F1F1F1] pt-20 rounded-2xl md:rounded-4xl overflow-hidden mb-24 flex items-center justify-center p-4 md:p-12 ">
             <img src="/Frame 2147227506.svg" alt="DeskIT Dashboard Overview" className="w-full h-auto object-contain rounded-xl mt-32" />
          </div>

          {/* MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              
              <div className="lg:col-span-12 space-y-24">
                  
                  {/* PROJECT OVERVIEW */}
                  <section>
                      <h2 className="text-2xl md:text-3xl font-normal tracking-tight mb-6">Project Overview</h2>
                      <p className="text-black/70 text-sm md:text-base leading-relaxed max-w-4xl">
                        DeskIT is an internal helpdesk platform created to redefine how employees and IT support interact. 
                        It replaces scattered communication methods with a centralized platform for raising, tracking, 
                        and resolving tickets—helping teams work faster, stay organized, and communicate effectively.
                      </p>
                  </section>

                  {/* PROBLEM STATEMENT */}
                  <section>
                      <h2 className="text-2xl md:text-3xl font-normal tracking-tight mb-6">Problem Statement</h2>
                      <p className="text-black/70 text-sm md:text-base leading-relaxed max-w-4xl mb-4">
                        Previously, employees faced heavy friction when reporting issues properly—they often relied on:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-black/70 text-sm md:text-base max-w-4xl mb-6">
                          <li>Direct messages and emails</li>
                          <li>Verbal requests</li>
                          <li>Poorly managed ticketing systems</li>
                          <li>SLA tracking difficulties resulting in service delays</li>
                      </ul>
                      <p className="text-black/70 text-sm md:text-base leading-relaxed max-w-4xl">
                        This led to lost requests, delayed resolutions, and general frustration spread across various departments.
                        The goal was to design a tool that streamlined this process, providing clear visibility and structured resolution paths.
                      </p>
                  </section>

                  {/* USER PERSONAS */}
                  <section>
                      <h2 className="text-2xl md:text-3xl font-normal tracking-tight mb-8">User Personas</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {/* Persona 1 */}
                          <div className="flex flex-col gap-4">
                              <div className="w-full h-[504px] aspect-4/3 bg-gray-200 rounded-xl overflow-hidden relative">
                                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="Employee Persona" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                              </div>
                              <h3 className="text-lg font-medium tracking-tight mt-2">Employee (Ticket Submitter)</h3>
                              <ul className="list-disc pl-4 space-y-1 text-sm text-black/70">
                                  <li>Needs a simple way to submit IT, HR, facilities or other requests.</li>
                                  <li>Wants transparency on ticket status.</li>
                              </ul>
                          </div>

                          {/* Persona 2 */}
                          <div className="flex flex-col gap-4">
                              <div className="w-full h-[504px] aspect-4/3 bg-gray-200 rounded-xl overflow-hidden relative">
                                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" alt="Manager Persona" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                              </div>
                              <h3 className="text-lg font-medium tracking-tight mt-2">Manager (Department Head)</h3>
                              <ul className="list-disc pl-4 space-y-1 text-sm text-black/70">
                                  <li>Needs to prioritise and oversee team tickets.</li>
                                  <li>Requires tools to approve or escalate issues.</li>
                              </ul>
                          </div>

                          {/* Persona 3 */}
                          <div className="flex flex-col gap-4">
                              <div className="w-full h-[504px] aspect-4/3 bg-gray-200 rounded-xl overflow-hidden relative">
                                  <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" alt="Admin Persona" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                              </div>
                              <h3 className="text-lg font-medium tracking-tight mt-2">Admin (Helpdesk Coordinator)</h3>
                              <ul className="list-disc pl-4 space-y-1 text-sm text-black/70">
                                  <li>Oversees overall ticket volume, SLA enforcement, and performance metrics.</li>
                              </ul>
                          </div>
                      </div>
                  </section>

                  {/* KEY FEATURES DESIGNED */}
                  <section>
                      <h2 className="text-2xl md:text-3xl font-normal tracking-tight mb-8">Key Features Designed</h2>
                      <div className="space-y-8">
                          
                          {/* Top Row Feature Panels */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="w-full aspect-square md:aspect-4/3 bg-[#fdfdfd] rounded-2xl flex items-center justify-start py-4 md:py-8 pr-4 md:pr-8 pl-0 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow">
                                <div className="absolute inset-0 bg-linear-to-br from-[#f8f9fc] to-[#eef1f6] z-0 opacity-50"></div>
                                <div className="w-[95%] h-full md:h-[90%] rounded-r-xl shadow-[10px_10px_40px_rgba(0,0,0,0.08)] z-10 border border-gray-100/50 border-l-0 overflow-hidden transform origin-left group-hover:scale-[1.02] transition-transform duration-500 bg-white">
                                    <img src="/All Tickets View (List view).svg" alt="All Tickets View" className="w-full h-full object-cover object-top-left" />
                                </div>
                             </div>

                             <div className="w-full aspect-square md:aspect-4/3 bg-[#fdfdfd] rounded-2xl flex items-center justify-start py-4 md:py-8 pr-4 md:pr-8 pl-0 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow">
                                <div className="absolute inset-0 bg-linear-to-br from-[#f8f9fc] to-[#eef1f6] z-0 opacity-50"></div>
                                <div className="w-[95%] h-full md:h-[90%] rounded-r-xl shadow-[10px_10px_40px_rgba(0,0,0,0.08)] z-10 border border-gray-100/50 border-l-0 overflow-hidden transform origin-left group-hover:scale-[1.02] transition-transform duration-500 bg-white">
                                    <img src="/Ticket Details.svg" alt="Ticket Details View" className="w-full h-full object-cover object-top-left" />
                                </div>
                             </div>
                          </div>

                          {/* Large Dashboard Placeholder */}
                          <div className="w-full aspect-4/3 md:aspect-video bg-[#fcf8fa] rounded-2xl flex items-center justify-center p-8 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow mt-8">
                             <div className="absolute inset-0 bg-linear-to-br from-[#fafafc] to-[#f4f5f8] z-0"></div>
                                <div className="w-[90%] md:w-[80%] h-[85%] max-w-5xl bg-white rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-10 border border-gray-100 flex flex-col overflow-hidden transform group-hover:scale-[1.01] transition-transform duration-700">
                                    {/* Mock Window Header */}
                                    <div className="w-full h-10 border-b border-gray-100 bg-[#fbfbfb] flex items-center px-4 gap-2">
                                       <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                       <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                       <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                       <div className="mx-auto w-32 h-2 bg-gray-200 rounded"></div>
                                    </div>
                                    {/* Mock Dashboard Layout */}
                                    <div className="flex-1 flex bg-gray-50/30">
                                        <div className="w-48 border-r border-gray-100 bg-[#fdfdfd] h-full hidden md:flex flex-col gap-4 p-4">
                                            <div className="w-full h-4 bg-gray-200 rounded-sm mb-4"></div>
                                            <div className="w-3/4 h-3 bg-gray-100 rounded-sm"></div>
                                            <div className="w-2/3 h-3 bg-gray-100 rounded-sm"></div>
                                            <div className="w-4/5 h-3 bg-gray-100 rounded-sm"></div>
                                        </div>
                                        <div className="flex-1 p-6 flex flex-col gap-6">
                                            <div className="font-medium text-sm text-gray-500 mb-2">Admin Dashboard</div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="h-20 bg-white border border-gray-100 rounded-lg shadow-sm"></div>
                                                <div className="h-20 bg-white border border-gray-100 rounded-lg shadow-sm"></div>
                                                <div className="h-20 bg-white border border-gray-100 rounded-lg shadow-sm"></div>
                                            </div>
                                            <div className="flex-1 bg-white border border-gray-100 rounded-lg shadow-sm"></div>
                                        </div>
                                    </div>
                                </div>
                          </div>

                      </div>
                  </section>
                  
              </div>
          </div>
      </div>
      
      {/* FOOTER */}
      <footer className="bg-[#111] text-white py-12 md:py-24 px-6 md:px-12 w-full mt-32 rounded-t-3xl md:rounded-t-[3rem] overflow-hidden">
          <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
             <div className="flex flex-col gap-4">
                <div className="text-6xl md:text-[8rem] font-bold tracking-tighter uppercase opacity-80 leading-none">FALDNAG</div>
             </div>
             
             <div className="grid grid-cols-2 gap-12 w-full md:w-auto text-sm opacity-60">
                <div className="flex flex-col gap-4">
                   <div className="font-semibold mb-2 opacity-100 text-xs tracking-widest uppercase">Socials</div>
                   <a href="#" className="hover:opacity-100 transition-opacity">Twitter</a>
                   <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
                   <a href="#" className="hover:opacity-100 transition-opacity">Dribbble</a>
                </div>
                <div className="flex flex-col gap-4">
                   <div className="font-semibold mb-2 opacity-100 text-xs tracking-widest uppercase">Contact</div>
                   <a href="#" className="hover:opacity-100 transition-opacity">Email Me</a>
                   <a href="#" className="hover:opacity-100 transition-opacity">Book a Call</a>
                </div>
             </div>
          </div>
      </footer>
    </motion.div>
  );
}
