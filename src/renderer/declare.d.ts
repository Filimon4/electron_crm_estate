declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.svg?react' {
  import type { FunctionComponent, SVGAttributes } from 'react';

  const content: FunctionComponent<SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.png'
declare module '*.{ts, tsx}';
declare module '*.css';
