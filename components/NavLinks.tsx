'use client';

import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import NavItem from '@/components/NavItem';

type NavLink = {
  href: string;
  label: string;
  // Homepage hash sections are matched by scroll position…
  section?: string;
  // …route links are matched by pathname instead.
  route?: string;
};

const navLinks: NavLink[] = [
  {href: '/#start', label: 'Start', section: 'start'},
  {href: '/oferta', label: 'Oferta', route: '/oferta'},
  {href: '/#o-firmie', label: 'O firmie', section: 'o-firmie'},
  {href: '/aktualnosci', label: 'Aktualności', route: '/aktualnosci'},
  {href: '/#kontakt', label: 'Kontakt', section: 'kontakt'},
];

export default function NavLinks({onNavigate}: {onNavigate?: () => void}) {
  const [activeSection, setActiveSection] = useState('start');
  const pathname = usePathname();

  // Scrollspy for the homepage hash sections — Bootstrap's JS scrollspy is not
  // loaded, so detect the section under a thin band below the fixed navbar via
  // an IntersectionObserver and reflect it as the `.active` nav link.
  useEffect(() => {
    if (pathname !== '/') return;

    const sectionIds = navLinks
      .map((link) => link.section)
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

  const isActive = (link: NavLink) => {
    if (link.route) {
      return pathname === link.route || pathname.startsWith(`${link.route}/`);
    }
    return pathname === '/' && activeSection === link.section;
  };

  return (
    <ul className="navbar-nav ms-auto">
      {navLinks.map((link) => (
        <NavItem
          key={link.href}
          href={link.href}
          label={link.label}
          active={isActive(link)}
          onSelect={onNavigate}
        />
      ))}
    </ul>
  );
}
