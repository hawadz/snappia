"use client"

import { useLocation, useNavigate, Link } from "react-router-dom"
import { useState, useRef } from "react"
import { Download, RotateCcw, Share2 } from "lucide-react"
import html2canvas from "html2canvas"
import { Rnd } from "react-rnd"

// Layouts
const layouts = [
  // STRIPS
  {
    id: "strip-3", group: "Strip", name: "3 Photos", cols: 1, rows: 3, slots: [
      { x: 0, y: 0, w: 1, h: 1 }, { x: 0, y: 1, w: 1, h: 1 }, { x: 0, y: 2, w: 1, h: 1 }
    ]
  },
  {
    id: "strip-4", group: "Strip", name: "4 Photos", cols: 1, rows: 4, slots: [
      { x: 0, y: 0, w: 1, h: 1 }, { x: 0, y: 1, w: 1, h: 1 },
      { x: 0, y: 2, w: 1, h: 1 }, { x: 0, y: 3, w: 1, h: 1 }
    ]
  },
  {
    id: "strip-5", group: "Strip", name: "5 Photos", cols: 1, rows: 5, slots: [
      { x: 0, y: 0, w: 1, h: 1 }, { x: 0, y: 1, w: 1, h: 1 },
      { x: 0, y: 2, w: 1, h: 1 }, { x: 0, y: 3, w: 1, h: 1 }, { x: 0, y: 4, w: 1, h: 1 }
    ]
  },

  // POSTCARD
  {
    id: "postcard-2", group: "Postcard", name: "2 Photos", cols: 1, rows: 2, slots: [
      { x: 0, y: 0, w: 1, h: 1 }, { x: 0, y: 1, w: 1, h: 1 }
    ]
  },
  {
    id: "postcard-3", group: "Postcard", name: "3 Photos", cols: 2, rows: 2, slots: [
      { x: 0, y: 0, w: 2, h: 1 }, { x: 0, y: 1, w: 1, h: 1 }, { x: 1, y: 1, w: 1, h: 1 }
    ]
  },
  {
    id: "postcard-4", group: "Postcard", name: "4 Photos", cols: 2, rows: 2, slots: [
      { x: 0, y: 0, w: 1, h: 1 }, { x: 1, y: 0, w: 1, h: 1 },
      { x: 0, y: 1, w: 1, h: 1 }, { x: 1, y: 1, w: 1, h: 1 }
    ]
  },
  {
    id: "postcard-6", group: "Postcard", name: "6 Photos", cols: 2, rows: 3, slots: [
      { x: 0, y: 0, w: 1, h: 1 }, { x: 1, y: 0, w: 1, h: 1 },
      { x: 0, y: 1, w: 1, h: 1 }, { x: 1, y: 1, w: 1, h: 1 },
      { x: 0, y: 2, w: 1, h: 1 }, { x: 1, y: 2, w: 1, h: 1 }
    ]
  },

  // GRID
  { id: "grid-1", group: "Grid", name: "1 Photo", cols: 1, rows: 1, slots: [{ x: 0, y: 0, w: 1, h: 1 }] },
  {
    id: "grid-4", group: "Grid", name: "4 Grid", cols: 2, rows: 2, slots: [
      { x: 0, y: 0, w: 1, h: 1 }, { x: 1, y: 0, w: 1, h: 1 },
      { x: 0, y: 1, w: 1, h: 1 }, { x: 1, y: 1, w: 1, h: 1 }
    ]
  },
  {
    id: "grid-9", group: "Grid", name: "9 Grid", cols: 3, rows: 3, slots: Array.from({ length: 9 }, (_, i) => ({
      x: i % 3, y: Math.floor(i / 3), w: 1, h: 1
    }))
  },

  // UNIQUE
  {
    id: "big-small", group: "Unique", name: "1 Big + 2 Small", cols: 2, rows: 2, slots: [
      { x: 0, y: 0, w: 2, h: 1 }, { x: 0, y: 1, w: 1, h: 1 }, { x: 1, y: 1, w: 1, h: 1 }
    ]
  },
  {
    id: "side-by-side", group: "Unique", name: "Side by Side", cols: 2, rows: 1, slots: [
      { x: 0, y: 0, w: 1, h: 1 }, { x: 1, y: 0, w: 1, h: 1 }
    ]
  },
]

// Frame colors (HEX only ✅)
const frameColors = [
  "#ffffff", "#000000", "#ff69b4", "#ffb6c1", "#f28b82",
  "#a7a5ff", "#9370db", "#aee1f9", "#90ee90", "#fdd663"
]

// Stickers
const stickerOptions = [
  "https://cdn-icons-png.flaticon.com/512/742/742751.png",
  "https://cdn-icons-png.flaticon.com/512/833/833472.png",
  "https://cdn-icons-png.flaticon.com/512/2584/2584605.png",
  "https://cdn-icons-png.flaticon.com/512/2584/2584657.png",
]

export default function Editor() {
  const location = useLocation()
  const navigate = useNavigate()
  const photos = location.state?.photos || []
  const captureRef = useRef(null)

  const [selectedLayout, setSelectedLayout] = useState("strip-3")
  const [frameColor, setFrameColor] = useState("#ffffff")
  const [stickers, setStickers] = useState([])
  const [openDropdown, setOpenDropdown] = useState(false)

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-pink-100 to-white">
        <p className="text-gray-600">No photos captured yet.</p>
        <button
          onClick={() => navigate("/booth")}
          className="mt-4 px-5 py-2 rounded-full bg-pink-500 text-white font-semibold shadow-md hover:bg-pink-600 transition"
        >
          Back to Booth
        </button>
      </div>
    )
  }

  const layout = layouts.find(l => l.id === selectedLayout) || layouts[0]

  const captureCanvas = async () => {
    return await html2canvas(captureRef.current, {
      useCORS: true,
      scale: 2,
      backgroundColor: frameColor || "#ffffff",
    })
  }

  const handleDownload = async () => {
    if (!captureRef.current) return
    const canvas = await captureCanvas()
    const link = document.createElement("a")
    link.download = `snappia-${Date.now()}.jpg`
    link.href = canvas.toDataURL("image/jpeg", 1.0)
    link.click()
  }

  const handleShare = async () => {
    if (!captureRef.current || !navigator.canShare) return
    const canvas = await captureCanvas()
    const blob = await new Promise(res => canvas.toBlob(res, "image/jpeg", 0.95))
    const file = new File([blob], `snappia-${Date.now()}.jpg`, { type: "image/jpeg" })
    await navigator.share({ files: [file], title: "Snappia Photo", text: "Check out my Snappia photo!" })
  }

  const addSticker = (src) => {
    setStickers([...stickers, { id: Date.now(), src, x: 40, y: 40, width: 60, height: 60 }])
  }

  const groupedLayouts = layouts.reduce((acc, l) => {
    acc[l.group] = acc[l.group] || []
    acc[l.group].push(l)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-white to-pink-50 font-sans">
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50 border-b border-pink-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-xl font-bold text-pink-500">Snappia</h1>
          <nav className="space-x-4 text-gray-700 text-base font-medium">
            <Link to="/" className="hover:text-pink-500">Home</Link>
            <Link to="/booth" className="hover:text-pink-500">Booth</Link>
            <span className="text-pink-500 font-semibold">Editor</span>
          </nav>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-6xl mx-auto flex flex-1 gap-8 p-6 items-start">
        {/* Preview */}
        <div className="flex-[1.3] flex flex-col items-center">
          <div
            ref={captureRef}
            className="relative shadow-xl border border-gray-200"
            style={{
              backgroundColor: frameColor,
              padding: "8px",
              width: "320px",
              aspectRatio: `${layout.cols}/${layout.rows}`,
              maxHeight: layout.id.startsWith("strip") ? "400px" : "500px"
            }}
          >
            <div
              className="grid gap-0.5 w-full h-full"
              style={{
                gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
                gridTemplateRows: `repeat(${layout.rows}, 1fr)`
              }}
            >
              {layout.slots.map((s, i) => {
                const photoSrc = photos[i % photos.length]
                return (
                  <div
                    key={i}
                    className="relative bg-gray-200 border"
                    style={{
                      gridColumn: `${s.x + 1}/span ${s.w}`,
                      gridRow: `${s.y + 1}/span ${s.h}`
                    }}
                  >
                    {photoSrc && <img src={photoSrc} alt={`Photo ${i}`} className="w-full h-full object-cover" />}
                  </div>
                )
              })}
            </div>

            {/* Stickers */}
            {stickers.map(s => (
              <Rnd key={s.id} bounds="parent" default={{ x: s.x, y: s.y, width: s.width, height: s.height }} className="absolute">
                <img src={s.src} alt="Sticker" className="w-full h-full object-contain" />
              </Rnd>
            ))}

            {/* Watermark */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded bg-white/60 text-gray-800">
              Snappia © 2025
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4 w-full justify-center">
            <button
              onClick={() => navigate("/booth")}
              className="flex-1 py-2 rounded-lg text-sm font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" /> Retake
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 py-2 rounded-lg text-sm font-semibold shadow-lg bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center gap-2 transition"
            >
              <Download className="w-4 h-4" /> Download
            </button>
            <button
              onClick={handleShare}
              className="flex-1 py-2 rounded-lg text-sm font-semibold shadow-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 transition"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex-[1] flex flex-col gap-5">
          {/* Layout */}
          <div className="rounded-2xl shadow-lg p-5 bg-gradient-to-br from-white to-pink-50 border border-pink-100">
            <h3 className="font-semibold text-base sm:text-lg mb-3 text-gray-700">Layout</h3>
            <div className="relative">
              <button onClick={() => setOpenDropdown(!openDropdown)} className="w-full border rounded-lg px-3 py-2 flex justify-between items-center hover:border-pink-400">
                {layout?.group} - {layout?.name} <span>▼</span>
              </button>
              {openDropdown && (
                <div className="absolute z-10 mt-1 border rounded-lg shadow-md w-full max-h-60 overflow-y-auto bg-white">
                  {Object.entries(groupedLayouts).map(([group, items]) => (
                    <div key={group}>
                      <div className="px-2 py-1 text-xs font-semibold text-gray-500">{group}</div>
                      {items.map(l => (
                        <button
                          key={l.id}
                          onClick={() => { setSelectedLayout(l.id); setOpenDropdown(false) }}
                          className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-pink-50 transition"
                        >
                          <div
                            className="grid gap-0.5 w-10 h-10 rounded bg-gray-100"
                            style={{ gridTemplateColumns: `repeat(${l.cols},1fr)`, gridTemplateRows: `repeat(${l.rows},1fr)` }}
                          >
                            {l.slots.map((s, i) => (
                              <div key={i} className="bg-gray-300" style={{ gridColumn: `${s.x + 1}/span ${s.w}`, gridRow: `${s.y + 1}/span ${s.h}` }} />
                            ))}
                          </div>
                          <span className="text-sm">{l.name}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Frame Colors */}
          <div className="rounded-2xl shadow-lg p-5 bg-gradient-to-br from-white to-pink-50 border border-pink-100">
            <h3 className="font-semibold text-base sm:text-lg mb-3 text-gray-700">Frame Color</h3>
            <div className="flex gap-3 flex-wrap items-center">
              <label className="w-10 h-10 rounded-full border cursor-pointer overflow-hidden relative">
                <input
                  type="color"
                  value={frameColor}
                  onChange={(e) => setFrameColor(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <span className="block w-full h-full rounded-full" style={{ backgroundColor: frameColor }} />
              </label>
              {frameColors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setFrameColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition ${frameColor === color ? "border-pink-500 scale-110" : "border-gray-200 hover:border-gray-400"}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Stickers */}
          <div className="rounded-2xl shadow-lg p-5 bg-gradient-to-br from-white to-pink-50 border border-pink-100">
            <h3 className="font-semibold text-base sm:text-lg mb-3 text-gray-700">Stickers</h3>
            <div className="grid grid-cols-5 gap-3">
              {stickerOptions.map((s, idx) => (
                <button key={idx} onClick={() => addSticker(s)} className="w-12 h-12 rounded-lg border flex items-center justify-center bg-gray-50 hover:border-pink-400 transition">
                  <img src={s} alt="Sticker" className="w-7 h-7" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}