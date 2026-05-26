import type {ReactNode} from 'react';

type JustifyContent =
  | 'around'
  | 'between'
  | 'center'
  | 'start'
  | 'end'
  | 'evenly';

type RowProps = {
  justifyContent?: JustifyContent;
  className?: string;
  children: ReactNode;
};

export default function Row({
  justifyContent = 'around',
  className,
  children,
}: RowProps) {
  const cls = `row my-3 justify-content-${justifyContent}${className ? ' ' + className : ''}`;
  return <div className={cls}>{children}</div>;
}
