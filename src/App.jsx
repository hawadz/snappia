import { useState } from "react"
import { Camera, Users, Zap, Calendar, Star } from "lucide-react"
import { Link } from "react-router-dom"

export default function App() {
  const [openFaq, setOpenFaq] = useState(null)
  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i)

  const steps = [
    {
      step: "1",
      title: "Book Your Session",
      desc: "Choose your package and book your photobooth session online or by phone",
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      step: "2",
      title: "We Setup Everything",
      desc: "Our team arrives early to set up the photobooth with props and backdrops",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      step: "3",
      title: "Start Taking Photos",
      desc: "Guests enjoy unlimited photos with instant prints and digital copies",
      icon: <Camera className="w-6 h-6" />,
    },
    {
      step: "4",
      title: "Share & Cherish",
      desc: "Get all photos digitally delivered and share memories instantly",
      icon: <Users className="w-6 h-6" />,
    },
  ]

  const gallery = [
    "https://picsum.photos/400/400?1",
    "https://picsum.photos/400/400?2",
    "https://picsum.photos/400/400?3",
    "https://picsum.photos/400/400?4",
    "https://picsum.photos/400/400?5",
    "https://picsum.photos/400/400?6",
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Wedding Reception",
      quote:
        "The photobooth was the highlight of our wedding! Guests loved the props and the photo quality was amazing.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Corporate Event",
      quote:
        "Professional service and great photos. Our team building event was so much more fun with the photobooth!",
      rating: 5,
    },
    {
      name: "Lisa Rodriguez",
      role: "Birthday Party",
      quote:
        "My daughter's sweet 16 was perfect! The custom backdrop and props made it so special.",
      rating: 5,
    },
  ]

  const faqs = [
    {
      q: "How much space do you need for setup?",
      a: "We typically need a 3x3 meter area with access to power.",
    },
    {
      q: "Do you provide props and backdrops?",
      a: "Yes, we provide a variety of fun props and customizable backdrops.",
    },
    {
      q: "How long does setup take?",
      a: "Setup usually takes around 30–45 minutes depending on the package.",
    },
  ]

  return (
    <div className="font-sans bg-pink-50 text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <Link to="/">
            <img
              src="/src/assets/snappia-logo.png"
              alt="Snappia Logo"
              className="h-10"
            />
          </Link>

          {/* Menu */}
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
      <section
        id="home"
        className="relative text-center py-24 bg-gradient-to-b from-pink-100 to-pink-200"
      >
        {/* Logo besar */}
        <img
          src="/src/assets/snappia-logo.png"
          alt="Snappia Logo"
          className="h-20 mx-auto mb-4"
        />
        <h2 className="text-6xl font-bold text-gray-900">Snappia Photobooth</h2>
        <p className="mt-4 text-lg text-gray-700">
          Capture the moment, cherish the magic
        </p>
        <Link to="/booth">
          <button className="mt-6 px-8 py-3 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition">
            Start 📸
          </button>
        </Link>
        {/* dekorasi kiri-kanan */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-24 h-40 bg-white rounded-lg shadow rotate-[-15deg]" />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-24 h-40 bg-white rounded-lg shadow rotate-[15deg]" />
      </section>

      {/* How it works */}
      <section className="py-20 bg-pink-50">
        <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-center text-gray-600 mb-12">
          Simple steps to create unforgettable memories at your event
        </p>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {steps.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 text-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-500 text-white text-lg mx-auto">
                {s.step}
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 bg-pink-100">
        <h2 className="text-4xl font-bold text-center mb-4">Photo Gallery</h2>
        <p className="text-center text-gray-600 mb-12">
          See the magic we create at events just like yours
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          {gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="gallery"
              className="rounded-xl shadow hover:scale-105 transition"
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700">
            View More Photos →
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-pink-50">
        <h2 className="text-4xl font-bold text-center mb-4">
          What Our Clients Say
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Don’t just take our word for it – hear from our happy customers
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6">
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
      <section className="py-20 bg-pink-100">
        <h2 className="text-4xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Everything you need to know about our photobooth services
        </p>
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4">
              <button
                className="flex justify-between w-full font-medium"
                onClick={() => toggleFaq(i)}
              >
                {f.q}
                <span>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <p className="mt-2 text-sm text-gray-600">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white py-8 mt-12 text-center border-t">
        <p className="text-gray-600">© 2025 Snappia. All rights reserved.</p>
      </footer>
    </div>
  )
}
