import React from 'react';
import { cn } from '../lib/utils';

export const Lights = ({ className }) => (
  <div className={cn('w-full h-full overflow-hidden', className)}>
    <div
      className={'w-full h-full relative bottom-[-25vh]'}
      style={{
        background:
          'conic-gradient(from 180deg at 50% 50%, #222e50 0deg, #51bbfe 180deg, #222e50 1turn)',
        filter: 'blur(100px)',
        opacity: '30%'
      }}
    />
  </div>
);
