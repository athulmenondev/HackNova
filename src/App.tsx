import { useState, useEffect, useRef, useMemo } from 'react';
import type { RefObject } from 'react';
import wonderLandLogo from './assets/wonderland_logo_text.png';
import wonderLandLogoText from './assets/wonderland_logo.png';

// Helper component for SVG icons
const Icons = {
  Lightbulb: () => (
    <svg className="w-12 h-12 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
  ),
  Trophy: () => (
    <svg className="w-12 h-12 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 11l3-3m0 0l3 3m-3-3v8m5-4a3 3 0 01-6 0m-3 3a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
  ),
  Users: () => (
    <svg className="w-12 h-12 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
  ),
};

// Ghost Icon for Timeline
const GhostIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a6 6 0 00-6 6v5a2 2 0 002 2h8a2 2 0 002-2v-5a6 6 0 00-6-6zm0 11a1 1 0 110-2 1 1 0 010 2zm-3-4a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2z" />
      <path d="M10 15v4l-2-1-1-2h6l-1 2-2 1v-4z" />
    </svg>
);

// Styles for Pacman Animation
const PacmanStyles = () => (
  <style>{`
    .pacman-container {
      transform: rotate(-90deg); /* Make it face upwards while moving down */
      transition: top 0.1s linear;
    }
    .pacman-body {
      background: #FFD700; /* Pacman yellow */
      position: absolute;
      width: 40px;
      height: 40px;
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%);
      animation: chomp 0.4s infinite;
      border-radius: 50%;
    }
    .pacman-eye {
      position: absolute;
      width: 5px;
      height: 5px;
      background: #0D0A1C;
      border-radius: 50%;
      top: 10px;
      left: 20px;
      transform: translateX(-50%);
      z-index: 10;
    }
    @keyframes chomp {
      0%, 100% {
        clip-path: polygon(50% 50%, 0 20%, 100% 20%, 100% 80%, 0 80%);
      }
      50% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%);
      }
    }
  `}</style>
);


// Custom Hook for Scroll Animations
const useScrollAnimation = (): readonly [RefObject<HTMLElement | null>, boolean] => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLElement>(null);

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

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return [ref, isVisible] as const;
};


// Countdown Timer Component
const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2025-09-13T09:00:00") - +new Date();
    let timeLeft: { [key: string]: number } = {};

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
          <div className="timer-font text-6xl md:text-8xl font-bold p-4 rounded-lg bg-black/30 w-20 h-20 md:w-28 md:h-28 flex items-center justify-center" style={{ color: ['#ff0055', '#00ff99', '#ffaa00', '#00ccff'][Object.keys(timeLeft).indexOf(interval)] }}>
            {formatTime(value)}
          </div>
          <div className="text-sm uppercase tracking-widest mt-2 text-slate-400">{interval}</div>
        </div>
      )) : <p className="text-2xl text-green-400">The event has started!</p>}
    </div>
  );
};

// Timeline Component
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
    const [pacmanTop, setPacmanTop] = useState(0);
    const [timelineHeight, setTimelineHeight] = useState(0);

    const ghostColors = ['text-red-500', 'text-cyan-400', 'text-pink-500', 'text-orange-500', 'text-green-400', 'text-purple-500'];

    const dotsPositions = useMemo(() => {
        if (timelineHeight === 0) return [];
        const numDots = events.length * 3;
        const contentHeight = timelineHeight - 80; // py-10 -> 40px top/bottom padding
        const gapHeight = contentHeight / (numDots - 1);

        return Array.from({ length: numDots }).map((_, i) => {
            return 40 + i * gapHeight; // Start at 40px (top padding)
        });
    }, [timelineHeight, events.length]);


    useEffect(() => {
        const timelineEl = timelineContainerRef.current;
        if (!timelineEl) return;

        const resizeObserver = new ResizeObserver(() => {
            setTimelineHeight(timelineEl.offsetHeight);
        });
        resizeObserver.observe(timelineEl);

        const handleScroll = () => {
            const { top, height } = timelineEl.getBoundingClientRect();
            const scrollableHeight = height - window.innerHeight;
            const pacmanTravelDistance = timelineEl.offsetHeight - 40; // 40 is pacman height

            if (scrollableHeight <= 0) {
                // If not scrollable, set pacman to the starting position (top)
                setPacmanTop(0);
                return;
            }

            let progress = -top / scrollableHeight;
            progress = Math.max(0, Math.min(1, progress));
            
            // Move from top to bottom
            setPacmanTop(progress * pacmanTravelDistance);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timelineEl) {
                resizeObserver.unobserve(timelineEl);
            }
        };
    }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white">Event <span className="text-yellow-400">Timeline</span></h2>
            </div>
            <div ref={timelineContainerRef} className="relative max-w-4xl mx-auto py-12">
                {/* Pacman Icon */}
                <div className="absolute left-1/2 -translate-x-1/2 w-20 h-10 flex justify-center items-center z-20" style={{ top: `${pacmanTop}px` }}>
                    <div className="pacman-container">
                        <div className="w-10 h-10 relative">
                          <div className="pacman-body"></div>
                          <div className="pacman-eye"></div>
                        </div>
                    </div>
                </div>

                {/* Dotted Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-20 flex flex-col items-center justify-between py-10">
                    {dotsPositions.map((position, i) => {
                         // A dot is eaten when pacman's top position is past the dot's position.
                        const isEaten = pacmanTop > position;
                        return (
                            <div
                                key={i}
                                className={`w-2 h-2 bg-yellow-400 rounded-full transition-opacity duration-200 ${isEaten ? 'opacity-0' : 'opacity-100'}`}
                            ></div>
                        );
                    })}
                </div>
                
                {/* Timeline Events */}
                <div className="relative z-10">
                    {events.map((event, index) => (
                        <div key={index} className="mb-16">
                            <div className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                                <div className="w-[calc(50%-2.5rem)]">
                                    <div className={`p-4 rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-lg transform transition-transform duration-500 hover:scale-105 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                        <p className="text-lg font-bold text-yellow-400">{event.time}</p>
                                        <h3 className="text-xl font-bold text-white mt-1 mb-2">{event.title}</h3>
                                        <p className="text-slate-400 text-sm">{event.description}</p>
                                    </div>
                                </div>
                                <div className="w-20 flex justify-center">
                                    <div className={ghostColors[index % ghostColors.length]}>
                                       <GhostIcon />
                                    </div>
                                </div>
                                <div className="w-[calc(50%-2.5rem)]"></div>
                            </div>
                        </div>
                    ))}
                </div>
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
            <PacmanStyles />
            <div className="fixed top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0"></div>
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#0D0A1C] z-0"></div>

            <main className="relative z-10">
                {/* Hero Section */}
                <section id="home" className="min-h-screen flex items-center justify-center text-center overflow-hidden pt-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="title-font text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-none tracking-wider title-shadow mb-6">
                           HACKNOVA
                        </h1>
                        <div className="flex flex-col items-center mb-6">
                            <p className="text-lg md:text-xl text-slate-400 font-bold mb-2">In Association with</p>
                            <img src={wonderLandLogo} alt="Associated Logo" className="h-36 w-auto rounded-3xl"  />
                        </div>
                        <p className="max-w-3xl mx-auto text-lg md:text-xl text-cyan-300 mb-4 tracking-widest">
                           Saturday, September 13, 2025 &middot; 9am to 5pm
                        </p>
                        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-200 mb-10 font-bold tracking-wider">
                           CODE &middot; CREATE &middot; CONQUER
                        </p>
                        <div className="flex justify-center gap-8">
                           <a href="#about" className="bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                                Learn More
                            </a>
                            <a href="https://forms.gle/FwDfucXJxgxrcJ9S6" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                                Register Now
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
                            <h2 className={`text-4xl md:text-5xl font-bold text-white transition-all duration-500 ease-in-out ${isPrizesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Prize <span className="text-green-400">Pool</span> of <span className='text-pink-500'>₹20,000</span></h2>
                            <p className={`mt-4 text-lg text-slate-400 max-w-2xl mx-auto transition-all duration-500 ease-in-out delay-100 ${isPrizesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>A total prize pool of ₹20,000 to be won!</p>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
                            <div className={`border-2 border-yellow-400 bg-yellow-400/10 p-8 rounded-lg text-center transform md:scale-110 shadow-[0_0_30px_rgba(250,204,21,0.3)] transition-all duration-500 ease-in-out delay-200 ${isPrizesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <h3 className="text-3xl font-bold text-yellow-300 mb-2">🥇</h3>
                                <h3 className="text-3xl font-bold text-yellow-300 mb-2">1st Place</h3>
                                <p className="text-4xl font-bold text-white mb-4">₹10,000</p>
                                <p className="text-slate-400">Plus certificates and swag!</p>
                            </div>
                            <div className={`border-2 border-slate-500 bg-slate-500/10 p-8 rounded-lg text-center transform md:scale-110 shadow-[0_0_30px_rgba(100,116,139,0.3)] transition-all duration-500 ease-in-out delay-300 ${isPrizesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <h3 className="text-2xl font-bold text-slate-300 mb-2">🥈</h3>
                                <h3 className="text-2xl font-bold text-slate-300 mb-2">2nd Place</h3>
                                <p className="text-3xl font-bold text-white mb-4">₹6,000</p>
                                <p className="text-slate-400">Plus certificates.</p>
                            </div>
                        </div>
                        <div className={`flex justify-center mt-8`}>
                           <div className={`border border-pink-500 bg-pink-500/10 p-8 rounded-lg text-center max-w-sm w-full transition-all duration-500 ease-in-out delay-400 ${isPrizesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <h3 className="text-2xl font-bold text-pink-500 mb-2">🌟</h3>
                                <h3 className="text-2xl font-bold text-pink-500 mb-2">Special Jury Award</h3>
                                <p className="text-3xl font-bold text-white mb-4">₹5,000</p>
                                <p className="text-slate-400">Best Immersive web project with Wonderland.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section ref={timelineRef} id="timeline" className={`py-20 md:py-32 bg-black/20 overflow-hidden transition-all duration-700 ease-in-out ${isTimelineVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <Timeline />
                </section>
                
                {/* Sponsor Section */}
                <section ref={sponsorsRef} id="sponsors" className={`py-20 md:py-32`}>
                    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-500 ease-in-out ${isSponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h2 className={`text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-500 ease-in-out delay-100 ${isSponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Our <span className="text-cyan-400">Sponsor</span></h2>
                        <p className={`max-w-3xl mx-auto text-lg text-slate-300 mb-10 leading-relaxed transition-all duration-500 ease-in-out delay-200 ${isSponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            A huge thank you to our incredible sponsor for supporting HACKNOVA 2025 and helping us make this event a reality!
                        </p>
                        <div className={`flex flex-col items-center justify-center p-8 border border-pink-500/30 bg-white-300/ rounded-lg shadow-lg max-w-lg mx-auto transition-all duration-500 ease-in-out delay-300 ${isSponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <img src={wonderLandLogoText} alt="Create Worlds logo" className="w-48 h-auto mb-6 rounded-md shadow-md" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/192x72/0D0A1C/94A3B8?text=Create+Worlds'; }} />
                            <div className="text-center text-slate-400">
                                <p className="text-xl font-bold text-white mb-2">Create Worlds</p>
                                <p className="text-sm">aDBA Robot Invader, Inc.</p>
                                <p className="text-sm">10080 N. Wolfe Rd. Suite SW3-200</p>
                                <p className="text-sm">Cupertino California 95014</p>
                                <p className="text-sm">USA</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}