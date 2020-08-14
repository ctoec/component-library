import React from 'react';

// Expansion component, wraps any content in a <td> with spanCell set by row to 
// total number of row cells
type RowExpansionProps = {
	columnCount: number;
}

export const RowExpansion: React.FC<RowExpansionProps> = ({ columnCount, children }) => 
	(<tr><td colSpan={columnCount}>{children}</td></tr>);
