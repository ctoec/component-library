import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import Table from './Table';
const defaultData = [{
  id: 0,
  name: 'Apple',
  price: '$0.75',
  color: 'Red'
}, {
  id: 1,
  name: 'Avocado',
  price: '$1.80',
  color: 'Green'
}, {
  id: 2,
  name: 'Pear',
  price: '$1.10',
  color: 'Brown'
}];
const defaultColumns = [{
  name: 'Name',
  cell: ({
    row
  }) => /*#__PURE__*/React.createElement("th", {
    scope: "row"
  }, row.name),
  sort: row => row.name
}, {
  name: 'Price',
  cell: ({
    row
  }) => /*#__PURE__*/React.createElement("th", {
    scope: "row"
  }, row.price),
  sort: row => row.price
}];
storiesOf('Table', module).addDecorator(withKnobs).add('Normal', () => {
  const customData = object('Data', defaultData);
  const customColumns = object('Columns', defaultColumns);
  return /*#__PURE__*/React.createElement(Table, {
    id: "my-table",
    data: customData,
    rowKey: row => row.id,
    columns: customColumns,
    defaultSortColumn: 0,
    defaultSortOrder: "ascending"
  });
}).add('Full width', () => {
  const customData = object('Data', defaultData);
  const customColumns = object('Columns', defaultColumns);
  return /*#__PURE__*/React.createElement(Table, {
    id: "my-table",
    data: customData,
    rowKey: row => row.id,
    columns: customColumns,
    defaultSortColumn: 0,
    defaultSortOrder: "ascending",
    fullWidth: true
  });
});