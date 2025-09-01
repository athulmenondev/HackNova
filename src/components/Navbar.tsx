import React, { useState } from 'react';

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
  ),
};

export default function Navbar() {
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
  );
};
