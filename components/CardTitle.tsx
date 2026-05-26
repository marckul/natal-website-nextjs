import type {ReactNode} from 'react';

export default function CardTitle({children}: {children: ReactNode}) {
  return <h2 className="card-title">{children}</h2>;
}
