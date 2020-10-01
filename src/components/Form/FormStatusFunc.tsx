import { FormStatusProps } from '..';
import { TObjectDriller } from './ObjectDriller';

export type FieldStatusFunc<TData, TComponentProps> = (
  dataDriller: TObjectDriller<NonNullable<TData>>,
  path: string,
  props: TComponentProps
) => FormStatusProps | undefined;

export type FieldSetStatusFunc<TData> = (
  originalObject: TData
) => FormStatusProps | undefined;
