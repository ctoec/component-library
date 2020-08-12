import React from 'react';
import MaterialTable, { Column } from 'material-table';
import { TABLE_ICONS, OEC_FONT_FAMILY } from './TableIcons';

export type EditableTableColumn<T extends object> = Column<T>;

type EditableTableProps<T extends object> = {
  title: string;
  data: T[];
  columns: EditableTableColumn<T>[];
  onRowUpdate?: any;
	onRowDelete?: any;
	selectable?: boolean;
	EditRowComponent?: React.FunctionComponent;
};

// TODO: abstract into component that manages focus: https://www.w3.org/TR/wai-aria-practices-1.1/#grid
export const EditableTable = <T extends object>({
  title,
  data,
  columns,
  onRowUpdate,
	onRowDelete,
	selectable = false,
}: EditableTableProps<T>) => {
  return (
    <div className="oec-editable-table">
      <MaterialTable
        icons={TABLE_ICONS}
        title={title}
        data={data}
        columns={columns}
        editable={{
          onRowUpdate,
          onRowDelete,
        }}
        options={{
          rowStyle: {
            fontFamily: OEC_FONT_FAMILY,
          },
          headerStyle: {
            fontFamily: OEC_FONT_FAMILY,
            whiteSpace: 'nowrap',
          },
          showTitle: false,
          paging: false,
          search: false,
					toolbar: false,
					selection: selectable,
				}}
      />
    </div>
  );
};
