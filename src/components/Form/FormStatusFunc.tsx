import { TObjectDriller } from './ObjectDriller';
import { FormStatusProps } from '..';

export type FormStatusFunc<TFieldData> = (
  _: TObjectDriller<TFieldData>
) => FormStatusProps | undefined;
