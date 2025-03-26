import React, {ReactNode}from 'react';
import { MotiView } from 'moti';

interface ViewFadeInProps  {
    children: ReactNode
}

export default function FadeInOut({children }: ViewFadeInProps) {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'timing', duration: 800 }}
    >
      {children}
    </MotiView>
  );
}