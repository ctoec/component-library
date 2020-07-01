import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import Table from './Table';
var defaultData = [{
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
var defaultColumns = [{
  name: 'Name',
  cell: function cell(_ref) {
    var row = _ref.row;
    return /*#__PURE__*/React.createElement("th", {
      scope: "row"
    }, row.name);
  },
  sort: function sort(row) {
    return row.name;
  }
}, {
  name: 'Price',
  cell: function cell(_ref2) {
    var row = _ref2.row;
    return /*#__PURE__*/React.createElement("th", {
      scope: "row"
    }, row.price);
  },
  sort: function sort(row) {
    return row.price;
  }
}];
storiesOf('Table', module).addDecorator(withKnobs).add('Normal', function () {
  var customData = object('Data', defaultData);
  var customColumns = object('Columns', defaultColumns);
  return /*#__PURE__*/React.createElement(Table, {
    id: "my-table",
    data: customData,
    rowKey: function rowKey(row) {
      return row.id;
    },
    columns: customColumns,
    defaultSortColumn: 0,
    defaultSortOrder: "ascending"
  });
}).add('Full width', function () {
  var customData = object('Data', defaultData);
  var customColumns = object('Columns', defaultColumns);
  return /*#__PURE__*/React.createElement(Table, {
    id: "my-table",
    data: customData,
    rowKey: function rowKey(row) {
      return row.id;
    },
    columns: customColumns,
    defaultSortColumn: 0,
    defaultSortOrder: "ascending",
    fullWidth: true
  });
});