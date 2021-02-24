import React from 'react';
import { ProgressIndicator as CarbonProgressIndicator, ProgressStep as CarbonProgressStep } from "carbon-components-react";

export type ProgressIndicatorProps = {
  currentIndex: number;
  steps: ProgressIndicatorStepProps[];
};

export type ProgressIndicatorStepProps = {
  label: string;
  description?: string;
}

export function ProgressIndicator({
  currentIndex,
  steps
}: ProgressIndicatorProps) {
  return (
<CarbonProgressIndicator
  vertical={false}
  currentIndex={currentIndex}>

  {steps.map(step => (
    <CarbonProgressStep
    label={step.label}
    description={step.description}
    />
  ))}
</CarbonProgressIndicator>
  );
}