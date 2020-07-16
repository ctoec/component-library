import React from 'react';

type FileInputProps = {
	id: string;
	label: string;
	ariaDescribedByText?: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const FileInput: React.FC<FileInputProps> = ({
	id,
	label,
	ariaDescribedByText,
	onChange
}) => {
	return (
		<>
			<label htmlFor={id}>{label}</label>
			{ariaDescribedByText && <span id={`${id}-aria-describedby`}>{' '}{ariaDescribedByText}</span>}
			<input
				id={id}
				type="file"
				className="usa-file-input"
				aria-describedby={ariaDescribedByText ? `${id}-aria-describedby` : undefined}
				onChange={onChange}	
			/>
		</>
	)
}