// import-conductor-skip
'use client';

import { createContext } from 'react';
import { DialogContextData } from './dialog.models';

export const DialogContext = createContext<DialogContextData>({
  close: () => {},
});
