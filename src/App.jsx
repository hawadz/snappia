import { useState } from "react"
import { Camera, Users, Zap, Calendar, Star } from "lucide-react"
import { Link } from "react-router-dom"

export default function App() {
  const [openFaq, setOpenFaq] = useState(null)
  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i)

  // How it works (disesuaikan untuk web photobooth)
  const steps = [
    { step: "1", title: "Open Snappia", desc: "Access Snappia directly from your browser, no installation needed", icon: <Calendar className="w-6 h-6" /> },
    { step: "2", title: "Choose Layout & Filters", desc: "Select your favorite layout, frames, and fun stickers", icon: <Zap className="w-6 h-6" /> },
    { step: "3", title: "Snap Your Photos", desc: "Take unlimited photos using your camera, solo or with friends", icon: <Camera className="w-6 h-6" /> },
    { step: "4", title: "Save & Share Instantly", desc: "Download your photos instantly or share them with friends", icon: <Users className="w-6 h-6" /> },
  ]

  // Gallery (dummy hasil photobooth online)
  const gallery = [
    "https://picsum.photos/400/500?1",
    "https://picsum.photos/400/500?2",
    "https://picsum.photos/400/500?3",
    "https://picsum.photos/400/500?4",
    "https://picsum.photos/400/500?5",
    "https://picsum.photos/400/500?6",
  ]

  // Testimonials (lebih sesuai web-based)
  const testimonials = [
    { name: "Emily Carter", role: "Virtual Party", quote: "Snappia was so fun! We used it for our online birthday party and everyone loved the instant downloads.", rating: 5 },
    { name: "Daniel Kim", role: "Team Event", quote: "Our remote team bonding was amazing thanks to Snappia. Super easy to use and share photos!", rating: 5 },
    { name: "Sophia Martinez", role: "Friends Hangout", quote: "We laughed so much trying different filters and layouts. Such a cool experience for an online photobooth!", rating: 5 },
  ]

  // FAQ (untuk web photobooth, bukan setup fisik)
  const faqs = [
    { q: "Do I need to install anything?", a: "No, Snappia works directly in your browser. Just open the link and start snapping!" },
    { q: "Can I download my photos?", a: "Yes, you can instantly download all your photos in high quality." },
    { q: "Does it work on mobile?", a: "Absolutely! Snappia works perfectly on phones, tablets, and laptops." },
  ]

  return (
    <div className="font-sans bg-pink-50 text-gray-800 scroll-smooth">
      {/* Navbar */}
      <header className="bg-white/70 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <Link to="/">
            <img src="/src/assets/snappia-logo.png" alt="Snappia Logo" className="h-10" />
          </Link>
          <nav className="space-x-6 font-medium text-gray-700">
            <a href="#home" className="hover:text-pink-500">Home</a>
            <a href="#about" className="hover:text-pink-500">About</a>
            <a href="#gallery" className="hover:text-pink-500">Gallery</a>
            <a href="#pricing" className="hover:text-pink-500">Pricing</a>
            <a href="#contact" className="hover:text-pink-500">Contact</a>
          </nav>
        </div>
      </header>


      {/* Hero */}
      <section id="home" className="relative text-center py-28 bg-gradient-to-b from-pink-100 to-white">
        <img src="/src/assets/snappia-logo.png" alt="Snappia Logo" className="h-20 mx-auto mb-4" />
        <h2 className="text-6xl font-bold text-gray-900">Snappia Photobooth</h2>
        <p className="mt-4 text-lg text-gray-700">Capture the moment, cherish the magic – all online</p>
        <Link to="/booth">
          <button className="mt-6 px-8 py-3 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition">
            Start 📸
          </button>
        </Link>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 mb-12">Snappia makes it easy to take and share fun photos online</p>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl hover:-translate-y-1">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-500 text-white text-lg mx-auto shadow-md">
                  {s.step}
                </div>
                <h3 className="mt-4 font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 bg-gradient-to-b from-pink-50 to-pink-100">
        <h2 className="text-4xl font-bold text-center mb-4">Photo Gallery</h2>
        <p className="text-center text-gray-600 mb-12">
          A glimpse of fun moments created with Snappia
        </p>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6 justify-items-center">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white p-2 rounded-xl shadow-md hover:shadow-lg transition hover:-translate-y-1 w-28"
            >
              <div className="flex flex-col gap-2">
                {[1, 2, 3].map((j) => (
                  <img
                    key={j}
                    src={`https://picsum.photos/200/300?random=${i * j}`}
                    alt="strip"
                    className="rounded-md object-cover w-full h-36"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 shadow text-sm">
            View More Photos →
          </button>
        </div>
      </section>


      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-pink-100 to-white">
        <h2 className="text-4xl font-bold text-center mb-4">What Our Users Say</h2>
        <p className="text-center text-gray-600 mb-12">See what people love about Snappia</p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <p className="text-pink-500 text-4xl">“</p>
              <p className="mt-2 text-gray-700">{t.quote}</p>
              <p className="mt-4 font-semibold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
              <div className="flex mt-2 text-yellow-500">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-yellow-500" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-b from-white to-pink-100">
        <h2 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-center text-gray-600 mb-12">Everything you need to know about Snappia</p>
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4">
              <button className="flex justify-between w-full font-medium" onClick={() => toggleFaq(i)}>
                {f.q}
                <span>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <p className="mt-2 text-sm text-gray-600 transition-all duration-300">
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer (diperkecil & simple) */}
      <footer id="contact" className="bg-white py-4 text-center border-t border-gray-200">
        <p className="text-sm text-gray-500">© 2025 Snappia. All rights reserved.</p>
      </footer>
    </div>
  )
}
