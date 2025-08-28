"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Camera, RotateCcw, Grid3X3, Grid2X2, Square, LayoutGrid, Upload } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"

const filters = [
    { id: "normal", name: "Normal", style: "none" },
    { id: "vintage", name: "Vintage", style: "sepia(0.8) contrast(1.2) brightness(1.1)" },
    { id: "blackwhite", name: "Black & White", style: "grayscale(1)" },
    { id: "sepia", name: "Sepia", style: "sepia(1)" },
    { id: "blur", name: "Soft", style: "blur(1px) brightness(1.1)" },
    { id: "brightness", name: "Bright", style: "brightness(1.3) contrast(1.1)" },
]

const layouts = [
    { id: "layout-1", count: 1, name: "1 Photo", icon: Square, cols: 1, rows: 1 },
    { id: "layout-2", count: 2, name: "2 Photos", icon: Grid2X2, cols: 2, rows: 1 },
    { id: "layout-4", count: 4, name: "4 Photos", icon: Grid2X2, cols: 2, rows: 2 },
    { id: "layout-6", count: 6, name: "6 Photos", icon: Grid3X3, cols: 3, rows: 2 },
    { id: "layout-9", count: 9, name: "9 Photos", icon: LayoutGrid, cols: 3, rows: 3 },
]

export default function Booth() {
    const [selectedFilter, setSelectedFilter] = useState("normal")
    const [selectedLayout, setSelectedLayout] = useState(layouts[0])
    const [capturedPhotos, setCapturedPhotos] = useState([])
    const [timerSetting, setTimerSetting] = useState(0)
    const [timer, setTimer] = useState(0)
    const [isCountingDown, setIsCountingDown] = useState(false)

    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const fileInputRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        const initCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
                if (videoRef.current) videoRef.current.srcObject = stream
            } catch (err) {
                console.error("Camera error:", err)
            }
        }
        initCamera()
    }, [])

    useEffect(() => {
        let interval
        if (isCountingDown && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval)
                        setIsCountingDown(false)
                        capturePhoto()
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isCountingDown, timer])

    const capturePhoto = useCallback(() => {
        if (!videoRef.current || !canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight

        const filterStyle = filters.find((f) => f.id === selectedFilter)?.style || "none"
        ctx.filter = filterStyle
        ctx.translate(canvas.width, 0)
        ctx.scale(-1, 1)
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

        const photoData = canvas.toDataURL("image/jpeg", 0.8)
        setCapturedPhotos((prev) => {
            if (prev.length >= selectedLayout.count) return prev
            return [...prev, photoData]
        })
    }, [selectedFilter, selectedLayout])

    const handleTakePhoto = () => {
        if (timerSetting > 0) {
            setTimer(timerSetting)
            setIsCountingDown(true)
        } else {
            capturePhoto()
        }
    }

    const handleUploadPhoto = (e) => {
        const files = Array.from(e.target.files)
        if (files.length === 0) return

        const readers = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.readAsDataURL(file)
            })
        })

        Promise.all(readers).then((results) => {
            setCapturedPhotos((prev) => {
                let newPhotos = [...prev, ...results]
                return newPhotos.slice(0, selectedLayout.count)
            })
        })
    }

    const resetPhotos = () => setCapturedPhotos([])
    const currentFilter = filters.find((f) => f.id === selectedFilter)

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-100 via-white to-pink-50 font-sans">
            {/* Navbar */}
            <header className="bg-white shadow-md sticky top-0 z-50 border-b border-pink-200">
                <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
                    <h1 className="text-xl font-bold text-pink-500 tracking-wide">Snappia</h1>
                    <nav className="space-x-4 text-gray-700 text-base font-medium">
                        <Link to="/" className="hover:text-pink-500">Home</Link>
                        <span className="text-pink-500 font-semibold">Booth</span>
                    </nav>
                </div>
            </header>

            {/* Main */}
            <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Camera */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 relative border border-gray-100">
                    {isCountingDown && (
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <span className="text-white text-7xl sm:text-9xl font-extrabold drop-shadow-lg">{timer}</span>
                        </div>
                    )}

                    <div className="rounded-xl overflow-hidden bg-gray-100 aspect-video relative border border-pink-100">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                            style={{ filter: currentFilter?.style, transform: "scaleX(-1)" }}
                        />
                        <canvas ref={canvasRef} className="hidden" />
                    </div>

                    {/* Camera buttons */}
                    <div className="flex justify-center mt-6 gap-6">
                        <button
                            onClick={handleTakePhoto}
                            disabled={isCountingDown || capturedPhotos.length >= selectedLayout.count}
                            className="rounded-full w-20 h-20 bg-pink-500 hover:bg-pink-600 shadow-xl flex items-center justify-center text-white transition transform hover:scale-105"
                        >
                            <Camera className="w-8 h-8" />
                        </button>

                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="rounded-full w-20 h-20 bg-blue-500 hover:bg-blue-600 shadow-xl flex items-center justify-center text-white transition transform hover:scale-105"
                        >
                            <Upload className="w-8 h-8" />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            ref={fileInputRef}
                            onChange={handleUploadPhoto}
                            className="hidden"
                        />
                    </div>

                    {/* Timer */}
                    <div className="flex justify-center mt-6 gap-3">
                        {[0, 3, 5, 10].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTimerSetting(t)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${timerSetting === t
                                    ? "bg-pink-500 text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {t === 0 ? "Off" : `${t}s`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-6">
                    {/* Filter */}
                    <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-md p-5 border border-pink-100">
                        <h3 className="font-semibold mb-3 text-gray-700">Filter</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {filters.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setSelectedFilter(f.id)}
                                    className={`px-3 py-2 rounded-xl text-sm font-medium transition ${selectedFilter === f.id
                                        ? "bg-pink-500 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {f.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Layout */}
                    <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-md p-5 border border-pink-100">
                        <h3 className="font-semibold mb-3 text-gray-700">Layout</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {layouts.map((l) => {
                                const Icon = l.icon
                                return (
                                    <button
                                        key={l.id}
                                        onClick={() => { setSelectedLayout(l); resetPhotos() }}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition ${selectedLayout.id === l.id
                                            ? "bg-pink-500 text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {l.name}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Preview */}
                    {capturedPhotos.length > 0 && (
                        <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-md p-5 border border-pink-100">
                            <h3 className="font-semibold mb-3 text-gray-700">Preview</h3>
                            <div
                                className="grid gap-2 mb-4"
                                style={{ gridTemplateColumns: `repeat(${selectedLayout.cols}, 1fr)` }}
                            >
                                {Array.from({ length: selectedLayout.count }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`aspect-video rounded-xl border-2 overflow-hidden flex items-center justify-center text-gray-400 text-sm font-semibold ${!capturedPhotos[i] ? "border-pink-400 bg-gray-50" : "border-gray-200"
                                            }`}
                                    >
                                        {capturedPhotos[i] ? (
                                            <img src={capturedPhotos[i]} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                                        ) : (
                                            i + 1
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={resetPhotos}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-xl font-medium transition"
                                >
                                    <RotateCcw className="w-4 h-4 inline-block mr-1" />
                                    Reset
                                </button>
                                <button
                                    onClick={() => navigate("/editor", { state: { photos: capturedPhotos } })}
                                    className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition"
                                >
                                    Done ✅
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
