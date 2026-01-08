import React, { useState } from 'react';
import { Surface } from '../primitives/Surface';
import { Stack } from '../primitives/Stack';
import { Text } from '../primitives/Text';
import { Button } from '../primitives/Button';
import { Input } from '../primitives/Input';

type Question = { id: string; prompt: string; placeholder?: string };

const QUESTIONS: Question[] = [
  { id: 'goal', prompt: 'What is your primary outcome?', placeholder: 'e.g., sustained recovery, support' },
  { id: 'time', prompt: 'How soon do you want to start?', placeholder: 'This week / next 30 days' }
];

type Props = {
  onComplete: () => void;
};

export default function DiscoveryChatPanel({ onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);

  const current = QUESTIONS[step];

  const next = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <Surface tone="overlay" padding="var(--space-4)">
      <Stack gap={3}>
        <Text as="div" variant="meta">Qualification</Text>
        <Text as="div" variant="body">{current.prompt}</Text>
        <Input
          value={answers[current.id] || ''}
          onChange={(e) => setAnswers({ ...answers, [current.id]: e.target.value })}
          placeholder={current.placeholder}
        />
        <Button variant="primary" onClick={next}>Continue</Button>
        <Text as="div" variant="small" tone="muted">Step {step + 1} of {QUESTIONS.length}</Text>
      </Stack>
    </Surface>
  );
}
