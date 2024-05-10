// import-conductor-skip
'use client';

import { Column } from './column';
import { DataGridContext } from './grid.context';
import { Row } from './row';
import style from './grid.module.scss';
import { UIDataGridProps, UIDataGridTemplate } from './grid.props';

const checkTemplateProp = (template: UIDataGridTemplate | string) => {
  const _isNotEmptyString = typeof template == 'string' ? !!template : true;
  const _hasDefaultSMTemplate =
    typeof template !== 'string' ? !!template.sm : true;
  if (!_isNotEmptyString || !_hasDefaultSMTemplate) {
    throw new Error('Default (sm) property is required');
  }
};

const DataGrid = ({ children, template = '' }: UIDataGridProps) => {
  checkTemplateProp(template);
  return (
    <DataGridContext.Provider value={template}>
      <div className={`w-100 ${style['ui-data-grid']}`}>{children}</div>
    </DataGridContext.Provider>
  );
};
export { Column, Row, DataGrid };
