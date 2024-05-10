// import-conductor-skip
'use client';

import { createContext } from 'react';
import { UIDataGridTemplate } from './grid.props';

export const DataGridContext = createContext<UIDataGridTemplate | string>('');
