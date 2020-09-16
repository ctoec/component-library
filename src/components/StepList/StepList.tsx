import React from 'react';
import {
  Step,
  InternalStepProps,
  PossibleHeaderLevels,
  StepProps,
} from './Step';
import cx from 'classnames';

export type StepListProps<T> = {
  steps: StepProps<T>[];
  props: T;
  activeStep: string;
  type?: 'normal' | 'embedded';
  // https://dev.to/s_aitchison/psa-stop-hard-coding-heading-levels-in-your-react-components-2ekp
  headerLevel?: PossibleHeaderLevels;
};

const mapStepsToInternalProps = function <T>(
  steps: StepProps<T>[],
  activeStep: string,
  props: T
) {
  let activeStepReached = false;

  return steps.map((externalStep) => {
    // If the active step was already reached, then this one was not previously visited
    const visited = activeStepReached ? false : true;
    const active = externalStep.key === activeStep;
    if (active) {
      // So next step knows it has not been reached
      activeStepReached = true;
    }

    const step: InternalStepProps<T> = {
      headerLevel: 'h2',
      ...externalStep,
      visited,
      active,
      props,
      status: externalStep.status(props),
    };

    return step;
  });
};

export function StepList<T>({
  steps,
  props,
  activeStep,
  type = 'normal',
  headerLevel = 'h2',
}: StepListProps<T>) {
  const internalSteps = mapStepsToInternalProps(steps, activeStep, props);
  return (
    <ol className={cx('oec-step-list', { embedded: type === 'embedded' })}>
      {internalSteps.map((step) => (
        <Step {...step} type={type} headerLevel={headerLevel} />
      ))}
    </ol>
  );
}
