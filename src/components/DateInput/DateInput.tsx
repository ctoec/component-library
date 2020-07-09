import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { DayPickerSingleDateController } from 'react-dates';
import { FieldSet, TextInput, FormStatusProps, Button } from '..';
import { ReactComponent as CalendarIcon } from '../../assets/images/calendar.svg';


type DateInputProps = {
	onChange: (newDate: Date | undefined) => void;
	id: string;
	label: string;
	date?: Date;
	disabled?: boolean;
	optional?: boolean;
	status?: FormStatusProps;
	className?: string;
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

	const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
	const [date, setDate] = useState<Date | undefined>(inputDate);
	const [month, setMonth] = useState<number | string>(moment(date).format('MM'))
	const [day, setDay] = useState<number | string>(moment(date).format('DD'))
	const [year, setYear] = useState<number | string>(moment(date).format('YYYY'))

	useEffect(() => {
		const newDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
		if (newDate.isValid()) {
			setDate(newDate.toDate());
		}
	}, [month, day, year])

	useEffect(() => {
		const newMoment = moment(date)
		// Coerce each of these to be an integer to ditch extra 0s added by moment formatting
		setMonth(+newMoment.format('MM'))
		setDay(+newMoment.format('DD'))
		setYear(+newMoment.format('YYYY'))
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
				value={month}
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
				value={day}
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
				value={year}
				onChange={event => {
					const newYear = event.target.value;
					setYear(newYear)
				}}
				id={`${id}-year`}
				label="Year"
				inputProps={{ minLength: 0, maxLength: 4, min: 1900, max: 2200, type: 'number' }}
				{...commonDateInputProps}
			/>
			<div className="oec-calendar-dropdown oec-date-input__calendar-dropdown">
				<Button
					text={<CalendarIcon className="oec-calendar-toggle__icon" />}
					onClick={() => {
						setCalendarOpen(!calendarOpen);
					}}
					title={`${calendarOpen ? 'close' : 'open'} calendar`}
					className="oec-calendar-toggle oec-calendar-dropdown__toggle"
				/>
				<div
					className="oec-calendar-dropdown__calendar position-absolute z-top"
					hidden={!calendarOpen}
				>
					<DayPickerSingleDateController
						// Key forces re-render, which helps deal with bugs in this library-- see scss file
						key={JSON.stringify({ date, calendarOpen })}
						date={moment(date)}
						onDateChange={(newDate) => {
							setDate(newDate?.toDate())
						}}
						focused={calendarOpen}
						// Annoyingly this does not do anything for keyboard users
						onFocusChange={(f) => setCalendarOpen(f.focused || false)}
						onBlur={() => setCalendarOpen(false)}
						// TODO: IMPLEMENT ON TAB ONCE TYPES FOR THIS LIBRARY ARE UPDATED :/
						// onTab={() => {}}
						onOutsideClick={(e) => {
							const clickOnCalendarOrButton = e.target.closest(`#${id} .oec-calendar-dropdown`);
							// If a user clicks the button again, the button will handle closing it, and this would fire first and cause problems
							if (!clickOnCalendarOrButton) {
								setCalendarOpen(false);
							}
						}}
						initialVisibleMonth={() => moment(date) || moment()}
					/>
				</div>
			</div>
		</FieldSet>
	)
};