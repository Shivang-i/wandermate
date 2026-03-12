import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./landing.css";

import logo from "../assets/icons/logo(black).svg";
import logo_w from "../assets/icons/logo.svg";
import heroImg from "../assets/images/hero-img.png";
import itn_img from "../assets/images/itn_img.png";
import book from "../assets/images/book_img.png";
import cta_bg from "../assets/images/cta_img.png";
import {
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa6";
// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Services", "Destinations", "Booking", "Testimonials"];

const DESTINATIONS = [
  {
    name: "New York, USA",
    properties: "5,000+ properties",
    unsplash:
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=480&fit=crop",
  },
  {
    name: "Singapore",
    properties: "2,500+ properties",
    unsplash:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=480&fit=crop",
  },
  {
    name: "Paris, France",
    properties: "3,000+ properties",
    unsplash:
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=400&h=480&fit=crop",
  },
  {
    name: "London, UK",
    properties: "116,288+ properties",
    unsplash:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=480&fit=crop",
  },
  {
    name: "Tokyo, Japan",
    properties: "5,000+ properties",
    unsplash:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=480&fit=crop",
  },
  {
    name: "Sydney, Australia",
    properties: "4,200+ properties",
    unsplash:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=480&fit=crop",
  },
  {
    name: "Dubai, UAE",
    properties: "8,000+ properties",
    unsplash:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=480&fit=crop",
  },
];

const POPULAR_DESTS = [
  {
    name: "Maldives",
    listing: "18 Listings",
    country: "South Asia",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=720&fit=crop",
  },
  {
    name: "Thailand",
    listing: "22 Listings",
    country: "Southeast Asia",
    img: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=500&h=720&fit=crop",
  },
  {
    name: "Bali",
    listing: "30 Listings",
    country: "Indonesia",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&h=720&fit=crop",
  },
  {
    name: "Santorini",
    listing: "14 Listings",
    country: "Greece",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=720&fit=crop",
  },
  {
    name: "New York",
    listing: "56 Listings",
    country: "USA",
    img: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=500&h=720&fit=crop",
  },
  {
    name: "Swiss Alps",
    listing: "11 Listings",
    country: "Switzerland",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=720&fit=crop",
  },
  {
    name: "Tokyo",
    listing: "38 Listings",
    country: "Japan",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&h=720&fit=crop",
  },
  {
    name: "Cape Town",
    listing: "21 Listings",
    country: "South Africa",
    img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=500&h=720&fit=crop",
  },
  {
    name: "Paris",
    listing: "44 Listings",
    country: "France",
    img: "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=500&h=720&fit=crop",
  },
  {
    name: "Phuket",
    listing: "19 Listings",
    country: "Thailand",
    img: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=500&h=720&fit=crop",
  },
];

const TESTIMONIALS = [
  {
    name: "Mike Taylor",
    location: "Lahore, Pakistan",
    trip: "Thailand · 7 days",
    text: "Wandermate made our Thailand trip absolutely seamless. The AI itinerary was spot-on and booking was effortless. I'll never plan a trip any other way.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
    bgImg:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=700&h=500&fit=crop",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    location: "Singapore",
    trip: "Bali · 10 days",
    text: "From flights to local tours — everything in one place. The app suggested hidden gems we'd never have found ourselves. Absolutely loved every moment!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
    bgImg:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&h=500&fit=crop",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    location: "Mumbai, India",
    trip: "Agra · 3 days",
    text: "The drag-and-drop itinerary builder is genius. I rearranged our entire schedule in minutes. Customer support was also incredibly responsive and helpful.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    bgImg:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=700&h=500&fit=crop",
    rating: 5,
  },
  {
    name: "Léa Fontaine",
    location: "Paris, France",
    trip: "Maldives · 5 days",
    text: "Booked our honeymoon entirely through Wandermate. The resort suggestions were perfect, and the seamless check-in experience was absolutely magical.",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=120&h=120&fit=crop&crop=face",
    bgImg:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&h=500&fit=crop",
    rating: 5,
  },
  {
    name: "James Okonkwo",
    location: "Lagos, Nigeria",
    trip: "Swiss Alps · 6 days",
    text: "Never thought travelling solo could feel this safe and organised. Wandermate handled every detail — from train passes to mountain hut bookings. 10/10.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face",
    bgImg:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=500&fit=crop",
    rating: 5,
  },
];

const ITIN_FEATURES = [
  {
    icon: "🗓",
    bg: "feat-purple",
    title: "AI-Generated Plans",
    desc: "Get a full itinerary built from your preferences instantly.",
  },
  {
    icon: "✏️",
    bg: "feat-red",
    title: "Drag & Drop Editing",
    desc: "Reorder activities with ease, anytime your plans change.",
  },
  {
    icon: "🔔",
    bg: "feat-green",
    title: "Real-Time Reminders",
    desc: "Never miss a check-in or tour with smart timely alerts.",
  },
];

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="wm-nav">
      <div className="wm-nav-inner">
        <div className="wm-logo">
          <img src={logo} alt="Wandermate" className="wm-logo-img" />
        </div>
        <ul className={`wm-nav-links ${menuOpen ? "wm-nav-links--open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a href="#">{l}</a>
            </li>
          ))}
         
          <li>
            <Link to="/login" className="wm-nav-signup">
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/itinerary" className="wm-nav-itn">
              itenary
            </Link>
          </li>
        </ul>
        <button
          className="wm-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────

const HeroSection: React.FC = () => (
  <section className="wm-hero">
    <div className="wm-hero-content">
      <p className="wm-hero-tagline">
        <span className="tagline-dot" />
        Best Destinations Around the World
      </p>
      <h1 className="wm-hero-heading">
        Travel, <em>explore</em>
        <br />
        and live a life
        <br />
        worth remembering
      </h1>
      <p className="wm-hero-sub">
        Wandermate is your AI-powered travel companion — crafting personalised
        itineraries, booking flights, hotels &amp; more, all in one seamless
        place.
      </p>

      <div className="wm-hero-actions">
        <a href="#" className="wm-btn-primary">
          Start Exploring →
        </a>
      </div>
    </div>
    <div className="wm-hero-visual">
      <div className="wm-hero-blob" />
      <div className="wm-plane wm-plane--left">✈</div>
      <div className="wm-plane wm-plane--right">✈</div>
      <div className="wm-hero-img-wrap">
        <img src={heroImg} alt="Wandermate traveler" className="wm-hero-img" />
      </div>
      <div className="wm-float-card wm-float-card--top">
        <span className="wm-float-icon">📍</span>
        <div>
          <p className="wm-float-label">Next Stop</p>
          <p className="wm-float-val">Bali, Indonesia</p>
        </div>
      </div>
      <div className="wm-float-card wm-float-card--bottom">
        <span className="wm-float-icon">⭐</span>
        <div>
          <p className="wm-float-label">Avg Rating</p>
          <p className="wm-float-val">4.9 / 5.0</p>
        </div>
      </div>
    </div>
  </section>
);

// ─── ADVENTURE ────────────────────────────────────────────────────────────────

const AdventureSection: React.FC = () => {
  const [start, setStart] = useState(0);
  const visible = 4;
  const slice = DESTINATIONS.slice(start, start + visible);
  return (
    <section className="wm-adventure">
      <div className="wm-section-header">
        <h2 className="wm-section-title">Let's Go on an Adventure</h2>
        <p className="wm-section-sub">
          Explore the best places to stay in the world.
        </p>
      </div>
      <div className="wm-dest-carousel">
        <button
          className="wm-arrow wm-arrow--left"
          onClick={() => setStart((i) => Math.max(0, i - 1))}
          disabled={start === 0}
        >
          ‹
        </button>
        <div className="wm-dest-grid">
          {slice.map((dest) => (
            <div className="wm-dest-card" key={dest.name}>
              <div className="wm-dest-img-wrap">
                <img
                  src={dest.unsplash}
                  alt={dest.name}
                  className="wm-dest-img"
                  loading="lazy"
                />
                <div className="wm-dest-img-overlay" />
              </div>
              <div className="wm-dest-info">
                <p className="wm-dest-name">{dest.name}</p>
                <p className="wm-dest-props">{dest.properties}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="wm-arrow wm-arrow--right"
          onClick={() =>
            setStart((i) => Math.min(DESTINATIONS.length - visible, i + 1))
          }
          disabled={start >= DESTINATIONS.length - visible}
        >
          ›
        </button>
      </div>
      <div className="wm-carousel-dots">
        {Array.from({ length: DESTINATIONS.length - visible + 1 }).map(
          (_, i) => (
            <button
              key={i}
              className={`wm-dot ${i === start ? "wm-dot--on" : ""}`}
              onClick={() => setStart(i)}
            />
          ),
        )}
      </div>
    </section>
  );
};

// ─── ITINERARY ────────────────────────────────────────────────────────────────

const ItinerarySection: React.FC = () => (
  <section className="wm-itin">
    <div className="wm-itin-card-col">
      <img src={itn_img} alt="Travel Itinerary" className="wm-itin-img" />
    </div>
    <div className="wm-itin-text">
      <span className="wm-eyebrow">Smart Planning</span>
      <h2 className="wm-section-title">
        Manage Your <span className="wm-accent">Itinerary</span>
        <br />
        Effortlessly
      </h2>
      <p className="wm-body-text">
        Let Wandermate's AI build your perfect day-by-day travel plan in
        seconds. Drag, reorder, and edit on the fly — or let our assistant
        auto-fill gaps with local gems you'd never find on your own.
      </p>
      <ul className="wm-feat-list">
        {ITIN_FEATURES.map((f) => (
          <li key={f.title} className="wm-feat-item">
            <span className={`wm-feat-icon ${f.bg}`}>{f.icon}</span>
            <div>
              <strong>{f.title}</strong>
              <p>{f.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// ─── BOOKING (REDESIGNED) ─────────────────────────────────────────────────────

const bookingOptions = [
  { icon: "✈️", label: "Flights" },
  { icon: "🚂", label: "Trains" },
  { icon: "🚌", label: "Buses" },
  { icon: "🏨", label: "Hotels" },
  { icon: "🚖", label: "Cabs" },
  { icon: "🛳️", label: "Cruises" },
];

const BookingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="booking-section">
      {/* Left: Text */}
      <div className="booking-text">
        <span className="itin-eyebrow">One-Stop Solution</span>
        <h2 className="booking-title">
          Book Your <span className="booking-accent">Travel</span>
        </h2>
        <p className="booking-desc">
          From flights to hotel rooms, train seats to cab rides — book
          everything under one roof, anytime, anywhere. No more juggling a dozen
          apps. Jadoo is the only travel companion you'll ever need.
        </p>

        {/* Transport tabs */}
        <div className="booking-tabs">
          {bookingOptions.map((opt, i) => (
            <button
              key={opt.label}
              className={`booking-tab ${activeTab === i ? "booking-tab--active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Visual mockup */}
      <div className="booking-visual">
        <div className="booking-glow"></div>
        {/* Mock booking card */}
        <div className="booking-card">
          <img src={book} alt="Booking mockup" className="wm-book-img" />
        </div>

        {/* Floating price tag */}
        <div className="booking-price-tag">
          <span className="price-flag">🇮🇳</span>
          <div>
            <span className="price-route">DEL → BLR</span>
            <span className="price-val">From ₹2,499</span>
          </div>
        </div>

        {/* Floating confirm badge */}
        <div className="booking-confirm-badge">
          <span className="confirm-check">✓</span>
          <span>Booking confirmed!</span>
        </div>
      </div>
    </section>
  );
};

// ─── POPULAR DESTINATIONS ─────────────────────────────────────────────────────

const PopularDestinationSection: React.FC = () => {
  const [active, setActive] = useState(2);
  const dragStart = useRef<number | null>(null);

  const go = useCallback((dir: number) => {
    setActive((a) => {
      const total = POPULAR_DESTS.length;
      return (a + dir + total) % total;
    });
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [go]);

  const onPointerDown = (x: number) => {
    dragStart.current = x;
  };
  const onPointerUp = (x: number) => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - x;
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1);
    dragStart.current = null;
  };

  return (
    <section className="wm-popd">
      <div className="wm-section-header">
        <p className="wm-popd-eyebrow">Top Destinations</p>
        <h2 className="wm-section-title">Popular Right Now</h2>
        <p className="wm-section-sub">
          Swipe, click, or use arrow keys to explore destinations.
        </p>
      </div>

      <div className="wm-popd-wrapper">
        <button
          className="wm-popd-arrow wm-popd-arrow--left"
          onClick={() => go(-1)}
        >
          ‹
        </button>

        <div
          className="wm-popd-stage"
          onMouseDown={(e) => onPointerDown(e.clientX)}
          onMouseUp={(e) => onPointerUp(e.clientX)}
          onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
          onTouchEnd={(e) => onPointerUp(e.changedTouches[0].clientX)}
        >
          {POPULAR_DESTS.map((d, i) => {
            const total = POPULAR_DESTS.length;
            let off = i - active;

            if (off > total / 2) off -= total;
            if (off < -total / 2) off += total;
            const isActive = i === active;
            return (
              <div
                key={i}
                className={`wm-popd-card${isActive ? " wm-popd-card--active" : ""}`}
                style={{
                  transform: `translateX(${off * 215}px) scale(${isActive ? 1 : Math.max(0.7, 1 - Math.abs(off) * 0.1)})`,
                  zIndex: isActive ? 10 : 8 - Math.abs(off),
                  filter: isActive
                    ? "none"
                    : `brightness(${Math.max(0.45, 1 - Math.abs(off) * 0.22)}) blur(${Math.min(Math.abs(off) * 1.8, 5)}px)`,
                  opacity: Math.abs(off) > 3 ? 0 : 1,
                }}
                onClick={() => setActive(i)}
              >
                <img
                  src={d.img}
                  alt={d.name}
                  className="wm-popd-img"
                  loading="lazy"
                  draggable={false}
                />
                {isActive ? (
                  <div className="wm-popd-overlay">
                    <div className="wm-popd-overlay-top">
                      <span className="wm-popd-country-tag">{d.country}</span>
                    </div>
                    <div className="wm-popd-overlay-bottom">
                      <div>
                        <p className="wm-popd-name">{d.name}</p>
                        <p className="wm-popd-listing">📋 {d.listing}</p>
                      </div>
                      <button className="wm-popd-btn">Explore →</button>
                    </div>
                  </div>
                ) : (
                  <div className="wm-popd-inactive-label">
                    <p className="wm-popd-name-sm">{d.name}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          className="wm-popd-arrow wm-popd-arrow--right"
          onClick={() => go(1)}
        >
          ›
        </button>
      </div>

      <div className="wm-carousel-dots">
        {POPULAR_DESTS.map((_, i) => (
          <button
            key={i}
            className={`wm-dot${i === active ? " wm-dot--on" : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
      <p className="wm-popd-hint">← Swipe or use arrow keys →</p>
    </section>
  );
};

// ─── TESTIMONIALS (REDESIGNED) ────────────────────────────────────────────────

const TestimonialsSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");

  const go = (d: number) => {
    setDir(d > 0 ? "next" : "prev");
    setActive((a) => Math.max(0, Math.min(TESTIMONIALS.length - 1, a + d)));
  };

  const t = TESTIMONIALS[active];

  return (
    <section className="wm-testi">
      <div className="wm-testi-header">
        <span className="wm-eyebrow">Testimonials</span>
        <h2 className="wm-section-title">What Wanderers Say</h2>
        <p className="wm-section-sub">
          Real stories from real travellers around the globe.
        </p>
      </div>

      <div className="wm-testi-body">
        {/* ── Main card ── */}
        <div className={`wm-testi-main wm-testi-main--${dir}`} key={active}>
          <div
            className="wm-testi-main-photo"
            style={{ backgroundImage: `url(${t.bgImg})` }}
          >
            <div className="wm-testi-main-photo-overlay" />
            <span className="wm-testi-trip-tag">📍 {t.trip}</span>
          </div>
          <div className="wm-testi-main-body">
            <div className="wm-testi-main-stars">{"★".repeat(t.rating)}</div>
            <p className="wm-testi-main-quote">"{t.text}"</p>
            <div className="wm-testi-main-author">
              <img
                src={t.avatar}
                alt={t.name}
                className="wm-testi-main-avatar"
              />
              <div>
                <p className="wm-testi-main-name">{t.name}</p>
                <p className="wm-testi-main-loc">{t.location}</p>
              </div>
              <span className="wm-testi-badge-verified">✓ Verified</span>
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="wm-testi-sidebar">
          {/* Nav controls */}
          <div className="wm-testi-sidebar-top">
            <span className="wm-testi-counter">
              <b style={{ color: "var(--red)" }}>
                {String(active + 1).padStart(2, "0")}
              </b>
              <span style={{ color: "#ccc" }}>
                {" "}
                / {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
            </span>
            <div className="wm-testi-controls">
              <button
                className="wm-testi-ctrl"
                onClick={() => go(-1)}
                disabled={active === 0}
              >
                ←
              </button>
              <button
                className="wm-testi-ctrl"
                onClick={() => go(1)}
                disabled={active === TESTIMONIALS.length - 1}
              >
                →
              </button>
            </div>
          </div>

          {/* Reviewer list */}
          <div className="wm-testi-list">
            {TESTIMONIALS.map((item, i) => (
              <div
                key={i}
                className={`wm-testi-list-row${i === active ? " wm-testi-list-row--on" : ""}`}
                onClick={() => {
                  setDir(i > active ? "next" : "prev");
                  setActive(i);
                }}
              >
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="wm-testi-list-avatar"
                />
                <div className="wm-testi-list-text">
                  <p className="wm-testi-list-name">{item.name}</p>
                  <p className="wm-testi-list-trip">{item.trip}</p>
                </div>
                {i === active && <div className="wm-testi-list-bar" />}
              </div>
            ))}
          </div>

          {/* Rating summary */}
          <div className="wm-testi-rating">
            <div className="wm-testi-rating-top">
              <span className="wm-testi-big-score">4.9</span>
              <div>
                <div className="wm-testi-score-stars">★★★★★</div>
                <p className="wm-testi-score-label">1,200+ reviews</p>
              </div>
            </div>
            <div className="wm-testi-bars">
              {[
                ["5★", 89],
                ["4★", 8],
                ["3★", 2],
                ["2★", 1],
                ["1★", 0],
              ].map(([lbl, pct]) => (
                <div className="wm-rbar-row" key={lbl as string}>
                  <span className="wm-rbar-lbl">{lbl}</span>
                  <div className="wm-rbar-track">
                    <div
                      className="wm-rbar-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="wm-rbar-pct">{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dots */}
      <div className="wm-carousel-dots wm-testi-dots-mobile">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`wm-dot${i === active ? " wm-dot--on" : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
};

// ─── CTA BANNER ───────────────────────────────────────────────────────────────

const CTABannerSection: React.FC = () => (
  <section className="wm-cta">
    <div className="wm-cta-content">
      <p className="wm-cta-eyebrow">Your Journey Awaits</p>
      <h2 className="wm-cta-title">
        Ready to Start Your
        <br />
        Adventure?
      </h2>
      <p className="wm-cta-sub">
        Let us help you create the perfect journey. Our travel experts and AI
        are ready to craft your dream vacation — personalised just for you.
      </p>
      <a href="#" className="wm-cta-btn">
        Start Planning Now →
      </a>
    </div>
    <div className="wm-cta-right">
      <img src={cta_bg} alt="CTA Background" className="wm-cta-img" />
    </div>
  </section>
);

// ─── FOOTER ───────────────────────────────────────────────────────────────────

const FooterSection: React.FC = () => (
  <footer className="wm-footer">
    <div className="wm-footer-inner">
      <div className="wm-footer-brand">
        <div className="wm-footer-logo">
          <img src={logo_w} alt="Wandermate Logo" />
        </div>
        <p className="wm-footer-desc">
          Your trusted AI-powered travel companion for extraordinary experiences
          since 2020.
        </p>
        <div className="wm-footer-socials">
          {[
            { icon: <FaInstagram />, label: "Instagram" },
            { icon: <FaXTwitter />, label: "Twitter" },
            { icon: <FaLinkedinIn />, label: "LinkedIn" },
            { icon: <FaFacebookF />, label: "Facebook" },
          ].map(({ icon, label }) => (
            <a key={label} href="#" className="wm-social-chip" title={label}>
              {icon}
            </a>
          ))}
        </div>
      </div>
      <div className="wm-footer-col">
        <h4>Quick Links</h4>
        <ul>
          {["Home", "About", "Packages", "Blog", "Contact"].map((l) => (
            <li key={l}>
              <a href="#">{l}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="wm-footer-col">
        <h4>Services</h4>
        <ul>
          {[
            "Flight Booking",
            "Hotel Booking",
            "Train & Bus",
            "AI Itinerary",
            "Travel Insurance",
          ].map((l) => (
            <li key={l}>
              <a href="#">{l}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="wm-footer-col">
        <h4>Contact</h4>
        <p>
          📍 455 West Orchard Street,
          <br />
          Kings Mountain, NC 280867
        </p>
        <p>📞 +088 (246) 642-27-10</p>
        <p>✉️ hello@wandermate.com</p>
      </div>
    </div>
    <div className="wm-footer-bottom">
      <p>© 2026 Wandermate. All rights reserved.</p>
      <div className="wm-footer-bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookies</a>
      </div>
    </div>
  </footer>
);

// ─── ROOT ─────────────────────────────────────────────────────────────────────

const LandingPage: React.FC = () => (
  <div className="wm-root">
    <Navbar />
    <HeroSection />
    <AdventureSection />
    <ItinerarySection />
    <BookingSection />
    <PopularDestinationSection />
    <TestimonialsSection />
    <CTABannerSection />
    <FooterSection />
  </div>
);

export default LandingPage;
