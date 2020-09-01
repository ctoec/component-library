import React from 'react';

/**
 * Row expansion component, rendered by the associated Row, which wraps
 * row expansion content in a <tr> and a <td> with colspan equal to the
 * number of cells (columns) in the associated row
 */
type RowExpansionProps = {
  columnCount: number;
};

export const RowExpansion: React.FC<RowExpansionProps> = ({
  columnCount,
  children,
}) => (
  <tr>
    <td colSpan={columnCount}>{children}</td>
  </tr>
);
