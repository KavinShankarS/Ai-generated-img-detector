export default function About() {

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.15.066a2.25 2.25 0 011.086 2.585l-.108.388a2.25 2.25 0 01-1.49 1.49l-.388.108a2.25 2.25 0 01-2.585-1.086l-.066-.15a2.25 2.25 0 00-2.059-1.357H5m14.25 11.396v-5.714a2.25 2.25 0 00-.659-1.591L15 9.5" />
        </svg>
      ),
      title: 'Pixel-Level Analysis',
      desc: 'Our model examines every pixel of your image, detecting invisible patterns left behind by AI generators that the human eye cannot see.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
        </svg>
      ),
      title: 'Side-by-Side Comparison',
      desc: 'Upload two images and compare them simultaneously. See exactly which one is AI generated and by how much — with detailed score breakdowns.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
        </svg>
      ),
      title: 'Attention Heatmap',
      desc: 'See exactly where our AI focused when making its decision. Red regions indicate the areas that most influenced the verdict — giving you full transparency.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: 'Zero Bias Detection',
      desc: 'Trained on a perfectly balanced dataset, our model predicts both real and AI generated images with equal confidence — no one-sided results.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
        </svg>
      ),
      title: 'Detailed Property Scores',
      desc: 'Beyond a simple verdict, get a full breakdown — lighting consistency, texture smoothness, edge sharpness, color distribution and noise pattern scores.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ),
      title: 'Light and Dark Mode',
      desc: 'Fully designed for both light and dark environments. Switch between themes instantly with a single click — your preference is remembered.'
    },
  ]

  const steps = [
    {
      num: '01',
      title: 'Upload Your Image',
      desc: 'Drag and drop or select any JPG or PNG image from your device. No sign-up required.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      )
    },
    {
      num: '02',
      title: 'AI Scans the Image',
      desc: 'Our detection engine analyzes pixel patterns, lighting, textures, edges and color distribution in seconds.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      num: '03',
      title: 'Get Your Verdict',
      desc: 'Receive a clear REAL or AI GENERATED result with a confidence score and full property breakdown.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      num: '04',
      title: 'See Where AI Looked',
      desc: 'View the attention heatmap to understand exactly which regions of the image influenced the decision.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        </svg>
      )
    },
  ]

  const stats = [
    { value: '94.45%', label: 'Detection Accuracy' },
    { value: '< 2s', label: 'Analysis Time' },
    { value: '0%', label: 'Prediction Bias' },
    { value: '5', label: 'Property Scores' },
  ]

  const team = [
    { name: 'Kavin Shankar', role: 'Model Training · Backend · Frontend' },
    { name: 'Team Member 2', role: 'UI Design · Research' },
    { name: 'Team Member 3', role: 'Dataset · Evaluation' },
  ]

  return (
    <div className="py-10">

      {/* Hero */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-[#00d4aa]/10 border border-[#00d4aa]/30 rounded-full px-4 py-1.5 text-xs font-semibold text-[#00d4aa] tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] animate-pulse inline-block" />
          About ImageForensic
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
          Can you trust<br />
          <span className="text-[#00d4aa]">what you see?</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          ImageForensic is an AI-powered image authenticity detector. Upload any image and our system will tell you with evidence whether it was captured by a real camera or generated by artificial intelligence.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {stats.map((s, i) => (
          <div key={i} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold text-[#00d4aa] mb-1">{s.value}</p>
            <p className="text-xs text-gray-400 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* What We Do */}
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold text-[#00d4aa] uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-5 leading-tight tracking-tight">
              Deep image source analysis — beyond what the eye can see
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              Our detector goes far beyond a simple real-or-fake verdict. It examines pixel-level patterns invisible to the human eye — the subtle artifacts, unnatural smoothness, and lighting inconsistencies that AI generators leave behind.
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
              Trained on images from the world's leading AI generators including Stable Diffusion, DALL-E 3, and MidJourney v6, ImageForensic offers detection coverage across the most advanced models available today.
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Every result comes with a full property breakdown and an attention heatmap — showing you not just what we found, but exactly where we found it.
            </p>
          </div>
          {/* Visual flowchart */}
          <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">How detection works</p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Image uploaded', color: '#00d4aa', icon: '↑' },
                { label: 'Pixel pattern extraction', color: '#00b894', icon: '⊞' },
                { label: 'Lighting & texture analysis', color: '#0984e3', icon: '◈' },
                { label: 'Attention map generation', color: '#6c5ce7', icon: '◎' },
                { label: 'Confidence score output', color: '#00d4aa', icon: '✓' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ background: step.color }}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1 bg-white dark:bg-white/5 rounded-xl px-4 py-2.5 border border-gray-100 dark:border-white/10">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{step.label}</p>
                  </div>
                  {i < 4 && (
                    <div className="absolute ml-4 mt-10">
                    </div>
                  )}
                </div>
              ))}
              {/* Connecting line visual */}
              <div className="flex items-center gap-4 mt-1">
                <div className="w-9 flex-shrink-0 flex justify-center">
                  <div className="w-0.5 h-6 bg-[#00d4aa]/30 rounded-full" />
                </div>
                <p className="text-xs text-gray-400">Result delivered in under 2 seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-[#00d4aa] uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Everything you need to verify authenticity
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={i} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 hover:border-[#00d4aa]/40 transition-colors duration-200">
              <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 flex items-center justify-center text-[#00d4aa] mb-4">
                {f.icon}
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Steps */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-[#00d4aa] uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            From upload to verdict in seconds
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-[#00d4aa]/10 flex items-center justify-center text-[#00d4aa] mb-4">
                  {step.icon}
                </div>
                <p className="text-xs font-bold text-[#00d4aa] mb-2">{step.num}</p>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 w-6 items-center justify-center z-10">
                  <svg className="w-4 h-4 text-[#00d4aa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* What We Detect */}
      <div className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              title: 'AI Generated',
              desc: 'Fully synthetic images created from text prompts using tools like DALL-E, MidJourney, or Stable Diffusion.',
              color: '#ef4444',
              bg: 'bg-red-50 dark:bg-red-950/20',
              border: 'border-red-200 dark:border-red-900/40'
            },
            {
              title: 'Real Photograph',
              desc: 'Authentic images captured by a real camera — showing natural noise, grain, and lighting imperfections.',
              color: '#10b981',
              bg: 'bg-emerald-50 dark:bg-emerald-950/20',
              border: 'border-emerald-200 dark:border-emerald-900/40'
            },
            {
              title: 'Uncertain',
              desc: 'Images where confidence is below threshold — heavily edited photos, extreme filters, or unusual compositions.',
              color: '#f59e0b',
              bg: 'bg-amber-50 dark:bg-amber-950/20',
              border: 'border-amber-200 dark:border-amber-900/40'
            },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} border ${item.border} rounded-2xl p-6`}>
              <div className="w-3 h-3 rounded-full mb-4" style={{ background: item.color }} />
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mb-10">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-[#00d4aa] uppercase tracking-widest mb-3">The Team</p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Built with care
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {team.map((member, i) => (
            <div key={i} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-xl font-bold text-[#00d4aa]">{member.name[0]}</span>
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{member.name}</p>
              <p className="text-xs text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}