import React, { useState } from 'react';
import { Form, FormField, TextInput, TextInputProps } from ".."
import { storiesOf } from '@storybook/react';

import { EditableTable, EditableTableColumn } from './EditableTable';
import { Button } from '../Button/Button';

type TableData = {
	id: number;
	name: string;
	count: number;
	color: 'red' | 'blue' | 'yellow';
}

const _data: TableData[] = [
	{
		id: 1,
		name: "first thing",
		count: 1,
		color: 'red',
	},
	{
		id: 2,
		name: "Second Thing",
		count: 20,
		color: 'blue',
	},
	{
		id: 3,
		name: "THIRD THING",
		count: 100,
		color: 'yellow'
	}
];

const columns: EditableTableColumn<TableData>[] = [
	{
		title: 'Thing name',
		field: 'name',
	},
	{
		title: 'Thing count',
		field: 'count'
	},
	{
		title: 'Thing color',
		field: 'color'
	}
]

storiesOf('EditableTable', module)
	.add('EditableTable with no actions', () => {
		return (
			<>
				<h2>A table you can't actually edit</h2>
				<EditableTable<TableData>
					title="EditableTable you can't actually edit"
					data={_data}
					columns={columns}
				/>
			</>
		)
	})
	.add('EditableTable with selectable rows', () => {
		return (
			<>
				<h2>A table with rows you can select</h2>
				<EditableTable<TableData>
					title="EditableTable with rows you can select"
					data={_data}
					columns={columns}
					selectable
				/>
			</>
		)
	})
	.add('EditableTable with update action', () => React.createElement(() => {
		const [data, setData] = useState(_data)
		return (
			<>
				<h2>A table with rows you can update</h2>
				<EditableTable<TableData>
					title="EditableTable with rows you can update"
					data={data}
					columns={columns}
					onRowUpdate={(newRow: TableData) => new Promise((resolve) => {
						const dataUpdate = [...data];
						const thisRowIdx = data.findIndex((row) => row.id === newRow.id);
						dataUpdate[thisRowIdx] = newRow;
						setData(dataUpdate);
						resolve();
					})}
				/>
			</>
		)
	}))
	.add('EditableTable with delete action', () => React.createElement(() => {
		const [data, setData] = useState(_data);
		return (
			<>
				<h2>A table with rows you can delete</h2>
				<EditableTable<TableData>
					title="EditableTable with rows you can delete"
					data={data}
					columns={columns}
					onRowDelete={(newRow: TableData) => new Promise((resolve) => {
						const dataUpdate = [...data];
						const thisRowIdx = data.findIndex((row) => row.id === newRow.id);
						dataUpdate.splice(thisRowIdx, 1);
						setData(dataUpdate);
						resolve();
					})}
				/>
			</>
		)
	}))
