import { useState, useRef } from 'react'
import axios from 'axios'
import Speedometer from '../components/Speedometer'

export default function CompareAnalysis() {
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [preview1, setPreview1] = useState(null)
  const [preview2, setPreview2] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [modalSrc, setModalSrc] = useState(null)
  const fileRef1 = useRef()
  const fileRef2 = useRef()

  const handleFile = (file, slot) => {
    if (!file) return
    if (slot === 1) {
      setImage1(file)
      setPreview1(URL.createObjectURL(file))
    } else {
      setImage2(file)
      setPreview2(URL.createObjectURL(file))
    }
    setResult(null)
    setError(null)
  }

  const removeImage = (slot, e) => {
    e.stopPropagation()
    if (slot === 1) {
      setImage1(null)
      setPreview1(null)
      fileRef1.current.value = ''
    } else {
      setImage2(null)
      setPreview2(null)
      fileRef2.current.value = ''
    }
    setResult(null)
  }

  const compare = async () => {
    if (!image1 || !image2) return
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('file1', image1)
      formData.append('file2', image2)
      const res = await axios.post('http://127.0.0.1:8000/compare', formData)
      setResult(res.data)
    } catch (err) {
      setError('Failed to connect to backend. Make sure the server is running.')
    }
    setLoading(false)
  }

  const UploadSlot = ({ slot, image, preview, fileRef }) => (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
        Image {slot}
      </p>
      <div
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0], slot) }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => !preview && fileRef.current.click()}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-200 min-h-[200px] flex flex-col items-center justify-center ${
          preview
            ? 'border-[#00d4aa]/40 cursor-default'
            : 'border-gray-200 dark:border-white/10 cursor-pointer hover:border-[#00d4aa] hover:bg-[#00d4aa]/5'
        }`}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt={`preview ${slot}`}
              className="max-h-48 rounded-xl object-contain mx-auto cursor-zoom-in"
              onClick={() => setModalSrc(preview)}
            />
            <button
              onClick={(e) => removeImage(slot, e)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold flex items-center justify-center transition-colors"
            >
              x
            </button>
            <p
              className="text-xs text-gray-400 mt-2 cursor-pointer hover:text-[#00d4aa]"
              onClick={() => setModalSrc(preview)}
            >
              Click to preview full size
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Drop image {slot} here
            </p>
            <p className="text-xs text-gray-400">JPG, JPEG, PNG</p>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0], slot)}
        />
      </div>
      {image && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 px-3 py-1.5 rounded-full">{image.name}</span>
          <span className="text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 px-3 py-1.5 rounded-full">{(image.size / 1024).toFixed(1)} KB</span>
        </div>
      )}
    </div>
  )

  const ResultCard = ({ data, label, preview }) => (
    <div className={`rounded-2xl p-5 border ${
      data.prediction === 'FAKE'
        ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40'
        : data.prediction === 'REAL'
        ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
        : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10'
    }`}>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">{label}</p>
      <h3 className={`text-2xl font-bold tracking-tight mb-4 ${
        data.prediction === 'FAKE' ? 'text-red-500' :
        data.prediction === 'REAL' ? 'text-emerald-500' :
        'text-gray-400'
      }`}>
        {data.display_text}
      </h3>

      <Speedometer value={data.fake_score} />

      {/* Score Breakdown */}
      <div className="mt-4 grid grid-cols-1 gap-2">
        {[
          { label: 'AI Generated', value: data.fake_score, color: '#ef4444' },
          { label: 'Real Image', value: data.real_score, color: '#10b981' },
          { label: 'Confidence', value: data.confidence, color: '#00d4aa' },
        ].map((item, i) => (
          <div key={i} className="bg-white/60 dark:bg-white/5 rounded-xl p-3 flex items-center justify-between">
            <p className="text-xs text-gray-400">{item.label}</p>
            <div className="flex items-center gap-3">
              <div className="w-24 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${item.value}%`, backgroundColor: item.color }}
                />
              </div>
              <p className="text-sm font-bold w-12 text-right" style={{ color: item.color }}>
                {item.value.toFixed(1)}%
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Property Scores */}
      {data.properties && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Property Analysis</p>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Lighting', key: 'lighting_consistency' },
              { label: 'Texture', key: 'texture_smoothness' },
              { label: 'Edges', key: 'edge_sharpness' },
              { label: 'Color', key: 'color_distribution' },
              { label: 'Noise', key: 'noise_pattern' },
            ].map((item, i) => {
              const value = data.properties[item.key]
              const color = value > 70 ? '#ef4444' : value > 40 ? '#f59e0b' : '#10b981'
              return (
                <div key={i} className="flex items-center justify-between gap-3">
                  <p className="text-xs text-gray-400 w-16 flex-shrink-0">{item.label}</p>
                  <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${value}%`, backgroundColor: color }}
                    />
                  </div>
                  <p className="text-xs font-bold w-10 text-right flex-shrink-0" style={{ color }}>
                    {value.toFixed(0)}%
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Heatmap */}
      {data.heatmap && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Attention Map</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-400 mb-1.5 text-center">Original</p>
              {preview && (
                <img
                  src={preview}
                  alt="original"
                  className="w-full rounded-xl object-contain border border-gray-100 dark:border-white/10"
                />
              )}
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1.5 text-center">Attention</p>
              <img
                src={data.heatmap}
                alt="heatmap"
                className="w-full rounded-xl object-contain border border-gray-100 dark:border-white/10"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">Red = high attention · Blue = low</p>
        </div>
      )}

    </div>
  )

  return (
    <div className="py-10">

      {/* Modal */}
      {modalSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          onClick={() => setModalSrc(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setModalSrc(null)}
              className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm font-medium"
            >
              Close
            </button>
            <img src={modalSrc} alt="full preview" className="w-full rounded-2xl object-contain max-h-[80vh]" />
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#00d4aa]/10 border border-[#00d4aa]/30 rounded-full px-4 py-1.5 text-xs font-semibold text-[#00d4aa] tracking-widest uppercase mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] animate-pulse inline-block" />
          Side by Side Comparison
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Compare <span className="text-[#00d4aa]">two images</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto leading-relaxed">
          Upload two images and see a detailed side-by-side analysis of which one is AI generated.
        </p>
      </div>

      {/* Upload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <UploadSlot slot={1} image={image1} preview={preview1} fileRef={fileRef1} />
        <UploadSlot slot={2} image={image2} preview={preview2} fileRef={fileRef2} />
      </div>

      {/* Compare Button */}
      <button
        onClick={compare}
        disabled={!image1 || !image2 || loading}
        className="w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mb-4"
        style={{
          background: image1 && image2 && !loading ? 'linear-gradient(135deg, #00d4aa, #00b894)' : undefined,
          backgroundColor: !image1 || !image2 || loading ? '#e5e7eb' : undefined,
          color: image1 && image2 && !loading ? 'white' : '#9ca3af'
        }}
      >
        {loading ? 'Comparing...' : 'Compare Images'}
      </button>

      {error && <p className="text-xs text-red-400 text-center mb-4">{error}</p>}

      {/* Loading */}
      {loading && (
        <div className="border border-gray-100 dark:border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-[#00d4aa] border-t-transparent animate-spin" />
          <p className="text-sm text-gray-400">Analyzing both images...</p>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Comparison Results</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResultCard data={result.image1} label="Image 1" preview={preview1} />
            <ResultCard data={result.image2} label="Image 2" preview={preview2} />
          </div>

          {/* Winner Banner */}
          <div className="mt-6 rounded-2xl p-5 bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-center">
            <p className="text-xs font-semibold text-[#00d4aa] uppercase tracking-widest mb-1">Verdict</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {result.image1.fake_score > result.image2.fake_score
                ? `Image 1 is more likely AI Generated (${result.image1.fake_score.toFixed(1)}% vs ${result.image2.fake_score.toFixed(1)}%)`
                : result.image2.fake_score > result.image1.fake_score
                ? `Image 2 is more likely AI Generated (${result.image2.fake_score.toFixed(1)}% vs ${result.image1.fake_score.toFixed(1)}%)`
                : 'Both images have similar AI scores'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  )
}