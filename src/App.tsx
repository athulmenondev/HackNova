import React, { useState, useEffect } from 'react';

// Helper component for SVG icons
const Icons = {
  Menu: () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  ),
  Close: () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
};

// Countdown Timer Component
const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2025-02-22T00:00:00") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time) => String(time).padStart(2, '0');

  return (
    <div className="flex justify-center gap-4 md:gap-8 mt-12">
      {timeLeft.days !== undefined && Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="text-center">
          <div className="text-4xl md:text-6xl font-bold p-4 rounded-lg bg-black/30 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center" style={{ color: ['#ff0055', '#00ff99', '#ffaa00', '#00ccff'][Object.keys(timeLeft).indexOf(interval)] }}>
            {formatTime(value)}
          </div>
          <div className="text-sm uppercase tracking-widest mt-2 text-slate-400">{interval}</div>
        </div>
      ))}
    </div>
  );
};


export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navLinks = [
        { href: '#about', text: 'About' },
        { href: '#themes', text: 'Themes' },
        { href: '#timeline', text: 'Timeline' },
        { href: '#sponsors', text: 'Sponsors' },
        { href: '#prizes', text: 'Prizes' },
        { href: '#team', text: 'Team' },
        { href: '#faq', text: 'FAQ' },
        { href: '#socials', text: 'Socials' },
    ];

    return (
        <div className="antialiased bg-[#0D0A1C] text-slate-200 font-pixel">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#0D0A1C]"></div>

            {/* Header */}
            <header className="fixed w-full z-50 bg-black/10 backdrop-blur-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex-shrink-0">
                            <a href="#" className="text-3xl font-bold text-white tracking-wider">
                                <span className="text-pink-500">[</span>HACK<span className="text-cyan-400">NOVA</span><span className="text-pink-500">]</span>
                            </a>
                        </div>
                        <nav className="hidden lg:flex lg:space-x-6">
                            {navLinks.map((link) => (
                                 <a key={link.href} href={link.href} className="text-slate-300 hover:text-pink-400 transition duration-150 ease-in-out uppercase text-sm tracking-widest">{link.text}</a>
                            ))}
                        </nav>
                        <div className="flex items-center">
                            <a href="#" className="hidden sm:inline-block bg-pink-600/80 text-white font-bold px-5 py-2 rounded-md hover:bg-pink-700 transition duration-300 ease-in-out shadow-[0_0_15px_rgba(219,39,119,0.5)]">
                                Swag
                            </a>
                            <button onClick={toggleMenu} className="lg:hidden ml-4 p-2 rounded-md text-slate-300 hover:bg-slate-800 focus:outline-none">
                                {isMenuOpen ? <Icons.Close /> : <Icons.Menu />}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile Menu */}
                <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden bg-[#110D21]/95 backdrop-blur-md`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                         {navLinks.map((link) => (
                            <a key={link.href} href={link.href} onClick={toggleMenu} className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 uppercase tracking-widest">{link.text}</a>
                        ))}
                    </div>
                </div>
            </header>

            <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-24 text-center z-10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-none tracking-wider title-shadow mb-6">
                           HACKNOVA 1.0
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg md:text-xl text-cyan-300 mb-4 tracking-widest">
                           22-23rd Feb, 2025
                        </p>
                        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-200 mb-10 font-bold tracking-wider">
                           Hustle &middot; Dream &middot; Hack
                        </p>
                        <div className="flex justify-center">
                           <a href="#" className="bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                                Go to projects
                            </a>
                        </div>
                        <CountdownTimer />
                    </div>
                </section>
            </main>
        </div>
    );
}

