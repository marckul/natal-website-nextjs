import type {ReactNode} from 'react';

export default function CardTitle({children}: {children: ReactNode}) {
  return <h3 className="card-title h2">{children}</h3>;
}
