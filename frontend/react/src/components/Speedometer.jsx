export default function Speedometer({ value }) {
  const radius = 80
  const stroke = 10
  const normalizedRadius = radius - stroke / 2
  const circumference = Math.PI * normalizedRadius
  const progress = ((100 - value) / 100) * circumference

  const getColor = (val) => {
    if (val < 40) return '#10b981'
    if (val < 65) return '#f59e0b'
    return '#ef4444'
  }

  const color = getColor(value)

  const angle = (value / 100) * 180 - 90
  const rad = (angle * Math.PI) / 180
  const needleX = 100 + 60 * Math.cos(rad)
  const needleY = 100 + 60 * Math.sin(rad)

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="110" viewBox="0 0 200 110">
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="dark:stroke-white/10"
        />
        {/* Colored arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.5s ease' }}
        />
        {/* Needle */}
        <line
          x1="100"
          y1="100"
          x2={needleX}
          y2={needleY}
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ transition: 'all 1s ease' }}
        />
        {/* Center dot */}
        <circle cx="100" cy="100" r="5" fill={color} />
        {/* Labels */}
        <text x="18" y="118" fontSize="10" fill="#9ca3af" textAnchor="middle">Real</text>
        <text x="182" y="118" fontSize="10" fill="#9ca3af" textAnchor="middle">Fake</text>
      </svg>
      <p className="text-2xl font-bold mt-1" style={{ color }}>
        {value.toFixed(1)}%
      </p>
      <p className="text-xs text-gray-400 mt-0.5">AI Generated Score</p>
    </div>
  )
}