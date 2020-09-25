import React from 'react';
import { Link } from 'react-router-dom';
import { InlineIcon, HeadingLevel } from '..';
import cx from 'classnames';
import { ExclamationCircle, CheckCircle } from '../../assets/images';

export type StepStatus =
  | 'incomplete'
  | 'complete'
  | 'attentionNeeded'
  | 'exempt';

// The statuses 'active' and 'notStarted' can only be assigned by StepList itself
export type InternalStepStatus = 'notStarted' | 'active' | StepStatus;

export type StepProps<T> = {
  key: string;
  name: string;
  status: (props: T) => StepStatus;
  editPath?: string;
  // Edit component is an alternative to edit path
  EditComponent?: React.FC<T>;
  Summary?: React.FC<T>;
  Form: React.FC<T>;
  headerLevel?: HeadingLevel;
};

export type InternalStepProps<T> = Omit<StepProps<T>, 'status'> & {
  status: InternalStepStatus;
  props: T;
  type?: 'normal' | 'embedded';
};

const labelForStatus = (status: StepStatus) => {
  switch (status) {
    case 'incomplete':
      return 'Missing information';
    case 'complete':
      return 'Complete';
    case 'attentionNeeded':
      return 'Attention needed';
    case 'exempt':
      return '';
  }
};

export function Step<T>({
  name,
  status,
  editPath,
  Summary,
  Form,
  props,
  headerLevel = 'h2',
  type = 'normal',
  EditComponent,
}: InternalStepProps<T>) {
	const Heading = headerLevel;
	const statusColorClassNames: { [key in StepStatus]: string} = {
		complete: 'text-success',
		incomplete: 'text-warning',
		attentionNeeded: 'text-error',
		exempt: '',
	};

  return (
    <li
      className={cx('oec-step-list__step', `oec-step-list__step--${status}`, {
        embedded: type === 'embedded',
      })}
    >
      <div className="oec-step-list__step__content">
        <Heading className="oec-step-list__step__title">{name}</Heading>

        {Summary && status !== 'notStarted' && status !== 'active' && (
          <div className="oec-step-list__step__summary">
            <Summary {...props} />
          </div>
        )}
        {status === 'active' && (
          <div className="oec-step-list__step__form">
            <Form {...props} />
          </div>
        )}
      </div>
      {status !== 'exempt' && (
        <div className="oec-step-list__step__actions">
          {status !== 'notStarted' && status !== 'active' && (
            <>
              <div className="oec-step-list__step__status-text">
                <InlineIcon className={statusColorClassNames[status]} Icon={status === 'complete' ? CheckCircle : ExclamationCircle} />
                {labelForStatus(status)}
              </div>
              {editPath && (
                <Link to={editPath} className="usa-link">
                  Edit<span className="usa-sr-only"> {name.toLowerCase()}</span>
                </Link>
              )}
              {EditComponent && <EditComponent {...props} />}
            </>
          )}
        </div>
      )}
    </li>
  );
}
