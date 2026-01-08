import * as React from "react";
import { Text } from "./Text";
import { Stack } from "./Stack";
import Icon from "./Icon";

export type WhyThisProps = {
  reason: string;
  tone?: "calm" | "heat" | "fracture" | "repair";
};

const toneColor: Record<NonNullable<WhyThisProps["tone"]>, string> = {
  calm: 'var(--color-state-calm)',
  heat: 'var(--color-state-heat)',
  fracture: 'var(--color-state-fracture)',
  repair: 'var(--color-state-repair)',
};

export function WhyThis({ reason, tone = 'calm' }: WhyThisProps) {
  return (
    <Stack gap={1} inline align="center">
      <Icon name="info" size={14} color={toneColor[tone]} />
      <Text variant="small" tone="muted">{reason}</Text>
    </Stack>
  );
}

export default WhyThis;
