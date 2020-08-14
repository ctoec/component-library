import React, { createContext, useState } from 'react';
import { RowExpansion } from './RowExpansion';

export type RowProps<T> = {
	row: T;
	cells: React.FC<{ row: T }>[];
	onClick?: (row: T) => () => any;
	expansionRender?: (row: T) => JSX.Element;
};

export function Row<T>({ row, cells, expansionRender }: RowProps<T>) {
	const [isExpanded, setIsExpanded] = useState(false);
	return (
		<RowProvider
			value={{
				isExpanded,
				toggleExpanded: () => setIsExpanded(e => !e)
			}}

		>
			<tr>
				{cells.map((Cell, index) => (
					<Cell row={row} key={index} />
				))}
			</tr>
			{isExpanded && expansionRender && 
				<RowExpansion columnCount={cells.length}>{expansionRender(row)}</RowExpansion>
			}
		</RowProvider>
	);
}

// Context for maintaing row expansion state
type RowContextType = {
	isExpanded: boolean;
	toggleExpanded: () => void;
}

export const RowContext = createContext<RowContextType>({
	isExpanded: false,
	toggleExpanded: () => {}
});

const { Provider: RowProvider } = RowContext;
export { RowProvider }
