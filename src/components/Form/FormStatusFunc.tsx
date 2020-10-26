import { FormStatusProps } from '..';
import { TObjectDriller } from './ObjectDriller';

export type FieldStatusFunc<TData, TComponentProps> = (
  dataDriller: TObjectDriller<NonNullable<TData>>,
  path: string,
  props: TComponentProps
) => FormStatusProps | undefined;

// TODO: refactor this to be more like fieldset status func
export type FieldSetStatusFunc<TData> = (
  originalObject: TData,
  dataDriller: TObjectDriller<NonNullable<TData>>
) => FormStatusProps | undefined;
