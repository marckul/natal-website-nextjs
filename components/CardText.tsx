import type {ReactNode} from 'react';

export default function CardText({children}: {children: ReactNode}) {
  return <p className="card-text text-justify">{children}</p>;
}
