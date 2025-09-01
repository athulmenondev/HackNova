import React, { useState, useEffect, useRef } from 'react';

// Helper component for SVG icons
const Icons = {
  Lightbulb: () => (
    <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
  ),
  Trophy: () => (
    <svg className="w-12 h-12 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 11l3-3m0 0l3 3m-3-3v8m5-4a3 3 0 01-6 0m-3 3a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
  ),
  Users: () => (
    <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
  ),
};

// Custom Hook for Scroll Animations
const useScrollAnimation = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return [ref, isVisible] as const;
};


// Countdown Timer Component
const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2025-09-13T09:00:00") - +new Date();
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

  const formatTime = (time: number) => String(time || 0).padStart(2, '0');

  return (
    <div className="flex justify-center gap-4 md:gap-8 mt-12">
      {Object.entries(timeLeft).length > 0 ? Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="text-center">
          <div className="text-4xl md:text-6xl font-bold p-4 rounded-lg bg-black/30 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center" style={{ color: ['#ff0055', '#00ff99', '#ffaa00', '#00ccff'][Object.keys(timeLeft).indexOf(interval)] }}>
            {formatTime(value as number)}
          </div>
          <div className="text-sm uppercase tracking-widest mt-2 text-slate-400">{interval}</div>
        </div>
      )) : <p className="text-2xl text-green-400">The event has started!</p>}
    </div>
  );
};

// Timeline Component with Scroll Animation
const Timeline = () => {
    const events = [
        { time: '9:00 AM', title: 'Opening Ceremony', description: 'Kick-off for HACKNOVA 2025 begins!' },
        { time: '9:30 AM', title: 'Hacking Starts', description: 'Let the coding commence.' },
        { time: '1:00 PM', title: 'Lunch Break', description: 'Recharge and refuel.' },
        { time: '4:00 PM', title: 'Hacking Ends', description: 'Final commits and submissions.' },
        { time: '4:15 PM', title: 'Judging Begins', description: 'Our judges review the projects.' },
        { time: '5:00 PM', title: 'Awards Ceremony', description: 'Announcing the winners.' },
    ];

    const timelineContainerRef = useRef<HTMLDivElement>(null);
    const [iconTop, setIconTop] = useState(0);

    const handleScroll = () => {
        const timelineEl = timelineContainerRef.current;
        if (!timelineEl) return;

        const { top, height } = timelineEl.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const totalScrollDistance = height + windowHeight;
        const scrolledDistance = windowHeight - top;
        const progress = scrolledDistance / totalScrollDistance;

        const clampedProgress = Math.max(0, Math.min(1, progress));

        const trackHeight = timelineEl.clientHeight - 24; 
        const newTop = clampedProgress * trackHeight;
        
        setIconTop(newTop);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white">Event <span className="text-yellow-400">Timeline</span></h2>
            </div>
            <div ref={timelineContainerRef} className="relative max-w-2xl mx-auto">
                <div className="absolute left-1/2 -translate-x-1/2 h-full top-2 w-0.5 bg-repeat-y bg-[length:4px_12px]" style={{backgroundImage: 'linear-gradient(to bottom, #475569 4px, transparent 4px)'}}></div>
                
                <div 
                    className="w-6 h-6 bg-yellow-400 rounded-full absolute left-1/2 -translate-x-1/2 border-4 border-slate-900 transition-all duration-200 ease-linear"
                    style={{ top: `${iconTop}px` }}
                ></div>

                {events.map((event, index) => (
                    <div key={index} className={`relative mb-12 flex items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-1/2 px-6 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                            <p className="text-lg font-bold text-yellow-400">{event.time}</p>
                            <h3 className="text-xl font-bold text-white mt-1 mb-2">{event.title}</h3>
                            <p className="text-slate-400 text-sm">{event.description}</p>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-800 border-2 border-yellow-400 z-10"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// Main App Component
export default function App() {
    const [aboutRef, isAboutVisible] = useScrollAnimation();
    const [highlightsRef, isHighlightsVisible] = useScrollAnimation();
    const [prizesRef, isPrizesVisible] = useScrollAnimation();
    const [timelineRef, isTimelineVisible] = useScrollAnimation();
    const [sponsorsRef, isSponsorsVisible] = useScrollAnimation();

    return (
        <div className="antialiased bg-[#0D0A1C] text-slate-200 font-pixel">
            {/* Background elements */}
            <div className="fixed top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0"></div>
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#0D0A1C] z-0"></div>

            <main className="relative z-10">
                {/* Hero Section */}
                <section id="home" className="min-h-screen flex items-center justify-center text-center overflow-hidden pt-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-none tracking-wider title-shadow mb-6">
                           HACKNOVA
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg md:text-xl text-cyan-300 mb-4 tracking-widest">
                           Saturday, September 13, 2025 &middot; 9am to 5pm
                        </p>
                        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-200 mb-10 font-bold tracking-wider">
                           CODE &middot; CREATE &middot; CONQUER
                        </p>
                        <div className="flex justify-center">
                           <a href="#about" className="bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                                Learn More
                            </a>
                        </div>
                        <CountdownTimer />
                    </div>
                </section>

                {/* About Section */}
                <section ref={aboutRef} id="about" className={`py-20 md:py-32`}>
                    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-500 ease-in-out ${isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className={`text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-500 ease-in-out delay-100 ${isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>About <span className="text-cyan-400">The Event</span></h2>
                        <p className={`max-w-3xl mx-auto text-lg text-slate-300 leading-relaxed transition-all duration-500 ease-in-out delay-200 ${isAboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            The Programmer's Day Hackathon 2025, organized by STACS at NSS College of Engineering, Palakkad, is a high-energy coding competition celebrating International Programmer's Day. Our objective is to solve real-world challenges, foster innovation, and showcase creativity through technology.
                        </p>
                    </div>
                </section>

                {/* Highlights Section */}
                <section ref={highlightsRef} id="highlights" className={`py-20 md:py-32 bg-black/20`}>
                     <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out ${isHighlightsVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="text-center mb-16">
                            <h2 className={`text-4xl md:text-5xl font-bold text-white transition-all duration-500 ease-in-out ${isHighlightsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Event <span className="text-pink-500">Highlights</span></h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className={`border border-pink-500/30 bg-pink-500/5 p-8 rounded-lg transition-all duration-500 ease-in-out delay-100 ${isHighlightsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <Icons.Lightbulb />
                                <h3 className="text-2xl font-bold text-white mb-3">Innovative Problems</h3>
                                <p className="text-slate-400">Tackle real-world challenges designed to inspire creative and impactful solutions.</p>
                            </div>
                            <div className={`border border-cyan-400/30 bg-cyan-400/5 p-8 rounded-lg transition-all duration-500 ease-in-out delay-200 ${isHighlightsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <Icons.Trophy />
                                <h3 className="text-2xl font-bold text-white mb-3">Prizes & Recognition</h3>
                                <p className="text-slate-400">Rewarding top-performing teams with exciting cash prizes, certificates, and glory.</p>
                            </div>
                            <div className={`border border-yellow-400/30 bg-yellow-400/5 p-8 rounded-lg transition-all duration-500 ease-in-out delay-300 ${isHighlightsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <Icons.Users />
                                <h3 className="text-2xl font-bold text-white mb-3">Networking</h3>
                                <p className="text-slate-400">Connect with fellow student developers from across Kerala and build lasting relationships.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Prizes Section */}
                <section ref={prizesRef} id="prizes" className={`py-20 md:py-32`}>
                     <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out ${isPrizesVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="text-center mb-16">
                            <h2 className={`text-4xl md:text-5xl font-bold text-white transition-all duration-500 ease-in-out ${isPrizesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Prize <span className="text-green-400">Pool</span></h2>
                            <p className={`mt-4 text-lg text-slate-400 max-w-2xl mx-auto transition-all duration-500 ease-in-out delay-100 ${isPrizesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>A total prize pool of ₹20,000 to be won!</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className={`border-2 border-yellow-400 bg-yellow-400/10 p-8 rounded-lg text-center transform md:scale-110 shadow-[0_0_30px_rgba(250,204,21,0.3)] transition-all duration-500 ease-in-out delay-200 ${isPrizesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <Icons.Trophy />
                                <h3 className="text-3xl font-bold text-yellow-300 mb-2">1st Place</h3>
                                <p className="text-4xl font-bold text-white mb-4">₹10,000</p>
                                <p className="text-slate-400">Plus certificates and swag!</p>
                            </div>
                            <div className={`border border-slate-500 bg-slate-500/10 p-8 rounded-lg text-center mt-0 md:mt-8 transition-all duration-500 ease-in-out delay-300 ${isPrizesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                               <Icons.Trophy />
                                <h3 className="text-2xl font-bold text-slate-300 mb-2">2nd Place</h3>
                                <p className="text-3xl font-bold text-white mb-4">₹6,000</p>
                                <p className="text-slate-400">Plus certificates.</p>
                            </div>
                            <div className={`border border-orange-400 bg-orange-400/10 p-8 rounded-lg text-center mt-0 md:mt-8 transition-all duration-500 ease-in-out delay-400 ${isPrizesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <Icons.Trophy />
                                <h3 className="text-2xl font-bold text-orange-300 mb-2">3rd Place</h3>
                                <p className="text-3xl font-bold text-white mb-4">₹4,000</p>
                                <p className="text-slate-400">Plus certificates.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section ref={timelineRef} id="timeline" className={`py-20 md:py-32 bg-black/20 transition-all duration-700 ease-in-out ${isTimelineVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <Timeline />
                </section>
                
                {/* Sponsor Section */}
                <section ref={sponsorsRef} id="sponsors" className={`py-20 md:py-32`}>
                    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-500 ease-in-out ${isSponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className={`text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-500 ease-in-out delay-100 ${isSponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Become a <span className="text-cyan-400">Sponsor</span></h2>
                        <p className={`max-w-3xl mx-auto text-lg text-slate-300 mb-10 leading-relaxed transition-all duration-500 ease-in-out delay-200 ${isSponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            Gain brand visibility, engage with young innovators, and support the next generation of engineers. We have multiple sponsorship tiers and are open to custom packages.
                        </p>
                        <a href="mailto:stacs@nssce.ac.in" className={`bg-pink-600 text-white font-bold text-lg px-8 py-4 rounded-md hover:bg-pink-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-[0_0_20px_rgba(219,39,119,0.5)] transition-all duration-500 ease-in-out delay-300 ${isSponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            Sponsor Us
                        </a>
                    </div>
                </section>

            </main>
        </div>
    );
}

