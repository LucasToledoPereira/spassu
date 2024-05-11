import { Placement } from '@popperjs/core';
import { PropsWithChildren } from 'react';

export interface UIPopoverProps extends PropsWithChildren {
  placement?: Placement;
  backdrop?: 'blur' | 'none' | 'opaque';
  trigger?: 'hover' | 'click';
  background?: string;
  color?: string;
}
