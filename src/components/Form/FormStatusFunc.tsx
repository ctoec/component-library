import { FormStatusProps } from '..';

export type FormStatusFunc<TData> = (
  originalObject: TData,
  path: string,
) => FormStatusProps | undefined;
