import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { FieldSet, TextInput, FormStatusProps } from '..';


type inputDetailType = {
	props: {
		label: string;
		inputProps: any;
	};
	parseMoment: (inputMoment: Moment | null) => string | undefined;
	checkValidity: (value: any) => boolean;
	errorMessage: string;
};

type inputDetailsType = { [key: string]: inputDetailType };

type DateInputProps = {
	date: Date;
	onChange: (newDate: Date) => void;
	id: string;
	label: string;
	disabled?: boolean;
	optional?: boolean;
	status?: FormStatusProps;
	className?: string;
};

const inputDetails: inputDetailsType = {
	// month: {
	//   props: {
	//     inputProps: { maxLength: 2, type: 'number', min: 1, max: 12 },
	//     label: 'Month',
	//   },
	//   parseMoment: (inputMoment: Moment | null) =>
	//     inputMoment ? inputMoment.format('MM') : undefined,
	//   checkValidity: value => +value > 0 && +value < 13,
	//   errorMessage: 'Invalid month',
	// },
	day: {
		props: {
			label: 'Day',
			inputProps: { maxLength: 2, type: 'number', min: 1, max: 31 },
		},
		parseMoment: (inputMoment: Moment | null) =>
			inputMoment ? inputMoment.format('DD') : undefined,
		checkValidity: value => +value < 32 && +value > 0,
		errorMessage: 'Invalid day',
	},
	year: {
		props: {
			label: 'Year',
			inputProps: { maxLength: 4, type: 'number', min: 1990, max: 2100 },
		},
		parseMoment: (inputMoment: Moment | null) =>
			inputMoment ? inputMoment.format('YYYY') : undefined,
		checkValidity: value =>
			value.length === 2 || (value.length === 4 && +value > 1989 && +value < 2101),
		errorMessage: 'Invalid year',
	},
};

export const DateInput: React.FC<DateInputProps> = ({
	date: inputDate,
	onChange,
	id,
	label,
	disabled,
	optional,
	status,
	className,
}) => {
	const commonDateInputProps = {
		className: 'oec-date-input__input',
		disabled: disabled,
		inline: true,
	};

	const [date, setDate] = useState(inputDate);
	const [month, setMonth] = useState(moment(date).format('MM'))
	const [day, setDay] = useState(moment(date).format('DD'))
	const [year, setYear] = useState(moment(date).format('YYYY'))

	useEffect(() => {
		setDate(moment(`${month}/${day}/${year}`).toDate())
	}, [month, day, year])

	useEffect(() => {
		onChange(date)
	}, [date, onChange])


	return (
		<FieldSet
			legend={label}
			id={id}
			showLegend={true}
			hint={`For example: ${moment().format('MM DD YYYY')}`}
			childrenGroupClassName="flex-row flex-align-end usa-memorable-date"
			className={className}
			status={status}
			optional={optional}
		>
			<TextInput
				defaultValue={month}
				onChange={event => {
					const newMonth = event.target.value;
					setMonth(newMonth)
				}}
				id={`${id}-month`}
				label="Month"
				inputProps={{ maxLength: 2, min: 1, max: 12, type: 'number' }}
				{...commonDateInputProps}
			/>
			<TextInput
				// TODO DEFAULT VALUE
				onChange={event => {
					const newDay = event.target.value;
					setDay(newDay)
				}}
				id={`${id}-day`}
				label="Day"
				inputProps={{ maxLength: 2, min: 1, max: 31, type: 'number' }}
				{...commonDateInputProps}
			/>
			<TextInput
				// TODO DEFAULT VALUE
				onChange={event => {
					const newYear = event.target.value;
					setYear(newYear)
				}}
				id={`${id}-year`}
				label="Year"
				inputProps={{ minLength: 4, maxLength: 4, min: 1900, max: 2200, type: 'number' }}
				{...commonDateInputProps}
			/>
			{/* TODO: AIRBNB DROPDOWN HERE */}
		</FieldSet>
	)
};