'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

type NavItem = {
  href: string;
  label: string;
  // Homepage hash sections are matched by scroll position…
  section?: string;
  // …route links are matched by pathname instead.
  route?: string;
};

const navItems: NavItem[] = [
  {href: '/#start', label: 'Start', section: 'start'},
  {href: '/oferta', label: 'Oferta', route: '/oferta'},
  {href: '/#o-firmie', label: 'O firmie', section: 'o-firmie'},
  {href: '/aktualnosci', label: 'Aktualności', route: '/aktualnosci'},
  {href: '/#kontakt', label: 'Kontakt', section: 'kontakt'},
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('start');
  const pathname = usePathname();

  // Scrollspy for the homepage hash sections — Bootstrap's JS scrollspy is not
  // loaded, so detect the section crossing the viewport centre via an
  // IntersectionObserver and reflect it as the `.active` nav link.
  useEffect(() => {
    if (pathname !== '/') return;

    const sectionIds = navItems
      .map((item) => item.section)
      .filter((id): id is string => Boolean(id));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // Track which sections currently occupy a thin band just below the fixed
    // navbar, then pick the topmost one in document order as the active link.
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = sectionIds.find((id) => visible.has(id));
        if (current) setActiveSection(current);
      },
      // Detection band: from just under the 5rem navbar down to ~30% height.
      {rootMargin: '-80px 0px -70% 0px', threshold: 0}
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (item: NavItem) => {
    if (item.route) {
      return pathname === item.route || pathname.startsWith(`${item.route}/`);
    }
    return pathname === '/' && activeSection === item.section;
  };

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
            <ul className="navbar-nav ms-auto">
              {navItems.map((item) => (
                <li className="nav-item" key={item.href}>
                  <Link
                    className={`nav-link${isActive(item) ? ' active' : ''}`}
                    href={item.href}
                    aria-current={isActive(item) ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
