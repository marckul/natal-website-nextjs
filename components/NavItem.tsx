import Link from 'next/link';

type NavItemProps = {
  href: string;
  label: string;
  active: boolean;
  // Called when the link is followed, so the mobile menu can close itself.
  onSelect?: () => void;
};

// Presentational single nav link. The parent decides `active`, since that
// depends on both the pathname and the scrolled-to section.
export default function NavItem({href, label, active, onSelect}: NavItemProps) {
  return (
    <li className="nav-item">
      <Link
        className={`nav-link${active ? ' active' : ''}`}
        href={href}
        aria-current={active ? 'page' : undefined}
        onClick={onSelect}
      >
        {label}
      </Link>
    </li>
  );
}
