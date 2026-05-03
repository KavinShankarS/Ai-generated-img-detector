import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation()

  const navLinks = [
    { label: 'Analyze', path: '/' },
    { label: 'Compare', path: '/compare' },
    { label: 'About', path: '/about' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00d4aa] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
            Image<span className="text-[#00d4aa]">Forensic</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-[#00d4aa]'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Dark mode toggle */}
<button
  onClick={() => setDarkMode(!darkMode)}
  className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none flex-shrink-0"
  style={{ background: darkMode ? '#1a1a2e' : '#87CEEB' }}
>
  {/* Background details */}
  {!darkMode && (
    <span className="absolute inset-0 rounded-full overflow-hidden">
      <span className="absolute bottom-0 left-0 right-0 h-2 rounded-b-full bg-white/40" />
    </span>
  )}
  {darkMode && (
    <span className="absolute inset-0 rounded-full overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${2 + (i % 2)}px`,
            height: `${2 + (i % 2)}px`,
            top: `${15 + (i * 13) % 20}%`,
            left: `${10 + (i * 17) % 60}%`,
            opacity: 0.7
          }}
        />
      ))}
    </span>
  )}

  {/* Sliding circle with sun/moon */}
  <span
    className="absolute top-0.5 w-6 h-6 rounded-full shadow-md transition-all duration-300 flex items-center justify-center"
    style={{
      transform: darkMode ? 'translateX(30px)' : 'translateX(2px)',
      background: darkMode
        ? 'linear-gradient(135deg, #c8c8e8, #e8e8f0)'
        : 'linear-gradient(135deg, #FFD700, #FFA500)',
      boxShadow: darkMode
        ? '0 0 6px rgba(200,200,240,0.6)'
        : '0 0 8px rgba(255,200,0,0.8)'
    }}
  >
    {darkMode ? (
      /* Moon shape using clip */
      <span
        className="block w-4 h-4 rounded-full"
        style={{
          background: 'transparent',
          boxShadow: '-3px 1px 0 2px #c8c8e8',
          transform: 'rotate(-30deg) scale(0.55)'
        }}
      />
    ) : (
      /* Sun rays */
      <span className="block w-3 h-3 rounded-full bg-yellow-300" />
    )}
  </span>
</button>

      </div>
    </nav>
  )
}