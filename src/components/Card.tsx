import React from 'react';
import Surface from '../primitives/Surface';
import Text from '../primitives/Text';

interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
}

export default function Card({ children, interactive = false }: CardProps) {
  return (
    <Surface level={interactive ? 'raised' : 'base'}>
      <div>{children}</div>
    </Surface>
  );
}
