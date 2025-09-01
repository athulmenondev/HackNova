import React from 'react';

// Helper component for SVG icons
const Icons = {
    Twitter: () => (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
    ),
    Globe: () => (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM4 12c0-.62.084-1.22.24-1.795h15.52c.156.575.24 1.175.24 1.795s-.084 1.22-.24 1.795H4.24A9.955 9.955 0 014 12zm1.206 3.795c.783 2.52 2.872 4.47 5.488 5.105A8.002 8.002 0 0112 20a8.002 8.002 0 01-1.294-.105c2.616-.635 4.705-2.585 5.488-5.105H5.206zM18.794 8.205c-.783-2.52-2.872-4.47-5.488-5.105A8.002 8.002 0 0112 4c.45 0 .89.035 1.313.102C15.929 4.737 18.018 6.687 18.794 9.205v-1z" clipRule="evenodd" /></svg>
    ),
    Github: () => (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
    )
};

export default function Footer() {
    return (
      <footer className="relative z-10 border-t border-slate-800/50 bg-[#0D0A1C]/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Column 1: About */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 tracking-wider">HACKNOVA</h3>
              <p className="text-slate-400 text-sm">
                Presented by STACS <br />
                NSS College of Engineering, Palakkad
              </p>
            </div>

            {/* Column 2: Contact */}
            <div>
              <h4 className="font-semibold text-cyan-400 mb-3 uppercase tracking-widest">Contact</h4>
              <ul className="space-y-2 text-sm">
                  <li><p className="text-slate-300">Harikrishnan A, Chairman</p></li>
                  <li><a href="mailto:stacs@nssce.ac.in" className="text-slate-400 hover:text-pink-400">stacs@nssce.ac.in</a></li>
                  <li><a href="tel:+918921349882" className="text-slate-400 hover:text-pink-400">+91 89213 49882</a></li>
              </ul>
            </div>

            {/* Column 3: Follow Us */}
            <div>
              <h4 className="font-semibold text-cyan-400 mb-3 uppercase tracking-widest">Follow Us</h4>
              <div className="flex justify-center md:justify-start space-x-6">
                <a href="https://stacs.nssce.ac.in/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-400 transition-colors"><Icons.Globe /></a>
                <a href="https://twitter.com/stacsnssce" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-400 transition-colors"><Icons.Twitter /></a>
                <a href="#" className="text-slate-400 hover:text-pink-400 transition-colors"><Icons.Github /></a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2025 STACS, NSS College of Engineering. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };

