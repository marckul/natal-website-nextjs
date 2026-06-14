'use client';

import {useState} from 'react';
import Link from 'next/link';
import NavLinks from '@/components/NavLinks';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav
        id="navbar-main"
        className="navbar fixed-top navbar-expand-md navbar-dark bg-dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <span>Natal</span> <span>instalacje</span>
          </Link>
          <button
            className="navbar-toggler border-0"
            type="button"
            aria-controls="navbarMain"
            aria-expanded={open}
            aria-label="Przełącz nawigację"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="d-flex flex-row align-items-center">
              <div className="py-1 text-muted">
                <small>MENU</small>
              </div>
              <div className="ms-2 navbar-toggler-icon" />
            </div>
          </button>
          <div
            className={`collapse navbar-collapse${open ? ' show' : ''}`}
            id="navbarMain"
          >
            <NavLinks onNavigate={() => setOpen(false)} />
          </div>
        </div>
      </nav>
    </header>
  );
}
