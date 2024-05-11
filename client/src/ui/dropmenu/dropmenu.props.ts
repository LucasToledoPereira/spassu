import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface UIDropmenuItemProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  icon?: IconDefinition;
  onAfterClick?: () => void;
  color?: string;
}
