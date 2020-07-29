import React, { useEffect } from 'react';
import { Button, Checkbox, FileInput, InlineIcon, Table, Column } from '@ctoec/component-library';
import '@ctoec/component-library/dist/assets/styles/index.scss'
import 'uswds/dist/js/uswds';

const defaultData = [
  { id: 0, name: 'Apple', price: '$0.75', color: 'Red' },
  { id: 1, name: 'Avocado', price: '$1.80', color: 'Green' },
  { id: 2, name: 'Pear', price: '$1.10', color: 'Brown' },
];
const defaultColumns: Column<any>[] = [
  {
    name: 'Name',
    cell: ({ row }) => <th scope="row">{row.name}</th>,
    sort: (row) => row.name,
  },
  {
    name: 'Price',
    cell: ({ row }) => <th scope="row">{row.price}</th>,
    sort: (row) => row.price,
  },
];

function App() {
  useEffect(() => {
    console.log('Hooks work')
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>CT OEC Example</h1>
      </header>
      <main>
        <Button text="Enter" />
        <Checkbox id="test" text="One" onChange={() => { }} />
        <FileInput id="file" label="Upload file" onChange={() => { }} />
        <InlineIcon icon="angleArrowDown" svgProps={{ fill: "red" }} />
        <InlineIcon icon="complete" />
        <Table
          id="my-table"
          data={defaultData}
          rowKey={(row) => row.id}
          columns={defaultColumns}
          defaultSortColumn={0}
          defaultSortOrder="ascending"
        />
      </main>
    </div>
  );
}

export default App;
