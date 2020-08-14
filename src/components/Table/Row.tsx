import React, { createContext, useState, useContext, isValidElement, Children, ReactEventHandler } from 'react';

export type RowProps<T> = {
	row: T;
	cells: React.FC<{ row: T }>[];
	onClick?: (row: T) => () => any;
	expansionContent?: JSX.Element;
};

export function Row<T>({ row, cells, expansionContent }: RowProps<T>) {
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
			{isExpanded && expansionContent && 
				<RowExpansion columnCount={cells.length}>{expansionContent}</RowExpansion>
			}
		</RowProvider>
	);
}

// Context for maintaing row expansion state
type RowContextType = {
	isExpanded: boolean;
	toggleExpanded: () => void;
}
const RowContext = createContext<RowContextType>({
	isExpanded: false,
	toggleExpanded: () => {},
});

const { Provider: RowProvider } = RowContext;
export { RowProvider }

// Expansion component, wraps any content in a <td> with spanCell set by row to 
// total number of row cells
type RowExpansionProps = {
	columnCount: number;
}

export const RowExpansion: React.FC<RowExpansionProps> = ({ columnCount, children }) => 
	(<td rowSpan={columnCount}>{ children }</td>);

// Expand control component, to enable toggling expanded state
export const ExpandRow: React.FC = ({ children }) =>  {
	const { toggleExpanded } = useContext(RowContext);

	if (!isValidElement(children)) {
		throw new Error('Invalid children to ExpandRow');
	}

	return (
		<>
			{Children.map(children, (child) => {
				const { type: Type, props, key } = child;
				return (
					<Type
						{ ...key }
						{...props }
						onClick={(e: ReactEventHandler) => {
							toggleExpanded();
							if(props.onClick) {
								props.onClick(e);
							}
						}}
					/>
				);
			})}
		</>
	);
}
