import React, { useEffect } from 'react';

type FileInputProps = {
  id: string;
  label: string;
  ariaDescribedByText?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const FileInput: React.FC<FileInputProps> = ({
  id,
  label,
  ariaDescribedByText,
  onChange,
}) => {
  // USWDS File Input is managed by JS (not exclusive CSS)
  // We need to import the distributed JS code. It runs immediately
  // after being parsed, and searches for DOM elements with the
  // appriopriate HTML attributes. React constantly mounts/unmounts
  // DOM nodes. To get around this, we dynamically import USWDS every
  // render. However, browsers cache the module and so subsequent
  // imports don't trigger the code to execute again. To get around
  // this, we must delete the module from the cache.
  useEffect(() => {
    delete require.cache[require.resolve('uswds/dist/js/uswds')];
    // @ts-ignore
    import('uswds/dist/js/uswds');
  }, []);

  return (
    <label htmlFor={id}>
      {label}
      {ariaDescribedByText && (
        <span id={`${id}-aria-describedby`}> {ariaDescribedByText}</span>
      )}
      <input
        id={id}
        type="file"
        className="usa-file-input"
        aria-describedby={
          ariaDescribedByText ? `${id}-aria-describedby` : undefined
        }
        onChange={onChange}
      />
    </label>
  );
};
