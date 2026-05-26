'use client';

import Link from 'next/link';
import {useEffect, useRef, useState} from 'react';

type Slide = {
  id: string;
  title: string;
  text: string;
  image: string;
  to: string;
};

const slides: Slide[] = [
  {
    id: 'nasza-oferta',
    title: 'Nasza oferta',
    text: 'Oferujemy szeroki asortyment materiałów instalacyjnych. Zapoznaj się z naszą ofertą',
    image: '/images/natal-pipes-2.jpg',
    to: '/oferta#nasza-oferta',
  },
  {
    id: 'fotowoltaika',
    title: 'Foto­woltaika',
    text: 'Oferujemy montaż instalacji fotowoltaicznych i solarów słonecznych',
    image: '/images/fotowoltaika-hero-2000x.jpg',
    to: '/oferta#fotowoltaika-i-wentylacja',
  },
  {
    id: 'instalacje-co',
    title: 'Instalacje CO',
    text: 'Zobacz naszą ofertę kotłów gazowych i węglowych',
    image: '/images/kociol-2000x.jpg',
    to: '/oferta#instalacje-co',
  },
];

const INTERVAL_MS = 5000;

export default function CarouselHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const prev = () => setActive((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setActive((i) => (i + 1) % slides.length);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, active]);

  return (
    <div
      id="carousel-hero"
      className="carousel slide carousel-fade"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-indicators">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Slajd ${idx + 1}`}
            className={idx === active ? 'active' : ''}
            onClick={() => setActive(idx)}
          />
        ))}
      </div>

      <div className="carousel-inner">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            id={slide.id}
            className={`carousel-item d-flex align-items-center justify-content-center${idx === active ? ' active' : ''}`}
            style={{backgroundImage: `url(${slide.image})`}}
          >
            <div className="carousel-caption d-flex h-100 align-items-center justify-content-center">
              <div className="col mt-5 text-center">
                <h2
                  className="display-2 mt-5"
                  dangerouslySetInnerHTML={{__html: slide.title}}
                />
                <p className="lead text-center">{slide.text}</p>
                <div className="text-center text-md-end">
                  <Link
                    className="btn btn-lg btn-secondary rounded-0"
                    href={slide.to}
                    role="button"
                  >
                    Zobacz więcej
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        onClick={prev}
        aria-label="Poprzedni slajd"
      >
        <span
          className="carousel-control-prev-icon d-none d-md-inline-block"
          aria-hidden="true"
        />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={next}
        aria-label="Następny slajd"
      >
        <span
          className="carousel-control-next-icon d-none d-md-inline-block"
          aria-hidden="true"
        />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
