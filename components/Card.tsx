import type {ReactNode} from 'react';
import Image from 'next/image';
import Link from 'next/link';

type CardProps = {
  id?: string;
  to: string;
  src: string;
  alt: string;
  small?: string;
  colClassName?: string;
  children: ReactNode;
};

export default function Card({
  id,
  to,
  src,
  alt,
  small,
  colClassName = 'col-md-6 col-lg-5 p-md-1',
  children,
}: CardProps) {
  return (
    <div className={`d-flex ${colClassName}`}>
      <div id={id} className="card flex-fill shadow mb-5 p-lg-3">
        <Link href={to} className="stretched-link">
          <Image
            src={src}
            alt={alt}
            width={400}
            height={260}
            className="card-img-top"
            style={{
              objectFit: 'contain',
              background: '#f8f9fa',
              padding: '1rem',
              width: '100%',
              height: 'auto',
            }}
          />
        </Link>
        <div className="card-body text-center d-flex flex-column justify-content-between">
          <div>{children}</div>
          {small ? (
            <p className="card-text">
              <small className="text-muted fst-italic">{small}</small>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
