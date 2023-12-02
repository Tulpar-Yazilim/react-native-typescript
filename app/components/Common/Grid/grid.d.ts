import {ReactNode} from 'react';

import {IStyleShortcuts} from '@/utils';

export type ColumnProps = {
  children: ReactNode;
  col?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
} & IStyleShortcuts;

export type RowProps = {
  children: ReactNode;
} & IStyleShortcuts;
