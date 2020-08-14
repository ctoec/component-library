import React,  { useContext, isValidElement, ReactEventHandler, Children } from 'react';
import { RowContext } from './Row';


// Expand control component, to enable toggling expanded state
export const ExpandRow: React.FC = ({ children }) =>  {
	const { toggleExpanded } = useContext(RowContext);

	if (!isValidElement(children)) {
		throw new Error('Invalid children to ExpandRow');
	}

	//const { type: Type, props, key } = Children.only(children);
	// return (
	// 	<Type
	// 		{ ...key }
	// 		{ ...props }
	// 		onClick={(e: Event) => {
	// 			console.log("ROW EXPAND");
	// 			toggleExpanded();
	// 			if(props.onClick) {
	// 				props.onClick(e);
	// 			}
	// 		}}
	// 	/>
	// );

	// return <>{children}</>;
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
