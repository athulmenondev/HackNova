import { useState } from 'react';

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

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const navLinks = [
        { href: '#about', text: 'About' },
        { href: '#highlights', text: 'Highlights' },
        { href: '#prizes', text: 'Prizes' },
        { href: '#timeline', text: 'Timeline' },
        { href: '#sponsors', text: 'Sponsors' },
    ];

    return (
        <header className="fixed w-full z-20 top-0 left-0 border border-white/20 bg-[#0D0A1C]/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="#home" className="text-2xl font-bold text-white tracking-widest">
                            HACKNOVA
                        </a>
                    </div>
                    <nav className="hidden md:flex md:space-x-8">
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href} className="text-slate-300 hover:text-cyan-400 transition duration-150 ease-in-out uppercase text-sm tracking-wider">{link.text}</a>
                        ))}
                    </nav>
                    <div className="flex items-center">
                         <a href="#" className="hidden sm:inline-block bg-pink-600 text-white font-bold px-5 py-2 rounded-md hover:bg-pink-700 transition duration-150 ease-in-out shadow-[0_0_15px_rgba(219,39,119,0.4)] text-sm uppercase tracking-wider">Register</a>
                        <button onClick={toggleMenu} className="md:hidden ml-4 p-2 rounded-md text-slate-300 hover:bg-slate-800 focus:outline-none">
                            {isMenuOpen ? <Icons.Close /> : <Icons.Menu />}
                        </button>
                    </div>
                </div>
            </div>
            
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-[#0D0A1C] border-t border-slate-800`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                     {navLinks.map((link) => (
                        <a key={link.href} href={link.href} onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 text-center uppercase tracking-wider">{link.text}</a>
                    ))}
                    <div className="p-4">
                        <a href="#" className="block w-full text-center bg-pink-600 text-white font-bold px-4 py-3 rounded-lg hover:bg-pink-700 transition duration-150 ease-in-out uppercase tracking-wider">Register</a>
                    </div>
                </div>
            </div>
        </header>
    );
};

