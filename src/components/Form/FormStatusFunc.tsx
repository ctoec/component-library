import { FormStatusProps } from '..';
import { TObjectDriller } from './ObjectDriller';

export type FieldStatusFunc<TData> = (
  dataDriller: TObjectDriller<NonNullable<TData>>,
  originalObject: TData,
  path: string,
) => FormStatusProps | undefined;

export type FieldSetStatusFunc<TData> = (
  dataDriller: TObjectDriller<NonNullable<TData>>,
  originalObject: TData,
) => FormStatusProps | undefined;
