export default function App() {
  return (
    <div className="bg-gray-900 text-white font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-950 bg-opacity-90 backdrop-blur-md shadow z-50">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-16">
          <span className="text-xl font-extrabold text-cyan-400">HackSTACS</span>
          <div className="space-x-6 hidden md:flex">
            <a href="#home" className="hover:text-cyan-400 transition">Home</a>
            <a href="#about" className="hover:text-cyan-400 transition">About</a>
            <a href="#schedule" className="hover:text-cyan-400 transition">Schedule</a>
            <a href="#prizes" className="hover:text-cyan-400 transition">Prizes</a>
            <a href="#register" className="hover:text-cyan-400 transition">Register</a>
            <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
          </div>
        </div>
      </nav>
      <h1 className="text-6xl font-bold text-red-500">Hello HackSTACS tailwind testing!</h1>

      {/* Hero */}
      <section id="home" className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-gray-900 to-gray-800 pt-16">
        <h1 className="text-5xl font-extrabold text-cyan-400">HackSTACS 2025</h1>
        <p className="mt-4 text-lg text-gray-300">Build. Break. Innovate.</p>
        <p className="mt-2 text-gray-400">Organized by STACS, Dept. of CSE</p>
        <p className="mt-2 text-gray-400">📍 College Auditorium | 🗓️ Sept 15-16, 2025</p>
        <a
          href="#register"
          className="mt-6 px-6 py-3 bg-cyan-500 text-black rounded-xl font-bold hover:bg-cyan-400 transition"
        >
          Register Now
        </a>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-cyan-400">About the Hackathon</h2>
        <p className="mt-4 text-gray-300">
          HackSTACS 2025 is the flagship hackathon organized by STACS, CSE Department.
          A 24-hour coding marathon where innovation meets creativity.
        </p>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-16 bg-gray-800 px-8">
        <h2 className="text-3xl font-bold text-center text-cyan-400">Schedule</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
          {[
            { title: "Day 1", desc: "Inauguration & Team Formation", time: "9:00 AM" },
            { title: "Hack Begins", desc: "Coding Marathon", time: "10:00 AM" },
            { title: "Day 2", desc: "Final Pitches & Prizes", time: "2:00 PM" },
          ].map((item, i) => (
            <div key={i} className="p-6 bg-gray-900 rounded-xl shadow">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-gray-300">{item.desc}</p>
              <p className="text-gray-400">{item.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Prizes */}
      <section id="prizes" className="py-16 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-cyan-400">Prizes</h2>
        <p className="mt-4 text-gray-300">
          Exciting prizes for winners and certificates for all participants 🎉
        </p>
      </section>

      {/* Registration */}
      <section id="register" className="py-16 bg-gray-800 px-8 text-center">
        <h2 className="text-3xl font-bold text-cyan-400">Register</h2>
        <p className="mt-4 text-gray-300">Form a team of up to 4 members and register below:</p>
        <a
          href="https://forms.gle/your-form-link"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block px-6 py-3 bg-cyan-500 text-black rounded-xl font-bold hover:bg-cyan-400 transition"
        >
          Fill Google Form
        </a>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 px-8 text-center">
        <h2 className="text-3xl font-bold text-cyan-400">Contact Us</h2>
        <p className="mt-4 text-gray-300">📧 stacs@yourcollege.edu</p>
        <p className="mt-2 text-gray-300">📱 +91 98765 43210</p>
        <p className="mt-2 text-gray-400">Follow us on Instagram: @stacs_cse</p>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center bg-gray-900 text-gray-500 text-sm">
        © 2025 STACS CSE Organization | Made with ❤️ for Hackathon
      </footer>
    </div>
  );
}
