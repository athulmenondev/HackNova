import React, { useState, useEffect, useRef } from "react";

const AnimatedMenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-6 h-5 flex items-center justify-center">
    <span
      className={`absolute block w-full h-[2px] bg-current transition-all duration-300 ease-in-out ${
        isOpen ? "rotate-45" : "-translate-y-2"
      }`}
    ></span>
    <span
      className={`absolute block w-full h-[2px] bg-current transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-0" : ""
      }`}
    ></span>
    <span
      className={`absolute block w-full h-[2px] bg-current transition-all duration-300 ease-in-out ${
        isOpen ? "-rotate-45" : "translate-y-2"
      }`}
    ></span>
  </div>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [highlightStyle, setHighlightStyle] = useState<{}>({});
  const [highlightOpacity, setHighlightOpacity] = useState<number>(1);

  const navRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const navLinks = [
    { href: "#about", text: "About" },
    { href: "#highlights", text: "Highlights" },
    { href: "#prizes", text: "Prizes" },
    { href: "#timeline", text: "Timeline" },
    { href: "#sponsors", text: "Sponsors" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setActiveLink(href);

    if (href === "#home") {
      // Remove highlight when HACKNOVA is clicked
      setActiveLink(null);
      setHighlightStyle({});
    }

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (navRef.current && (hoveredLink || activeLink)) {
      const targetHref = hoveredLink ?? activeLink;
      const activeEl = navRef.current.querySelector(
        `a[href="${targetHref}"]`
      ) as HTMLElement;

      if (activeEl) {
        setHighlightStyle({
          width: activeEl.offsetWidth,
          left: activeEl.offsetLeft,
        });
      }

      // Adjust opacity based on hover
      if (!hoveredLink && activeLink) {
        setHighlightOpacity(0.5);
      } else {
        setHighlightOpacity(1);
      }
    } else {
      setHighlightStyle({});
    }
  }, [hoveredLink, activeLink]);

  // ✨ NEW: EFFECT FOR SCROLL-BASED ACTIVE LINK HIGHLIGHTING
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          // Set activeLink to null for the 'home' section to remove highlight
          setActiveLink(id === "home" ? null : `#${id}`);
        }
      });
    };

    // This creates a "trigger line" in the middle of the viewport.
    // A section becomes active when its center crosses this line.
    const observer = new IntersectionObserver(handleIntersect, {
      root: null, // observes intersections relative to the viewport
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    });

    // Observe all sections, including a "home" section at the top
    const allLinks = [{ href: "#home" }, ...navLinks];
    allLinks.forEach((link) => {
      const section = document.getElementById(link.href.substring(1));
      if (section) {
        observer.observe(section);
      }
    });

    // Cleanup function to disconnect the observer
    return () => observer.disconnect();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <header ref={headerRef} className="fixed w-full z-20 top-0 left-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="border border-white/20 bg-[#0D0A1C]/50 backdrop-blur-sm rounded-xl">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex-shrink-0">
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "#home")}
                className="navbar-title-font text-3xl sm:text-5xl font-bold text-white tracking-widest transition-all duration-300 hover:text-cyan-400 navbar-brand-glow"
              >
                HACKNOVA
              </a>
            </div>

            {/* NAV LINKS */}
            <nav ref={navRef} className="hidden md:flex md:space-x-8 relative">
              {/* Highlight Box */}
              {Object.keys(highlightStyle).length > 0 && (
                <span
                  className="absolute top-1/2 -translate-y-1/2 h-8 rounded-lg bg-white shadow-[0_0_15px_rgba(34,211,238,0.6)] transition-all duration-300 ease-in-out"
                  style={{ ...highlightStyle, opacity: highlightOpacity }}
                ></span>
              )}

              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative z-10 px-2 py-1 text-slate-300 font-bold hover:text-black transition duration-150 ease-in-out uppercase text-sm tracking-wider ${
                    activeLink === link.href ? "text-black" : ""
                  }`}
                >
                  {link.text}
                </a>
              ))}
            </nav>

            <div className="flex items-center">
              <a
                href="https://forms.gle/FwDfucXJxgxrcJ9S6"//add the gforms link here
                className="hidden sm:inline-block bg-pink-600 text-white font-bold px-5 py-2 rounded-md hover:bg-pink-700 transition duration-150 ease-in-out shadow-[0_0_15px_rgba(219,39,119,0.4)] text-sm uppercase tracking-wider"
              >
                Register
              </a>
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="ml-4 p-2 rounded-md text-slate-300 focus:outline-none"
                >
                  <AnimatedMenuIcon isOpen={isMenuOpen} />
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE MENU */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${
              isMenuOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="border-t border-slate-800">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 text-center uppercase tracking-wider"
                  >
                    {link.text}
                  </a>
                ))}
                <div className="p-4">
                  <a
                    href="#"
                    className="block w-full text-center bg-pink-600 text-white font-bold px-4 py-3 rounded-lg hover:bg-pink-700 transition duration-150 ease-in-out uppercase tracking-wider"
                  >
                    Register
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}