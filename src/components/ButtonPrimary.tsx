import React from 'react';
import Button from '../primitives/Button';
import Text from '../primitives/Text';

export default function ButtonPrimary({ children }: { children: React.ReactNode }) {
  return (
    <Button variant="primary">
      <Text variant="body">{children}</Text>
    </Button>
  );
}
