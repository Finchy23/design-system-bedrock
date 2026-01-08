import * as React from "react";
import { Text } from "./Text";
import { Stack } from "./Stack";
import Icon from "./Icon";

export type ProofStripProps = {
  stage: "receipt" | "transfer" | "trajectory";
  subtitle?: string;
};

const labels = {
  receipt: "Receipt",
  transfer: "Transfer",
  trajectory: "Trajectory"
} as const;

const icons = {
  receipt: "check-circle",
  transfer: "arrow-right-circle",
  trajectory: "trending-up"
} as const;

export function ProofStrip({ stage, subtitle }: ProofStripProps) {
  const stages: Array<"receipt" | "transfer" | "trajectory"> = ["receipt", "transfer", "trajectory"];
  return (
    <Stack gap={1}>
      <Stack gap={2} inline align="center" style={{ flexWrap: 'wrap' }}>
        {stages.map((s) => {
          const active = s === stage;
          return (
            <Stack key={s} gap={1} inline align="center">
              <Icon name={icons[s]} size={14} color={active ? 'var(--color-receipt)' : 'var(--color-text-muted)'} />
              <Text variant="small" tone={active ? 'success' : 'muted'}>{labels[s]}</Text>
              {s !== 'trajectory' && <div style={{ width: 20, height: 1, background: 'var(--color-border-default)' }} />}
            </Stack>
          );
        })}
      </Stack>
      {subtitle && <Text variant="small" tone="muted">{subtitle}</Text>}
    </Stack>
  );
}

export default ProofStrip;
