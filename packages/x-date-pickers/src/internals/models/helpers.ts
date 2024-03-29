/**
 * All standard components exposed by `material-ui` are `StyledComponents` with
 * certain `classes`, on which one can also set a top-level `className` and inline
 * `style`.
 */
export type ExtendMui<C, Removals extends keyof C = never> = Omit<
  C,
  'classes' | 'theme' | Removals
>;

export type MakeOptional<T, K extends keyof T> = {
  [P in K]?: T[P] | undefined;
} & Omit<T, K>;

export type DefaultizedProps<
  P extends {},
  RequiredProps extends keyof P,
  AdditionalProps extends {} = {},
> = Omit<P, RequiredProps | keyof AdditionalProps> &
  Required<Pick<P, RequiredProps>> &
  AdditionalProps;
