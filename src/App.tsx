import React, { useState } from 'react';

// Helper component for SVG icons to keep the main component cleaner
const Icons = {
  Lightbulb: () => (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
  ),
  Users: () => (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
  ),
  Sparkles: () => (
    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
  ),
  Menu: () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  ),
  Twitter: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
  ),
  LinkedIn: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>
  )
};

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navLinks = [
        { href: '#about', text: 'About' },
        { href: '#schedule', text: 'Schedule' },
        { href: '#sponsors', text: 'Sponsors' },
        { href: '#contact', text: 'Contact' },
    ];

    return (
        <div className="antialiased">
            {/* Header */}
            <header className="fixed w-full z-50 bg-black/50 backdrop-blur-sm border-b border-slate-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <a href="#" className="text-2xl font-bold text-white">
                                <span className="text-indigo-500">&lt;</span>DevDash<span className="text-indigo-500">/&gt;</span>
                            </a>
                        </div>
                        <nav className="hidden md:flex md:space-x-8">
                            {navLinks.map((link) => (
                                 <a key={link.href} href={link.href} className="text-slate-300 hover:text-indigo-400 transition duration-150 ease-in-out">{link.text}</a>
                            ))}
                        </nav>
                        <div className="flex items-center">
                            <a href="#" className="hidden sm:inline-block bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out shadow-lg shadow-indigo-500/20">Register Now</a>
                            <button onClick={toggleMenu} id="mobile-menu-button" className="md:hidden ml-4 p-2 rounded-md text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <Icons.Menu />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mobile Menu */}
                <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                         {navLinks.map((link) => (
                            <a key={link.href} href={link.href} onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">{link.text}</a>
                        ))}
                        <a href="#" className="block w-full text-left bg-indigo-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out mt-2">Register Now</a>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 hero-gradient">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-50 to-slate-400 leading-tight tracking-tighter mb-6">
                            Innovate, Build, Launch.
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-400 mb-8">
                            Join the brightest minds for 48 hours of intense coding, creativity, and collaboration. Build the future, one line of code at a time.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <a href="#" className="w-full sm:w-auto bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-indigo-500/30">
                                Register for DevDash 2025
                            </a>
                            <a href="#" className="w-full sm:w-auto bg-slate-800 text-slate-200 font-semibold px-8 py-4 rounded-lg hover:bg-slate-700 transition duration-300 ease-in-out transform hover:scale-105">
                                Become a Sponsor
                            </a>
                        </div>
                        <div className="mt-12 text-slate-500 font-medium">
                            <p>October 25-27, 2025 &bull; Virtual Event</p>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 md:py-32 section-gradient">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">What is <span className="text-indigo-400">DevDash</span>?</h2>
                            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">A launchpad for your ideas and a catalyst for your career.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl shadow-lg card-hover transition-all duration-300">
                                <div className="text-indigo-400 mb-4"><Icons.Lightbulb /></div>
                                <h3 className="text-2xl font-bold text-white mb-3">Intense Innovation</h3>
                                <p className="text-slate-400">Compete for amazing prizes by building a project from scratch in just 48 hours. Push your limits and learn new skills under pressure.</p>
                            </div>
                            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl shadow-lg card-hover transition-all duration-300">
                                <div className="text-indigo-400 mb-4"><Icons.Users /></div>
                                <h3 className="text-2xl font-bold text-white mb-3">Network & Collaborate</h3>
                                <p className="text-slate-400">Connect with fellow developers, designers, mentors, and recruiters from top tech companies. Find your next co-founder or career opportunity.</p>
                            </div>
                            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl shadow-lg card-hover transition-all duration-300">
                                <div className="text-indigo-400 mb-4"><Icons.Sparkles /></div>
                                <h3 className="text-2xl font-bold text-white mb-3">Workshops & Mentors</h3>
                                <p className="text-slate-400">Level up your skills with hands-on workshops on cutting-edge technologies. Get guidance from experienced industry mentors.</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Schedule Section */}
                <section id="schedule" className="py-20 md:py-32">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Event <span className="text-indigo-400">Schedule</span></h2>
                            <p className="mt-4 text-lg text-slate-400">48 hours of non-stop action. Plan your time!</p>
                        </div>
                        <div className="max-w-3xl mx-auto">
                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
                                {/* Day 1 */}
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 text-slate-500 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-300">
                                        <p className="font-bold">1</p>
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                                        <p className="text-indigo-400 font-semibold mb-1">Friday, Oct 25</p>
                                        <h4 className="font-bold text-lg text-white mb-2">Kick-off & Team Formation</h4>
                                        <p className="text-slate-400 text-sm">6:00 PM: Opening Ceremony<br/>7:00 PM: Keynote Speaker<br/>8:00 PM: Hacking Begins!</p>
                                    </div>
                                </div>
                                {/* Day 2 */}
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 text-slate-500 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-300">
                                        <p className="font-bold">2</p>
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                                        <p className="text-indigo-400 font-semibold mb-1">Saturday, Oct 26</p>
                                        <h4 className="font-bold text-lg text-white mb-2">Build & Learn</h4>
                                        <p className="text-slate-400 text-sm">All Day: Hacking<br/>11:00 AM: Workshop: Intro to GenAI<br/>2:00 PM: Mentor Check-ins<br/>7:00 PM: Mini-event: Game Night</p>
                                    </div>
                                </div>
                                {/* Day 3 */}
                                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 text-slate-500 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-300">
                                        <p className="font-bold">3</p>
                                    </div>
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                                        <p className="text-indigo-400 font-semibold mb-1">Sunday, Oct 27</p>
                                        <h4 className="font-bold text-lg text-white mb-2">Judging & Awards</h4>
                                        <p className="text-slate-400 text-sm">12:00 PM: Hacking Ends / Submissions<br/>2:00 PM: Project Demos & Judging<br/>5:00 PM: Awards Ceremony</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sponsors Section */}
                <section id="sponsors" className="py-20 md:py-32 section-gradient">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white">Our Awesome <span className="text-indigo-400">Sponsors</span></h2>
                            <p className="mt-4 text-lg text-slate-400">Powering innovation and supporting the next generation of builders.</p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                                <img src="https://placehold.co/160x80/1e293b/9ca3af?text=SponsorCo" alt="Sponsor Logo 1" className="h-12 md:h-16 opacity-70 hover:opacity-100 transition-opacity duration-300" />
                                <img src="https://placehold.co/160x80/1e293b/9ca3af?text=TechCorp" alt="Sponsor Logo 2" className="h-12 md:h-16 opacity-70 hover:opacity-100 transition-opacity duration-300" />
                                <img src="https://placehold.co/160x80/1e293b/9ca3af?text=InnovateInc" alt="Sponsor Logo 3" className="h-12 md:h-16 opacity-70 hover:opacity-100 transition-opacity duration-300" />
                                <img src="https://placehold.co/160x80/1e293b/9ca3af?text=DevTools" alt="Sponsor Logo 4" className="h-12 md:h-16 opacity-70 hover:opacity-100 transition-opacity duration-300" />
                                <img src="https://placehold.co/160x80/1e293b/9ca3af?text=Cloudify" alt="Sponsor Logo 5" className="h-12 md:h-16 opacity-70 hover:opacity-100 transition-opacity duration-300" />
                                <img src="https://placehold.co/160x80/1e293b/9ca3af?text=Venture" alt="Sponsor Logo 6" className="h-12 md:h-16 opacity-70 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer id="contact" className="bg-slate-900/50 border-t border-slate-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">DevDash 2025</h3>
                            <p className="text-slate-400">Building the future, together.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-200 mb-3">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-slate-400 hover:text-indigo-400">FAQ</a></li>
                                <li><a href="#" className="text-slate-400 hover:text-indigo-400">Code of Conduct</a></li>
                                <li><a href="#" className="text-slate-400 hover:text-indigo-400">Privacy Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-200 mb-3">Contact Us</h4>
                            <ul className="space-y-2">
                                <li><a href="mailto:hello@devdash.com" className="text-slate-400 hover:text-indigo-400">hello@devdash.com</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-200 mb-3">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-slate-400 hover:text-indigo-400"><Icons.Twitter /></a>
                                <a href="#" className="text-slate-400 hover:text-indigo-400"><Icons.LinkedIn /></a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
                        <p>&copy; 2025 DevDash. All rights reserved. Made with ❤️ for the community.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

